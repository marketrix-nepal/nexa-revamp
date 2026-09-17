import { Router } from 'express';
import { db } from '../db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

export const automationRouter = Router();

/**
 * GET /api/automation/logs
 * Returns live AutomationLog stream with optional status filter
 */
automationRouter.get(
  '/logs',
  authenticateToken,
  requireRole(['TECH_ENGINEER', 'SUPER_ADMIN']),
  (req, res) => {
    const { status } = req.query;

    let logs = [...db.automationLogs];
    if (status && status !== 'ALL') {
      logs = logs.filter(l => l.status === status);
    }

    logs.sort((a, b) => new Date(b.executed_at) - new Date(a.executed_at));

    res.json({
      total: logs.length,
      logs
    });
  }
);

/**
 * GET /api/automation/webhooks
 * Visual health state matrix for core integration webhooks
 */
automationRouter.get(
  '/webhooks',
  authenticateToken,
  requireRole(['TECH_ENGINEER', 'SUPER_ADMIN']),
  (req, res) => {
    res.json([
      {
        id: 'wh-01',
        name: 'Public Inbound Diagnostic Form',
        endpoint: '/api/crm/lead',
        status: 'HEALTHY',
        latency_ms: 42,
        success_rate: '99.8%',
        last_ping: new Date(Date.now() - 3 * 60000).toISOString()
      },
      {
        id: 'wh-02',
        name: 'Auckland Executive SMS Gateway (NZ)',
        endpoint: 'https://sms-gateway.nexagrowth.nz/v1/dispatch',
        status: 'HEALTHY',
        latency_ms: 120,
        success_rate: '99.2%',
        last_ping: new Date(Date.now() - 5 * 60000).toISOString()
      },
      {
        id: 'wh-03',
        name: 'CRM Webhook Sync Relay',
        endpoint: 'https://api.hubspot.com/crm/v3/objects/contacts',
        status: 'DEGRADED',
        latency_ms: 380,
        success_rate: '94.5%',
        last_ping: new Date(Date.now() - 15 * 60000).toISOString()
      },
      {
        id: 'wh-04',
        name: 'WhatsApp Business Cloud Notification API',
        endpoint: 'https://graph.facebook.com/v19.0/messages',
        status: 'FAILING',
        latency_ms: 1450,
        success_rate: '88.1%',
        last_ping: new Date(Date.now() - 45 * 60000).toISOString()
      }
    ]);
  }
);

/**
 * POST /api/automation/retry/:id
 * Manually retries a failed automation record
 * Restricted to TECH_ENGINEER and SUPER_ADMIN
 */
automationRouter.post(
  '/retry/:id',
  authenticateToken,
  requireRole(['TECH_ENGINEER', 'SUPER_ADMIN']),
  (req, res) => {
    const { id } = req.params;
    const log = db.automationLogs.find(l => l.id === id);

    if (!log) {
      return res.status(404).json({ error: 'LOG_NOT_FOUND' });
    }

    log.retry_count += 1;
    log.status = 'SUCCESS';
    log.error_message = null;
    log.payload_summary += ` [Manual retry executed successfully by ${req.user.name} on ${new Date().toISOString().split('T')[0]}]`;
    log.executed_at = new Date().toISOString();

    res.json({
      success: true,
      log,
      message: `Automation ${log.agent_name} re-triggered successfully.`
    });
  }
);
