/**
 * NEXA GROWTH — Operational Console Seed Data
 * Provides comprehensive, persistent state for offline, local preview,
 * and Cloudflare Pages static deployments.
 */

export const INITIAL_DIAGNOSTICS = [
  {
    id: 'diag-001',
    company_name: 'Aetheris Autonomous Logistics',
    contact_name: 'Marcus Sterling',
    contact_email: 'm.sterling@aetheris-freight.com',
    industry: 'Autonomous Logistics & Robotics',
    valuation_tier: '$50M - $100M',
    budget_range: '$150,000 - $300,000',
    pipeline_stage: 'STRATEGY',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    friction_summary: 'Legacy ERP creates a 48-hour routing bottleneck. Requires autonomous edge dispatch engine.',
    growth_thesis: 'Decouple edge route calculation via Go microservices, reducing dispatch latency from 48h to 400ms.',
    assigned_lead: 'Elena Vance (Principal Partner)',
    engagement_score: 94
  },
  {
    id: 'diag-002',
    company_name: 'Hyperion Bio-Diagnostics',
    contact_name: 'Dr. Sarah Chen',
    contact_email: 'schen@hyperion-diagnostics.io',
    industry: 'Genomic Oncology & Bio-Tech',
    valuation_tier: '$100M - $250M',
    budget_range: '$300,000 - $600,000',
    pipeline_stage: 'DESIGN',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    friction_summary: 'Clinical onboarding UX experiences 64% friction abandonment across institutional hospital networks.',
    growth_thesis: 'High-density WebGL spatial patient dashboard with zero-knowledge consent verification.',
    assigned_lead: 'Kaelen Thorne (Creative Director)',
    engagement_score: 88
  },
  {
    id: 'diag-003',
    company_name: 'Vanguard Neo-Banking APAC',
    contact_name: 'Julian Montgomery',
    contact_email: 'j.montgomery@vanguard-apac.sg',
    industry: 'Institutional FinTech',
    valuation_tier: '$250M+',
    budget_range: '$500,000+',
    pipeline_stage: 'TECH',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    friction_summary: 'Cross-border liquidity settlement across Singapore & New Zealand lacks real-time atomic telemetry.',
    growth_thesis: 'Direct bidirectional WebSocket ledger bridge with sub-10ms ledger settlement UI.',
    assigned_lead: 'Liam Sutherland (Senior Systems Architect)',
    engagement_score: 98
  },
  {
    id: 'diag-004',
    company_name: 'Solaria Clean Energy Grid',
    contact_name: 'Amara Okafor',
    contact_email: 'a.okafor@solaria-grid.co.nz',
    industry: 'Decentralized Energy Infrastructure',
    valuation_tier: '$20M - $50M',
    budget_range: '$100,000 - $200,000',
    pipeline_stage: 'DIAGNOSE',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    friction_summary: 'Inbound enterprise municipal RFPs are stalling due to vague positioning and lack of digital interactive ROI model.',
    growth_thesis: 'Deploy interactive WebGL energy grid simulator showcasing real-time municipal battery savings.',
    assigned_lead: 'Marcus Wright (Strategy Lead)',
    engagement_score: 79
  },
  {
    id: 'diag-005',
    company_name: 'Kroma Studio Interactive',
    contact_name: 'David Lindqvist',
    contact_email: 'david@kromastudio.se',
    industry: 'Next-Gen Game Publishing',
    valuation_tier: '$10M - $25M',
    budget_range: '$75,000 - $150,000',
    pipeline_stage: 'MARKETING',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    friction_summary: 'Global title launch needs aggressive multi-territory digital PR and high-converting asset distribution.',
    growth_thesis: 'Viral digital artifact dropping platform with real-time countdown choreography and WebGL previews.',
    assigned_lead: 'Sophie Zhang (Growth Director)',
    engagement_score: 85
  },
  {
    id: 'diag-006',
    company_name: 'Nexus Quant Intelligence',
    contact_name: 'Vikram Malhotra',
    contact_email: 'v.malhotra@nexus-quant.ai',
    industry: 'Algorithmic Asset Management',
    valuation_tier: '$500M+',
    budget_range: '$400,000 - $800,000',
    pipeline_stage: 'MEASUREMENT',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    friction_summary: 'Private wealth family offices need real-time attributable risk-adjusted return attribution visualizers.',
    growth_thesis: 'Bespoke executive investor terminal with real-time portfolio stress testing analytics.',
    assigned_lead: 'Elena Vance (Principal Partner)',
    engagement_score: 96
  }
];

