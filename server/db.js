/**
 * NEXA GROWTH — In-Memory / Persistent Data Engine
 * Implements the Prisma Schema models with seeded operational data.
 */

import { COMPANY_INFO } from '../src/data/companyData.js';
import { servicesData } from '../src/data/servicesData.js';

class OperationalDatabase {
  constructor() {
    this.users = [];
    this.clientDiagnostics = [];
    this.ecosystemPillars = [];
    this.discoveryMetadata = [];
    this.automationLogs = [];
    this.auditTrail = [];
    this.seedInitialData();
  }

  seedInitialData() {
    // 1. Seed Internal Users with all 4 RBAC Roles
    this.users = [
      {
        id: 'usr-admin-01',
        name: 'Julian Vance',
        email: 'admin@nexagrowth.com',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 90 * 86400000).toISOString()
      },
      {
        id: 'usr-strat-02',
        name: 'Sarah Jenkins',
        email: 'strategy@nexagrowth.com',
        role: 'STRATEGIC_CONSULTANT',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 60 * 86400000).toISOString()
      },
      {
        id: 'usr-creat-03',
        name: 'Marcus Kauri',
        email: 'creative@nexagrowth.com',
        role: 'CREATIVE_EDITOR',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 45 * 86400000).toISOString()
      },
      {
        id: 'usr-tech-04',
        name: 'Elena Thorne',
        email: 'engineer@nexagrowth.com',
        role: 'TECH_ENGINEER',
        status: 'ACTIVE',
        created_at: new Date(Date.now() - 30 * 86400000).toISOString()
      }
    ];

    // 2. Seed Client Diagnostics (6 Pipeline Stages)
    this.clientDiagnostics = [
      {
        id: 'diag-001',
        company_name: 'Vanguard Industrial Systems',
        contact_email: 'd.sterling@vanguard-systems.com',
        selected_bottleneck: 'Manual sales triage & outdated web presence losing qualified inquiries',
        operational_data_json: {
          client_type: 'SME',
          primary_pillar: 'Strategy & Growth',
          budget_range: '$35k - $75k',
          team_size: '45 employees',
          target_timeline: '60 Days'
        },
        lead_score: 94,
        pipeline_stage: 'MEASUREMENT',
        assigned_consultant_id: 'usr-strat-02',
        strategy_notes: 'Successfully deployed automated pipeline and 24/7 qualification webhook. Initial 30-day conversion tracking shows +340% inbound inquiry volume.',
        attachments_json: [
          { name: 'Vanguard_Digital_Audit_v2.pdf', size: '2.4MB', uploaded_at: '2026-02-14' },
          { name: 'CRM_Routing_Architecture.pdf', size: '1.8MB', uploaded_at: '2026-02-28' }
        ],
        timeline_events_json: [
          { date: '2026-01-10', text: 'Diagnostic submitted via Auckland digital portal.' },
          { date: '2026-01-18', text: 'Executive diagnostic strategy session held with MD.' },
          { date: '2026-02-01', text: 'Stage advanced from STRATEGY to DESIGN.' },
          { date: '2026-02-20', text: 'CRM Webhooks deployed and validated by Tech team.' },
          { date: '2026-03-05', text: 'Advanced to MEASUREMENT. Active ROI reporting cadence active.' }
        ],
        created_at: new Date(Date.now() - 65 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 86400000).toISOString()
      },
      {
        id: 'diag-002',
        company_name: 'OmniPulse HealthTech',
        contact_email: 'alistair@omnipulse.io',
        selected_bottleneck: 'Need rapid MVP validation, clinical storytelling, and pre-seed launch architecture',
        operational_data_json: {
          client_type: 'Entrepreneur',
          primary_pillar: 'Innovation & Ideas',
          budget_range: '$35k - $75k',
          team_size: '3 Co-Founders',
          target_timeline: '90 Days'
        },
        lead_score: 88,
        pipeline_stage: 'TECH',
        assigned_consultant_id: 'usr-strat-02',
        strategy_notes: 'MVP wireframing and clinical workflow compliance approved. Frontend engineering underway on Vite/React architecture.',
        attachments_json: [
          { name: 'OmniPulse_MVP_Specs.pdf', size: '4.1MB', uploaded_at: '2026-03-01' }
        ],
        timeline_events_json: [
          { date: '2026-02-01', text: 'Diagnostic intake from Singapore Innovation Hub.' },
          { date: '2026-02-12', text: 'From Idea to Market 10-step roadmap finalized.' },
          { date: '2026-03-01', text: 'Stage shifted to TECH for MVP build.' }
        ],
        created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 5 * 86400000).toISOString()
      },
      {
        id: 'diag-003',
        company_name: 'Pacific Rim Civic & Educational Institute',
        contact_email: 'm.tewhiu@pacificrim-civic.org',
        selected_bottleneck: 'Legacy paper workflows and fragmented citizen service journeys',
        operational_data_json: {
          client_type: 'Institution',
          primary_pillar: 'Digital Transformation',
          budget_range: '$75k+',
          team_size: '180 staff',
          target_timeline: '6 Months'
        },
        lead_score: 96,
        pipeline_stage: 'DESIGN',
        assigned_consultant_id: 'usr-admin-01',
        strategy_notes: 'Civic service journey architecture validated. Prototype user testing scheduled with Auckland community boards.',
        attachments_json: [
          { name: 'Institutional_Diagnosis_Executive_Brief.pdf', size: '5.8MB', uploaded_at: '2026-03-08' }
        ],
        timeline_events_json: [
          { date: '2026-02-15', text: 'Inbound tender request submitted.' },
          { date: '2026-02-28', text: 'Diagnostic audit completed across 4 departments.' },
          { date: '2026-03-08', text: 'Approved for DESIGN phase.' }
        ],
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 3 * 86400000).toISOString()
      },
      {
        id: 'diag-004',
        company_name: 'Aethel Direct Logistics',
        contact_email: 'j.thorne@aetheldirect.co',
        selected_bottleneck: 'High customer churn and missing automated WhatsApp/SMS nurture loop',
        operational_data_json: {
          client_type: 'Enterprise',
          primary_pillar: 'CRM & Experience',
          budget_range: '$35k - $75k',
          team_size: '95 staff',
          target_timeline: '45 Days'
        },
        lead_score: 91,
        pipeline_stage: 'MARKETING',
        assigned_consultant_id: 'usr-strat-02',
        strategy_notes: 'CRM segmentation active. Two-way WhatsApp automation and lifecycle email funnels live.',
        attachments_json: [],
        timeline_events_json: [
          { date: '2026-01-20', text: 'Intake triage performed.' },
          { date: '2026-02-10', text: 'CRM data model finalized.' },
          { date: '2026-03-02', text: 'Advanced to MARKETING for multi-channel activation.' }
        ],
        created_at: new Date(Date.now() - 50 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 4 * 86400000).toISOString()
      },
      {
        id: 'diag-005',
        company_name: 'Solaris Oceanic Logistics',
        contact_email: 'capt.ross@solaris-oceanic.nz',
        selected_bottleneck: 'Need defensible market positioning and high-impact vessel showcase for enterprise contracts',
        operational_data_json: {
          client_type: 'SME',
          primary_pillar: 'Brand & Communication',
          budget_range: '$15k - $35k',
          team_size: '22 staff',
          target_timeline: '30 Days'
        },
        lead_score: 82,
        pipeline_stage: 'STRATEGY',
        assigned_consultant_id: 'usr-strat-02',
        strategy_notes: 'Drafting positioning against standard marine transport. Formulating interactive ROI calculator concept.',
        attachments_json: [],
        timeline_events_json: [
          { date: '2026-03-10', text: 'Diagnostic submitted via contact concierge.' },
          { date: '2026-03-12', text: 'Advanced from DIAGNOSE to STRATEGY.' }
        ],
        created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 86400000).toISOString()
      },
      {
        id: 'diag-006',
        company_name: 'Apex BioIntelligence',
        contact_email: 'research@apexbiointel.sg',
        selected_bottleneck: 'Raw proprietary diagnostic AI model needs enterprise positioning, GTM, and capital deck',
        operational_data_json: {
          client_type: 'Entrepreneur',
          primary_pillar: 'AI & Automation',
          budget_range: '$35k - $75k',
          team_size: '4 Researchers',
          target_timeline: '60 Days'
        },
        lead_score: 87,
        pipeline_stage: 'DIAGNOSE',
        assigned_consultant_id: null,
        strategy_notes: 'New submission pending initial consultant assignment and NDA execution.',
        attachments_json: [],
        timeline_events_json: [
          { date: '2026-03-15', text: 'Inbound submission received. Initial lead scoring complete.' }
        ],
        created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 86400000).toISOString()
      }
    ];

    // 3. Seed Ecosystem Pillars (All 8 Core Service Pillars with Dependencies)
    this.ecosystemPillars = servicesData.map((s, idx) => ({
      id: `pillar-${s.number}`,
      pillar_number: idx + 1,
      title: s.title,
      tagline: s.tagline,
      description: s.shortDesc,
      capabilities_list_text: s.whatWeOffer.map(o => o.name),
      dependent_pillar_ids: this.calculatePillarDependencies(idx + 1),
      target_audiences_json: {
        entrepreneurs: `Tailored zero-to-one implementation of ${s.title} for founders launching innovative market vehicles.`,
        smes: `Operational scaling and digitalization of ${s.title} to cut friction and compound revenue.`,
        institutions: `Modernizing public and institutional processes with compliant, accessible ${s.title} architectures.`,
        enterprises: `Enterprise-grade transformation, CX enhancement, and cross-border expansion through ${s.title}.`
      },
      updated_at: new Date().toISOString()
    }));

    // 4. Seed Discovery Metadata (SEO, AEO JSON-LD, and GEO Citations)
    this.discoveryMetadata = [
      {
        id: 'disc-home',
        page_route: '/',
        meta_title: 'NEXA GROWTH — Transforming Ideas Into Brands, Digital Solutions & Growth Systems',
        meta_description: 'NEXA GROWTH is an international strategy, technology and growth company operating across Auckland, New Zealand (HQ) and Singapore. We turn ideas into defensible brands, modern digital platforms, and autonomous systems.',
        og_tags_json: {
          'og:title': 'NEXA GROWTH — Strategy, Technology & Growth Systems',
          'og:description': 'Transforming ideas into brands, digital solutions and growth systems across Auckland and Singapore.',
          'og:image': 'https://nexagrowth.com/logo.png',
          'og:type': 'website',
          'twitter:card': 'summary_large_image'
        },
        json_ld_schema_json: {
          '@context': 'https://schema.org',
          '@type': 'Corporation',
          'name': 'NEXA GROWTH',
          'alternateName': 'NEXA GROWTH International',
          'url': 'https://nexagrowth.com',
          'logo': 'https://nexagrowth.com/logo.png',
          'email': 'nexaafricadigital@gmail.com',
          'address': [
            {
              '@type': 'PostalAddress',
              'addressLocality': 'Auckland',
              'addressRegion': 'Auckland Central',
              'addressCountry': 'NZ',
              'streetAddress': 'Commercial Bay & Britomart Precinct'
            },
            {
              '@type': 'PostalAddress',
              'addressLocality': 'Singapore',
              'addressCountry': 'SG',
              'streetAddress': 'Marina Bay Financial Centre'
            }
          ],
          'knowsAbout': [
            'Business Growth Strategy',
            'Brand Architecture',
            'Digital Transformation',
            'AI & Workflow Automation',
            'Omnichannel Customer Acquisition',
            'CRM Architecture',
            'From Idea to Market Incubation',
            'Performance Data Analytics'
          ]
        },
        structured_faq_json: [
          {
            question: 'What is NEXA GROWTH?',
            answer: 'NEXA GROWTH is a strategy, technology and growth company helping entrepreneurs, SMEs, institutions and organizations transform ideas, brands and business activities into structured, scalable solutions and growth systems.'
          },
          {
            question: 'What are the 8 Core Service Pillars of NEXA GROWTH?',
            answer: '1) Strategy & Business Growth, 2) Brand & Communication, 3) Digital Transformation, 4) AI & Automation, 5) Marketing & Customer Acquisition, 6) CRM & Customer Experience, 7) Innovation & Idea Development, and 8) Data, Analytics & Performance.'
          },
          {
            question: 'Where is NEXA GROWTH headquartered?',
            answer: 'NEXA GROWTH is headquartered in Auckland, New Zealand, with an international hub operating in Singapore.'
          }
        ],
        brand_citations_list_text: [
          'Auckland Chamber of Commerce Corporate Register',
          'Singapore Economic Development Directory',
          'Trans-Tasman Innovation Network',
          'Asia-Pacific Strategic Consultancy Index'
        ],
        spatial_geotags_json: {
          headquarters: {
            city: 'Auckland',
            latitude: -36.8485,
            longitude: 174.7633,
            nap: 'NEXA GROWTH HQ, Auckland Central 1010, New Zealand'
          },
          hub: {
            city: 'Singapore',
            latitude: 1.2801,
            longitude: 103.8540,
            nap: 'NEXA GROWTH Hub, Marina Bay Financial Centre, Singapore 018981'
          }
        },
        sitemap_excluded: false,
        updated_at: new Date().toISOString()
      },
      {
        id: 'disc-methodology',
        page_route: '/methodology',
        meta_title: 'The NEXA Transformation Methodology — 6-Step Connected Growth Process',
        meta_description: 'Explore the proprietary 6-step transformation methodology and the complete NEXA Value Model: Consulting, Strategy, Creation, Technology, Automation, Marketing, Analytics, and Growth.',
        og_tags_json: {
          'og:title': 'NEXA Transformation Methodology',
          'og:description': 'Diagnose → Strategy → Concept & Design → Technology & Automation → Marketing & Acquisition → Measurement.',
          'og:image': 'https://nexagrowth.com/logo.png',
          'og:type': 'article'
        },
        json_ld_schema_json: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          'name': 'The NEXA 6-Step Transformation Methodology',
          'step': [
            { '@type': 'HowToStep', 'name': '01. Diagnose' },
            { '@type': 'HowToStep', 'name': '02. Strategy' },
            { '@type': 'HowToStep', 'name': '03. Concept & Design' },
            { '@type': 'HowToStep', 'name': '04. Technology & Automation' },
            { '@type': 'HowToStep', 'name': '05. Marketing & Acquisition' },
            { '@type': 'HowToStep', 'name': '06. Measurement & Optimization' }
          ]
        },
        structured_faq_json: [
          {
            question: 'How does the NEXA Value Model work?',
            answer: 'CONSULTING → STRATEGY → CREATION → TECHNOLOGY → AUTOMATION → MARKETING → ANALYTICS → GROWTH.'
          }
        ],
        brand_citations_list_text: ['NEXA Value Model Framework Dossier'],
        spatial_geotags_json: null,
        sitemap_excluded: false,
        updated_at: new Date().toISOString()
      }
    ];

    // 5. Seed Automation Logs
    this.automationLogs = [
      {
        id: 'log-101',
        agent_name: 'InboundLeadQualificationAgent',
        status: 'SUCCESS',
        payload_summary: 'Processed diagnostic submission for Vanguard Industrial Systems. Parsed company size, calculated lead score 94, dished notification webhook.',
        error_message: null,
        retry_count: 0,
        executed_at: new Date(Date.now() - 12 * 3600000).toISOString()
      },
      {
        id: 'log-102',
        agent_name: 'AucklandSmsDispatchGateway',
        status: 'SUCCESS',
        payload_summary: 'Sent instant 3-minute executive confirmation SMS to client contact (NZ mobile gateway).',
        error_message: null,
        retry_count: 0,
        executed_at: new Date(Date.now() - 11 * 3600000).toISOString()
      },
      {
        id: 'log-103',
        agent_name: 'CrmWebhookSyncRelay',
        status: 'WARNING',
        payload_summary: 'HubSpot CRM custom properties mapping completed with 1 unmapped secondary field (team_size_subdivision).',
        error_message: 'Minor schema discrepancy on non-blocking metadata property.',
        retry_count: 1,
        executed_at: new Date(Date.now() - 6 * 3600000).toISOString()
      },
      {
        id: 'log-104',
        agent_name: 'AeoGraphSchemaGenerator',
        status: 'SUCCESS',
        payload_summary: 'Generated and published updated JSON-LD entity graph for Perplexity and Claude search crawlers.',
        error_message: null,
        retry_count: 0,
        executed_at: new Date(Date.now() - 3 * 3600000).toISOString()
      },
      {
        id: 'log-105',
        agent_name: 'WhatsAppNotificationDispatcher',
        status: 'FAILED',
        payload_summary: 'Failed to deliver automated WhatsApp appointment reminder to international number (+65 8912-XXXX).',
        error_message: 'HTTP 429: WhatsApp Business API rate limiter threshold reached. Retry queued.',
        retry_count: 2,
        executed_at: new Date(Date.now() - 45 * 60000).toISOString()
      }
    ];

    // 6. Seed Audit Trail
    this.auditTrail = [
      {
        id: 'aud-001',
        user_id: 'usr-admin-01',
        action_performed: 'INITIALIZE_SYSTEM_ENGINE',
        resource_targeted: 'SystemConfiguration:Global',
        ip_address: '103.14.28.12 (Auckland HQ)',
        timestamp: new Date(Date.now() - 30 * 86400000).toISOString()
      },
      {
        id: 'aud-002',
        user_id: 'usr-strat-02',
        action_performed: 'MUTATE_PIPELINE_STAGE',
        resource_targeted: 'ClientDiagnostic:diag-001 (TECH -> MARKETING)',
        ip_address: '118.200.41.90 (Singapore Hub)',
        timestamp: new Date(Date.now() - 15 * 86400000).toISOString()
      },
      {
        id: 'aud-003',
        user_id: 'usr-creat-03',
        action_performed: 'UPDATE_PILLAR_METADATA',
        resource_targeted: 'EcosystemPillar:pillar-04 (AI & Automation)',
        ip_address: '103.14.28.12 (Auckland HQ)',
        timestamp: new Date(Date.now() - 5 * 86400000).toISOString()
      },
      {
        id: 'aud-004',
        user_id: 'usr-tech-04',
        action_performed: 'RETRY_AUTOMATION_EXECUTION',
        resource_targeted: 'AutomationLog:log-103',
        ip_address: '103.14.28.12 (Auckland HQ)',
        timestamp: new Date(Date.now() - 2 * 3600000).toISOString()
      }
    ];
  }

  calculatePillarDependencies(pillarNum) {
    const depMap = {
      1: [2, 3],       // Strategy depends on Brand & Digital
      2: [1],          // Brand depends on Strategy
      3: [1, 2, 4],    // Digital depends on Strategy, Brand, AI
      4: [3, 6],       // AI depends on Digital Platforms & CRM
      5: [1, 2, 3],    // Marketing depends on Strategy, Brand, Digital
      6: [4, 5, 8],    // CRM depends on AI, Marketing, Data
      7: [1, 2, 3],    // Innovation depends on Strategy, Brand, Digital
      8: [1, 5, 6]     // Data depends on Strategy, Marketing, CRM
    };
    return depMap[pillarNum] || [];
  }
}

export const db = new OperationalDatabase();
