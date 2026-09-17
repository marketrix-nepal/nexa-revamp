import { Router } from 'express';
import { db } from '../db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

export const pillarsRouter = Router();

/**
 * GET /api/pillars
 * Returns all 8 ecosystem pillars, their dependencies, and audience copy variants
 */
pillarsRouter.get('/', authenticateToken, (req, res) => {
  res.json({
    total: db.ecosystemPillars.length,
    pillars: db.ecosystemPillars
  });
});

/**
 * PUT /api/pillars/:id
 * Modifies pillar details, tagline, and architectural system dependencies
 * Restricted to CREATIVE_EDITOR and SUPER_ADMIN
 */
pillarsRouter.put(
  '/:id',
  authenticateToken,
  requireRole(['CREATIVE_EDITOR', 'SUPER_ADMIN']),
  (req, res) => {
    const { id } = req.params;
    const { title, tagline, description, capabilities_list_text, dependent_pillar_ids } = req.body;

    const pillar = db.ecosystemPillars.find(p => p.id === id || String(p.pillar_number) === id);
    if (!pillar) {
      return res.status(404).json({ error: 'PILLAR_NOT_FOUND' });
    }

    if (title) pillar.title = title;
    if (tagline) pillar.tagline = tagline;
    if (description) pillar.description = description;
    if (capabilities_list_text) pillar.capabilities_list_text = capabilities_list_text;
    if (dependent_pillar_ids) pillar.dependent_pillar_ids = dependent_pillar_ids;
    pillar.updated_at = new Date().toISOString();

    res.json({
      success: true,
      pillar,
      message: `Pillar 0${pillar.pillar_number} updated successfully.`
    });
  }
);

/**
 * PUT /api/pillars/:id/audience
 * Updates audience landing page copy variants (Entrepreneurs, SMEs, Institutions, Enterprises)
 * Restricted to CREATIVE_EDITOR and SUPER_ADMIN
 */
pillarsRouter.put(
  '/:id/audience',
  authenticateToken,
  requireRole(['CREATIVE_EDITOR', 'SUPER_ADMIN']),
  (req, res) => {
    const { id } = req.params;
    const { target_audiences_json } = req.body;

    const pillar = db.ecosystemPillars.find(p => p.id === id || String(p.pillar_number) === id);
    if (!pillar) {
      return res.status(404).json({ error: 'PILLAR_NOT_FOUND' });
    }

    pillar.target_audiences_json = {
      ...pillar.target_audiences_json,
      ...target_audiences_json
    };
    pillar.updated_at = new Date().toISOString();

    res.json({
      success: true,
      pillar,
      message: `Audience copy variants for Pillar 0${pillar.pillar_number} saved.`
    });
  }
);
