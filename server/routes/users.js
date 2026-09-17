import { Router } from 'express';
import { db } from '../db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

export const usersRouter = Router();

/**
 * GET /api/users
 * Returns list of internal team operators and their assigned roles
 * Restricted to SUPER_ADMIN
 */
usersRouter.get('/', authenticateToken, requireRole('SUPER_ADMIN'), (req, res) => {
  res.json({
    total: db.users.length,
    users: db.users
  });
});

/**
 * PUT /api/users/:id/role
 * Assigns or modifies an internal operator's RBAC role
 * Restricted to SUPER_ADMIN
 */
usersRouter.put('/:id/role', authenticateToken, requireRole('SUPER_ADMIN'), (req, res) => {
  const { id } = req.params;
  const { role, status } = req.body;

  const validRoles = ['SUPER_ADMIN', 'STRATEGIC_CONSULTANT', 'CREATIVE_EDITOR', 'TECH_ENGINEER'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ error: 'INVALID_ROLE', valid_roles: validRoles });
  }

  const user = db.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'USER_NOT_FOUND' });

  if (role) user.role = role;
  if (status) user.status = status;

  res.json({
    success: true,
    user,
    message: `Role for ${user.name} updated to ${user.role}`
  });
});

/**
 * GET /api/users/audit
 * Streams the immutable system audit trail
 */
usersRouter.get('/audit', authenticateToken, (req, res) => {
  res.json({
    total: db.auditTrail.length,
    auditTrail: db.auditTrail.slice(0, 50)
  });
});

/**
 * GET /api/users/export/diagnostics
 * Exports diagnostic data formatted as structured CSV or JSON within date ranges
 */
usersRouter.get('/export/diagnostics', authenticateToken, (req, res) => {
  const { format = 'json', start_date, end_date } = req.query;

  let records = [...db.clientDiagnostics];

  if (start_date) {
    records = records.filter(r => new Date(r.created_at) >= new Date(start_date));
  }
  if (end_date) {
    records = records.filter(r => new Date(r.created_at) <= new Date(end_date));
  }

  if (format === 'csv') {
    // Generate RFC 4180 compliant CSV
    const headers = ['ID', 'Company Name', 'Contact Email', 'Pipeline Stage', 'Lead Score', 'Selected Bottleneck', 'Created At'];
    const rows = records.map(r => [
      `"${r.id}"`,
      `"${r.company_name.replace(/"/g, '""')}"`,
      `"${r.contact_email}"`,
      `"${r.pipeline_stage}"`,
      r.lead_score,
      `"${r.selected_bottleneck.replace(/"/g, '""')}"`,
      `"${r.created_at}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="nexa-growth-diagnostics-${new Date().toISOString().split('T')[0]}.csv"`);
    return res.send(csvContent);
  }

  // Default JSON export
  res.setHeader('Content-Disposition', `attachment; filename="nexa-growth-diagnostics-${new Date().toISOString().split('T')[0]}.json"`);
  res.json({
    export_timestamp: new Date().toISOString(),
    total_records: records.length,
    date_filter: { start_date, end_date },
    records
  });
});