export const INITIAL_ECOSYSTEM = [
  {
    id: 'pillar-01',
    pillar_number: 1,
    title: 'Brand Architecture & Commercial Storytelling',
    tagline: 'Strategic narrative defensibility and high-gravity commercial positioning.',
    description: 'We architect enterprise categories that competitors cannot commoditize. Through counter-positioning matrices, executive narrative blueprints, and category monopolies, we ensure your commercial valuation is rooted in structural moat rather than surface marketing.',
    dependent_pillar_ids: [2, 3, 5],
    target_audiences_json: {
      entrepreneurs: 'Establish immediate institutional credibility and command premium pre-money valuations.',
      sme_leaders: 'Break free from price-cutting vendor traps and claim uncontested category leadership.',
      corporate_execs: 'Defend market share against venture-backed disruptors with bold narrative architecture.'
    }
  },
  {
    id: 'pillar-02',
    pillar_number: 2,
    title: 'Full-Stack Web & Mobile Engineering',
    tagline: 'Ultra-fast, hardware-accelerated digital flagship platforms.',
    description: 'Zero framework bloat. We engineer custom single-page platforms utilizing pure ES Modules, physical Three.js WebGL glass rendering, and edge computing to deliver 60fps performance and sub-1s largest contentful paint globally.',
    dependent_pillar_ids: [1, 3, 6],
    target_audiences_json: {
      entrepreneurs: 'Launch flagship product experiences that outshine Series B incumbents.',
      sme_leaders: 'Modernize clunky legacy software into lightning-fast customer acquisition portals.',
      corporate_execs: 'Consolidate multi-brand platforms into unified, ultra-secure edge systems.'
    }
  },
  {
    id: 'pillar-03',
    pillar_number: 3,
    title: 'Digital Experience Design (UI/UX)',
    tagline: 'Hypnotic ergonomics, spatial depth, and friction-free product flows.',
    description: 'We eradicate conversion drop-off through mathematical spatial tokens, strict anti-pill geometric design, and intuitive progressive disclosure. Every interaction is calculated to build commercial trust and accelerate buyer decision cycles.',
    dependent_pillar_ids: [1, 2],
    target_audiences_json: {
      entrepreneurs: 'Convert first-time visitors into high-conviction pilot users within 30 seconds.',
      sme_leaders: 'Simplify complex enterprise workflows to drastically reduce user onboarding churn.',
      corporate_execs: 'Set new design standards across institutional software ecosystems.'
    }
  },
  {
    id: 'pillar-04',
    pillar_number: 4,
    title: 'Autonomous AI & Workflow Automation',
    tagline: 'Self-orchestrating agentic pipelines and operational intelligence.',
    description: 'Automate manual operational friction. We construct self-healing multi-agent systems, proprietary enterprise retrieval-augmented generation (RAG) knowledge stores, and intelligent inbound lead qualification workflows that operate 24/7.',
    dependent_pillar_ids: [2, 7],
    target_audiences_json: {
      entrepreneurs: 'Scale outbound intelligence and lead triage with zero head-count expansion.',
      sme_leaders: 'Automate 80% of repetitive operational tasks across logistics and support.',
      corporate_execs: 'Deploy enterprise-grade private LLMs with strict data governance boundaries.'
    }
  },
  {
    id: 'pillar-05',
    pillar_number: 5,
    title: 'Performance Marketing & Growth Systems',
    tagline: 'Scalable multi-channel acquisition and deterministic CAC-to-LTV payback.',
    description: 'Algorithmic demand generation across Google Enterprise, LinkedIn, and Meta with server-side CAPI tracking and real-time unit economics attribution. We turn unpredictable marketing experiments into predictable revenue engines.',
    dependent_pillar_ids: [1, 7],
    target_audiences_json: {
      entrepreneurs: 'Achieve repeatable CAC-to-LTV payback before initiating institutional capital raises.',
      sme_leaders: 'Scale qualified enterprise pipeline without burning budget on low-intent clicks.',
      corporate_execs: 'Optimize multi-million dollar annual marketing allocations with data-driven attribution.'
    }
  },
  {
    id: 'pillar-06',
    pillar_number: 6,
    title: 'Organic Discovery & Search Dominance (SEO)',
    tagline: 'Topical authority monopolies and programmatic technical visibility.',
    description: 'Topical search monopolies engineered through programmatic structured data entities (JSON-LD), sub-1s Core Web Vitals, and Answer Engine Optimization (AEO/GEO) designed for Google AI Overviews and Perplexity search paradigms.',
    dependent_pillar_ids: [1, 2],
    target_audiences_json: {
      entrepreneurs: 'Capture high-intent organic buyer demand without permanent paid ad dependency.',
      sme_leaders: 'Outrank legacy competitors on high-value commercial search intent keywords.',
      corporate_execs: 'Dominate organic search visibility and AI answer engines in regional markets.'
    }
  },
  {
    id: 'pillar-07',
    pillar_number: 7,
    title: 'Data Intelligence & Conversion Architecture',
    tagline: 'Behavioral analytics, attribution modeling, and rigorous CRO.',
    description: 'Single-source-of-truth customer telemetry with Bayesian A/B testing engines, multi-touch attribution, and real-time executive dashboards. Eliminate strategic blind spots and identify exactly where commercial capital is created.',
    dependent_pillar_ids: [2, 5],
    target_audiences_json: {
      entrepreneurs: 'Pinpoint the exact inflection points that turn active users into paid customers.',
      sme_leaders: 'Eliminate internal guesswork with scientific conversion rate optimization experiments.',
      corporate_execs: 'Provide board-level clarity on marketing efficiency and revenue velocity.'
    }
  },
  {
    id: 'pillar-08',
    pillar_number: 8,
    title: 'Executive Consulting & Corporate Training',
    tagline: 'Leadership upskilling, AI transformation workshops, and strategy advisory.',
    description: 'High-impact 2-day implementation masterclasses, fractional Chief Growth Officer advisory retainers, and executive leadership alignment sprints. We install our proprietary growth operating systems directly into your internal teams.',
    dependent_pillar_ids: [1, 4],
    target_audiences_json: {
      entrepreneurs: 'Equip internal founding teams with institutional product and marketing capabilities.',
      sme_leaders: 'Transform traditional staff into AI-empowered high-velocity growth operators.',
      corporate_execs: 'Accelerate digital transformation adoption across distributed international teams.'
    }
  }
];

