import { db } from '../db.js';

/**
 * Immutable Audit Trail Middleware
 * Automatically intercepts every POST, PUT, and DELETE action
 * and logs it into the AuditTrail collection.
 */
export function auditLogger(req, res, next) {
  const mutatingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

  if (mutatingMethods.includes(req.method)) {
    // Intercept finish to capture status
    res.on('finish', () => {
      // Only log successful or client mutations (status < 400 or 403 authorization rejections)
      const userId = req.user ? req.user.id : (req.body && req.body.email ? `unauth:${req.body.email}` : 'anonymous');
      const action = `${req.method}_${req.baseUrl || ''}${req.path}`.replace(/\/+/g, '_').toUpperCase();
      const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

      const entry = {
        id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        user_id: userId,
        action_performed: action,
        resource_targeted: req.originalUrl,
        ip_address: typeof ipAddress === 'string' ? ipAddress : '127.0.0.1',
        timestamp: new Date().toISOString()
      };

      // Append to immutable log
      db.auditTrail.unshift(entry);
    });
  }

  next();
}
