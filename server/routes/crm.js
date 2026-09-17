import { Router } from 'express';
import { db } from '../db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

export const crmRouter = Router();

/**
 * GET /api/crm/diagnostics
 * Returns list of client diagnostics sorted by lead score and filterable by stage
 */
crmRouter.get('/diagnostics', authenticateToken, (req, res) => {
  const { stage, search, sort = 'score' } = req.query;

  let results = [...db.clientDiagnostics];

  if (stage && stage !== 'ALL') {
    results = results.filter(d => d.pipeline_stage === stage);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(d => 
      d.company_name.toLowerCase().includes(q) ||
      d.contact_email.toLowerCase().includes(q) ||
      d.selected_bottleneck.toLowerCase().includes(q)
    );
  }

  if (sort === 'score') {
    results.sort((a, b) => b.lead_score - a.lead_score);
  } else if (sort === 'date') {
    results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  res.json({
    total: results.length,
    diagnostics: results,
    stages: ['DIAGNOSE', 'STRATEGY', 'DESIGN', 'TECH', 'MARKETING', 'MEASUREMENT']
  });
});

/**
 * POST /api/crm/diagnostics/:id/stage
 * Mutates the 6-step operational pipeline stage
 * Restricted to STRATEGIC_CONSULTANT and SUPER_ADMIN
 */
crmRouter.post(
  '/diagnostics/:id/stage', 
  authenticateToken, 
  requireRole(['STRATEGIC_CONSULTANT', 'SUPER_ADMIN']), 
  (req, res) => {
    const { id } = req.params;
    const { new_stage, note } = req.body;

    const validStages = ['DIAGNOSE', 'STRATEGY', 'DESIGN', 'TECH', 'MARKETING', 'MEASUREMENT'];
    if (!validStages.includes(new_stage)) {
      return res.status(400).json({ 
        error: 'INVALID_STAGE', 
        message: `Valid stages are: ${validStages.join(', ')}` 
      });
    }

    const item = db.clientDiagnostics.find(d => d.id === id);
    if (!item) {
      return res.status(404).json({ error: 'DIAGNOSTIC_NOT_FOUND' });
    }

    const previousStage = item.pipeline_stage;
    item.pipeline_stage = new_stage;
    item.updated_at = new Date().toISOString();

    // Append to interaction timeline
    if (!item.timeline_events_json) item.timeline_events_json = [];
    item.timeline_events_json.unshift({
      date: new Date().toISOString().split('T')[0],
      text: `Pipeline stage advanced from ${previousStage} to ${new_stage} by ${req.user.name}.${note ? ` Note: "${note}"` : ''}`
    });

    res.json({
      success: true,
      diagnostic: item,
      message: `Stage updated to ${new_stage}`
    });
  }
);

/**
 * POST /api/crm/diagnostics/:id/notes
 * Appends strategy notes and timeline interaction
 */
crmRouter.post(
  '/diagnostics/:id/notes',
  authenticateToken,
  requireRole(['STRATEGIC_CONSULTANT', 'SUPER_ADMIN']),
  (req, res) => {
    const { id } = req.params;
    const { notes } = req.body;

    const item = db.clientDiagnostics.find(d => d.id === id);
    if (!item) return res.status(404).json({ error: 'DIAGNOSTIC_NOT_FOUND' });

    item.strategy_notes = notes;
    item.updated_at = new Date().toISOString();

    if (!item.timeline_events_json) item.timeline_events_json = [];
    item.timeline_events_json.unshift({
      date: new Date().toISOString().split('T')[0],
      text: `Strategy notes updated by ${req.user.name}.`
    });

    res.json({ success: true, diagnostic: item });
  }
);

/**
 * POST /api/crm/diagnostics/:id/attachment
 * Simulates secure file upload zone for strategy briefs and audit PDFs
 */
crmRouter.post(
  '/diagnostics/:id/attachment',
  authenticateToken,
  requireRole(['STRATEGIC_CONSULTANT', 'SUPER_ADMIN']),
  (req, res) => {
    const { id } = req.params;
    const { filename, filesize } = req.body;

    const item = db.clientDiagnostics.find(d => d.id === id);
    if (!item) return res.status(404).json({ error: 'DIAGNOSTIC_NOT_FOUND' });

    if (!item.attachments_json) item.attachments_json = [];
    const newAttachment = {
      name: filename || 'Strategy_Brief.pdf',
      size: filesize || '1.8MB',
      uploaded_at: new Date().toISOString().split('T')[0],
      uploaded_by: req.user.name
    };
    item.attachments_json.unshift(newAttachment);

    res.json({ success: true, attachment: newAttachment, diagnostic: item });
  }
);

/**
 * POST /api/crm/lead
 * Public ingestion endpoint receiving submissions from public landing page
 */
crmRouter.post('/lead', (req, res) => {
  const { company_name, contact_email, client_type, selected_pillar, budget_range, message } = req.body;

  if (!contact_email || !message) {
    return res.status(400).json({ error: 'MISSING_REQUIRED_FIELDS' });
  }

  // Calculate automated lead score (0 - 100) based on corporate metrics
  let score = 60;
  if (budget_range === '$75k+') score += 25;
  else if (budget_range === '$35k - $75k') score += 15;
  else if (budget_range === '$15k - $35k') score += 10;

  if (client_type === 'Enterprise') score += 15;
  else if (client_type === 'Institution') score += 12;
  else if (client_type === 'SME') score += 8;

  score = Math.min(99, score);

  const newDiagnostic = {
    id: `diag-${Date.now()}`,
    company_name: company_name || 'Anonymous Client',
    contact_email: contact_email,
    selected_bottleneck: message,
    operational_data_json: {
      client_type: client_type || 'Entrepreneur',
      primary_pillar: selected_pillar || 'Strategy & Growth',
      budget_range: budget_range || '$15k - $35k',
      target_timeline: '30 Days'
    },
    lead_score: score,
    pipeline_stage: 'DIAGNOSE',
    assigned_consultant_id: null,
    strategy_notes: '',
    attachments_json: [],
    timeline_events_json: [
      {
        date: new Date().toISOString().split('T')[0],
        text: `Inbound diagnostic received via public site. Automated lead score calculated: ${score}.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.clientDiagnostics.unshift(newDiagnostic);

  // Trigger automation log
  db.automationLogs.unshift({
    id: `log-${Date.now()}`,
    agent_name: 'InboundLeadQualificationAgent',
    status: 'SUCCESS',
    payload_summary: `Intake diagnostic for ${company_name} (${contact_email}). Calculated Lead Score: ${score}. Assigned to stage DIAGNOSE.`,
    error_message: null,
    retry_count: 0,
    executed_at: new Date().toISOString()
  });

  res.json({
    success: true,
    message: 'Diagnostic ingested and scored successfully.',
    id: newDiagnostic.id
  });
});
