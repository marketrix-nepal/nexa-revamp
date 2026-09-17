import jwt from 'jsonwebtoken';
import { db } from '../db.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'nexa-growth-internal-operations-secret-2026';

/**
 * Validates JWT Bearer Token and attaches active internal user to req.user
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ 
      error: 'AUTHENTICATION_REQUIRED',
      message: 'Access to the internal operational console requires a valid session token.' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = db.users.find(u => u.id === decoded.id);

    if (!user || user.status !== 'ACTIVE') {
      return res.status(403).json({ 
        error: 'ACCOUNT_SUSPENDED_OR_NOT_FOUND',
        message: 'The requested operator credentials are invalid or suspended.' 
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ 
      error: 'INVALID_OR_EXPIRED_TOKEN',
      message: 'Your session has expired. Please authenticate at the gateway again.' 
    });
  }
}

/**
 * RBAC Role Check Middleware
 * Enforces strict view and mutation limits across the 4 internal roles:
 * SUPER_ADMIN, STRATEGIC_CONSULTANT, CREATIVE_EDITOR, TECH_ENGINEER
 */
export function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'UNAUTHENTICATED' });
    }

    // SUPER_ADMIN unconditionally holds all permissions
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!rolesArray.includes(req.user.role)) {
      return res.status(403).json({
        error: 'ROLE_PERMISSION_DENIED',
        message: `Action restricted. Required: [${rolesArray.join(', ')}]. Active Role: ${req.user.role}.`,
        userRole: req.user.role,
        requiredRoles: rolesArray
      });
    }

    next();
  };
}