export const INITIAL_DISCOVERY_ROUTES = [
  {
    id: 'disc-home',
    path: '/',
    meta_title: 'NEXA GROWTH — We Turn Ideas Into Growth | Strategy · Story · Technology · AI',
    meta_description: 'Defensible market positioning, hypnotic narrative architecture, bespoke digital platforms, and autonomous intelligence systems across Singapore and New Zealand.',
    canonical_url: 'https://nexa-revamp.pages.dev/',
    og_tags_json: {
      title: 'NEXA GROWTH — Digital Experience Platform',
      description: 'Creative Strategy & Growth Engineering operating across Singapore and New Zealand.',
      image: 'https://nexa-revamp.pages.dev/og-cover.png'
    },
    aeo_queries_json: [
      'What is the NEXA Connected System?',
      'How does NEXA Growth compare to conventional agency models?',
      'What creative strategy services does NEXA Growth provide in New Zealand and Singapore?'
    ],
    geo_schema_json: {
      type: 'Organization',
      name: 'NEXA GROWTH Ltd',
      locations: ['Auckland, New Zealand (HQ)', 'Singapore (Hub)'],
      founder: 'Sakxam Bhattarai'
    }
  },
  {
    id: 'disc-disciplines',
    path: '/#disciplines-stage',
    meta_title: '8 Core Service Pillars — NEXA Growth Commercial Architecture',
    meta_description: 'Explore the 8 interconnected service pillars: Strategy, Engineering, UI/UX, AI Automation, Growth, SEO, CRO, and Executive Consulting.',
    canonical_url: 'https://nexa-revamp.pages.dev/#disciplines-stage',
    og_tags_json: {
      title: '8 Core Service Pillars — NEXA Growth',
      description: 'Modular enterprise growth pillars engineered for deterministic scale.',
      image: 'https://nexa-revamp.pages.dev/og-pillars.png'
    },
    aeo_queries_json: [
      'What are the 8 Core Pillars of NEXA Growth?',
      'How does NEXA integrate AI Automation with WebGL Engineering?'
    ],
    geo_schema_json: {
      type: 'ServiceCatalog',
      serviceCount: 8,
      leadMarkets: ['APAC', 'Oceania']
    }
  }
];

