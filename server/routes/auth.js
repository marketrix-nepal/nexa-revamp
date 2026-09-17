import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { JWT_SECRET, authenticateToken } from '../middleware/auth.js';

export const authRouter = Router();

/**
 * POST /api/auth/login
 * Authenticates internal operators. Supports standard email or role quick-select.
 */
authRouter.post('/login', (req, res) => {
  const { email, role_preset } = req.body;

  let user;
  if (role_preset) {
    user = db.users.find(u => u.role === role_preset);
  } else if (email) {
    user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  if (!user) {
    return res.status(401).json({
      error: 'OPERATOR_NOT_FOUND',
      message: 'No internal operator credentials match the provided email address.'
    });
  }

  if (user.status !== 'ACTIVE') {
    return res.status(403).json({
      error: 'ACCOUNT_INACTIVE',
      message: 'Your account is suspended or pending verification.'
    });
  }

  // Issue JWT Token valid for 24h
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
  });
});

/**
 * GET /api/auth/me
 * Retrieves the current session operator's context
 */
authRouter.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

/**
 * GET /api/auth/roles
 * Available roles and their governance privileges
 */
authRouter.get('/roles', (req, res) => {
  res.json([
    {
      role: 'SUPER_ADMIN',
      description: 'Unrestricted read/write across CRM, CMS, Discovery, Automation, and Governance.'
    },
    {
      role: 'STRATEGIC_CONSULTANT',
      description: 'Manage inbound diagnostics, mutate 6-step Kanban stages, and attach strategy briefs.'
    },
    {
      role: 'CREATIVE_EDITOR',
      description: 'Read/write the 8 Core Service Pillars, audience variants, and Discovery/SEO metadata.'
    },
    {
      role: 'TECH_ENGINEER',
      description: 'Monitor AutomationLog streams, manage webhook configurations, and execute retry actions.'
    }
  ]);
});
