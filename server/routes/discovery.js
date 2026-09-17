import { Router } from 'express';
import { db } from '../db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

export const discoveryRouter = Router();

/**
 * GET /api/discovery
 * Lists all registered routes with SEO, AEO JSON-LD schema, and GEO spatial citations
 */
discoveryRouter.get('/', authenticateToken, (req, res) => {
  res.json({
    total: db.discoveryMetadata.length,
    routes: db.discoveryMetadata
  });
});

/**
 * GET /api/discovery/:id
 * Retrieves metadata for a specific route
 */
discoveryRouter.get('/:id', authenticateToken, (req, res) => {
  const item = db.discoveryMetadata.find(d => d.id === req.params.id || d.page_route === req.params.id);
  if (!item) return res.status(404).json({ error: 'ROUTE_NOT_FOUND' });
  res.json(item);
});

/**
 * PUT /api/discovery/:id
 * Modifies Traditional SEO, AEO JSON-LD structured schema, and GEO citation fields
 * Restricted to CREATIVE_EDITOR and SUPER_ADMIN
 */
discoveryRouter.put(
  '/:id',
  authenticateToken,
  requireRole(['CREATIVE_EDITOR', 'SUPER_ADMIN']),
  (req, res) => {
    const { id } = req.params;
    const {
      meta_title,
      meta_description,
      og_tags_json,
      json_ld_schema_json,
      structured_faq_json,
      brand_citations_list_text,
      spatial_geotags_json,
      sitemap_excluded
    } = req.body;

    const item = db.discoveryMetadata.find(d => d.id === id || d.page_route === id);
    if (!item) return res.status(404).json({ error: 'ROUTE_NOT_FOUND' });

    if (meta_title !== undefined) item.meta_title = meta_title;
    if (meta_description !== undefined) item.meta_description = meta_description;
    if (og_tags_json !== undefined) item.og_tags_json = og_tags_json;
    if (json_ld_schema_json !== undefined) item.json_ld_schema_json = json_ld_schema_json;
    if (structured_faq_json !== undefined) item.structured_faq_json = structured_faq_json;
    if (brand_citations_list_text !== undefined) item.brand_citations_list_text = brand_citations_list_text;
    if (spatial_geotags_json !== undefined) item.spatial_geotags_json = spatial_geotags_json;
    if (sitemap_excluded !== undefined) item.sitemap_excluded = sitemap_excluded;
    item.updated_at = new Date().toISOString();

    res.json({
      success: true,
      metadata: item,
      message: `Discovery suite updated for route: ${item.page_route}`
    });
  }
);

/**
 * POST /api/discovery/generate-aeo
 * Utility route that builds a valid JSON-LD graph specifically designed
 * for ingestion by LLMs (Perplexity, ChatGPT, Claude)
 */
discoveryRouter.post(
  '/generate-aeo',
  authenticateToken,
  requireRole(['CREATIVE_EDITOR', 'SUPER_ADMIN']),
  (req, res) => {
    const { page_route, brand_name, faqs, capabilities } = req.body;

    const generatedSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Corporation',
          '@id': 'https://nexagrowth.com/#corporation',
          'name': brand_name || 'NEXA GROWTH',
          'url': 'https://nexagrowth.com',
          'logo': 'https://nexagrowth.com/logo.png',
          'description': 'Strategy, technology and growth company helping entrepreneurs, SMEs, institutions and organizations build connected systems.',
          'knowsAbout': capabilities || [
            'Strategy & Business Growth',
            'Brand Architecture',
            'Digital Transformation',
            'Applied AI & Automation'
          ],
          'contactPoint': {
            '@type': 'ContactPoint',
            'email': 'nexaafricadigital@gmail.com',
            'contactType': 'Strategic Inquiries'
          }
        },
        {
          '@type': 'FAQPage',
          '@id': `https://nexagrowth.com${page_route || '/'}#faq`,
          'mainEntity': (faqs || []).map(f => ({
            '@type': 'Question',
            'name': f.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': f.answer
            }
          }))
        }
      ]
    };

    res.json({
      success: true,
      json_ld: generatedSchema
    });
  }
);