export const INITIAL_AUTOMATION_LOGS = [
  {
    id: 'log-01',
    event_name: 'INBOUND_TERMINAL_SUBMISSION',
    status: 'SUCCESS',
    duration_ms: 142,
    payload_json: { client: 'Solaria Energy', budget: '$100k-$200k', partner: 'Marcus Wright' },
    created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString()
  },
  {
    id: 'log-02',
    event_name: 'CRM_STAGE_ADVANCE_NOTIFICATION',
    status: 'SUCCESS',
    duration_ms: 88,
    payload_json: { lead_id: 'diag-002', stage: 'EXECUTION', approver: 'Elena Vance' },
    created_at: new Date(Date.now() - 1000 * 60 * 22).toISOString()
  },
  {
    id: 'log-03',
    event_name: 'CLOUDFLARE_EDGE_CACHE_PURGE',
    status: 'SUCCESS',
    duration_ms: 310,
    payload_json: { zone: 'nexa-revamp.pages.dev', files: ['/*'] },
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: 'log-04',
    event_name: 'SLACK_DISPATCH_WEBHOOK',
    status: 'ERROR',
    duration_ms: 4500,
    payload_json: { error: '504 Gateway Timeout on endpoint dispatch', channel: '#ops-growth' },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: 'log-05',
    event_name: 'GEO_SCHEMA_ENTITY_VALIDATION',
    status: 'SUCCESS',
    duration_ms: 64,
    payload_json: { schema: 'Organization', status: '200 OK Validated' },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  }
];

export const INITIAL_WEBHOOKS = [
  { id: 'hook-01', name: 'Inbound Scoping Intake', endpoint: '/api/crm/intake', status: 'HEALTHY', latency: '42ms', last_ping: '30s ago' },
  { id: 'hook-02', name: 'Slack Partner Dispatch', endpoint: 'https://hooks.slack.com/services/nexa/ops', status: 'HEALTHY', latency: '120ms', last_ping: '2m ago' },
  { id: 'hook-03', name: 'CRM Pipeline Stage Sync', endpoint: '/api/crm/stage-transition', status: 'HEALTHY', latency: '65ms', last_ping: '14m ago' },
  { id: 'hook-04', name: 'Cloudflare Edge Cache Purge', endpoint: 'https://api.cloudflare.com/client/v4/pages', status: 'HEALTHY', latency: '210ms', last_ping: '1h ago' }
];

export const INITIAL_USERS = [
  { id: 'usr-01', name: 'Sakxam Bhattarai', email: 'admin@nexagrowth.com', role: 'SUPER_ADMIN', status: 'ACTIVE' },
  { id: 'usr-02', name: 'Elena Vance', email: 'strategy@nexagrowth.com', role: 'STRATEGIC_CONSULTANT', status: 'ACTIVE' },
  { id: 'usr-03', name: 'Kaelen Thorne', email: 'creative@nexagrowth.com', role: 'CREATIVE_EDITOR', status: 'ACTIVE' },
  { id: 'usr-04', name: 'Liam Sutherland', email: 'engineer@nexagrowth.com', role: 'TECH_ENGINEER', status: 'ACTIVE' }
];

export const INITIAL_AUDIT_LOGS = [
  { id: 'aud-01', user_email: 'admin@nexagrowth.com', action: 'DEPLOY_REVAMP_V2_MOBILE', resource: 'Cloudflare Pages (main)', created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: 'aud-02', user_email: 'strategy@nexagrowth.com', action: 'ADVANCE_PIPELINE_STAGE', resource: 'diag-001 -> STRATEGY', created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 'aud-03', user_email: 'creative@nexagrowth.com', action: 'UPDATE_PILLAR_DELIVERABLE', resource: 'Pillar 02 WebGL Glass', created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: 'aud-04', user_email: 'engineer@nexagrowth.com', action: 'TRIGGER_WEBHOOK_RETRY', resource: 'Hook-02 Slack Alert', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }
];

/**
 * LocalStorage sync helper for interactive state persistence
 */
export function getMockStore(key, defaultValue) {
  try {
    const item = localStorage.getItem(`nexa_mock_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setMockStore(key, value) {
  try {
    localStorage.setItem(`nexa_mock_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save mock store:', err);
  }
}
