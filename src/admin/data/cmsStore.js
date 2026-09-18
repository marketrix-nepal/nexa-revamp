/**
 * NEXA Website CMS Data Store
 * Persistent edge-synchronized content management for:
 * 1. Hero & Announcements
 * 2. 8 Core Service Pillars
 * 3. Page Copy & Philosophy (Manifesto, Methodology, Training, Concierge)
 * 4. Media & Asset Vault
 */

import { servicesData } from '../../data/servicesData.js';

export const CMS_STORAGE_KEY = 'nexa_cms_store';
export const CMS_UPDATED_EVENT = 'nexa:cms-updated';

export const DEFAULT_MEDIA_VAULT = [
  {
    id: 'media-01',
    name: 'Neural Monolith Abstract',
    category: 'Hero',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    tags: ['monolith', 'neural', 'dark']
  },
  {
    id: 'media-02',
    name: 'Architectural Cyber Minimal',
    category: 'Brand',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    tags: ['strategy', 'executive', 'commercial']
  },
  {
    id: 'media-03',
    name: 'Digital Velocity & Cloud Infra',
    category: 'Services',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    tags: ['digital', 'platforms', 'code']
  },
  {
    id: 'media-04',
    name: 'Autonomous Machine Intelligence',
    category: 'Services',
    url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    tags: ['ai', 'automation', 'agents']
  },
  {
    id: 'media-05',
    name: 'Omnichannel Precision Analytics',
    category: 'Services',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['data', 'analytics', 'growth']
  },
  {
    id: 'media-06',
    name: 'Executive Studio Headquarters',
    category: 'Brand',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    tags: ['architecture', 'auckland', 'singapore']
  }
];

export const DEFAULT_CMS_DATA = {
  hero: {
    announcement: 'OPERATIONAL · AUCKLAND HQ & SINGAPORE HUB',
    showAnnouncement: true,
    sublabel: 'STRATEGY · TECHNOLOGY · GROWTH',
    titleGradient: 'Transforming Ideas Into Brands,',
    titleAccent: 'Digital Solutions & Growth Systems.',
    executiveLead: 'NEXA GROWTH connects strategy, creativity, technology, AI, automation, marketing and data to help entrepreneurs, SMEs, institutions and organizations build stronger brands, better systems and sustainable growth.',
    primaryCtaText: 'Start a Project',
    primaryCtaLink: '#concierge-stage',
    secondaryCtaText: 'Explore Company Overview',
    secondaryCtaLink: '#manifesto-stage',
    disciplinesStrip: [
      'Strategy', 'Growth', 'Brand', 'Digital Transformation', 'AI & Automation', 'Marketing', 'CRM', 'Innovation', 'Data'
    ]
  },
  services: servicesData.map((s, idx) => ({
    id: s.id,
    number: s.number || `0${idx + 1}`,
    title: s.title,
    tagline: s.tagline,
    shortDesc: s.shortDesc,
    heroLead: s.heroLead,
    status: 'ACTIVE',
    image: DEFAULT_MEDIA_VAULT[idx % DEFAULT_MEDIA_VAULT.length]?.url || '',
    whatWeOffer: Array.isArray(s.whatWeOffer) ? [...s.whatWeOffer] : [],
    solutionsDeliverables: Array.isArray(s.solutionsDeliverables) ? [...s.solutionsDeliverables] : []
  })),
  pages: {
    manifesto: {
      sectionLabel: 'OUR OPERATING PHILOSOPHY',
      headline: 'The Anti-Agency Thesis',
      subhead: 'Why traditional agency retainers fail modern ambitious enterprises.',
      leadParagraph: 'Most agencies sell fragmented silos: design teams that do not understand conversion economics, performance media buyers with no brand sensitivity, and software developers detached from commercial strategy. NEXA was founded on an opposing premise.',
      corePrinciples: [
        {
          title: 'Unified Systems Over Fragmented Silos',
          desc: 'Strategy, creative, code, and growth marketing must share a singular architectural thesis to build defensible market advantage.'
        },
        {
          title: 'Commercial Velocity & Operational Moats',
          desc: 'We do not build vanity artifacts. Every system deployed is engineered to increase margin, acquire customers, or eliminate manual friction.'
        },
        {
          title: 'Obsessive Partnership & High Accountability',
          desc: 'We act as an integrated growth partner, aligning executive roadmaps with transparent milestones and measurable business value.'
        }
      ]
    },
    methodology: {
      sectionLabel: 'THE NEXA ENGAGEMENT FRAMEWORK',
      headline: 'From Strategic Diagnosis to Autonomous Scaling',
      lead: 'A rigorous three-stage compounding framework engineered to turn complex commercial challenges into resilient, automated growth machines.',
      phases: [
        {
          step: 'Phase 01',
          name: 'Deconstruction & Commercial Audit',
          desc: 'Rigorous diagnostic of commercial bottlenecks, unit economics, customer touchpoints, and defensible market opportunities.'
        },
        {
          step: 'Phase 02',
          name: 'Ecosystem Architecture & Synthesis',
          desc: 'Engineering the brand narrative, high-velocity web platform, automated agentic workflows, and CRM pipeline infrastructure.'
        },
        {
          step: 'Phase 03',
          name: 'Compounding Execution & Scale',
          desc: 'Deploying high-intent acquisition campaigns, continuous conversion rate optimization, and weekly governance review cadences.'
        }
      ]
    },
    training: {
      sectionLabel: 'EXECUTIVE UPSKILLING & WORKSHOPS',
      headline: 'Upskill Your Leadership & Teams on Modern AI & Growth Systems',
      lead: 'We conduct bespoke masterclasses, hands-on AI workflow labs, and executive briefings for organizations ready to build internal capabilities and lead their industries.'
    },
    concierge: {
      sectionLabel: 'COMMERCIAL INTAKE & ADVISORY',
      headline: 'Initiate Strategic Engagement',
      lead: 'Tell us about your organization, commercial objectives, and desired timeline. An executive advisor will respond within 4 hours.',
      directPhone: '+64 9 887 9342',
      directEmail: 'growth@nexagrowth.com',
      officeLocations: 'Auckland · Singapore'
    }
  },
  mediaVault: DEFAULT_MEDIA_VAULT
};

/**
 * Retrieve current CMS data with fallback to defaults
 */
export function getCmsStore() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        hero: { ...DEFAULT_CMS_DATA.hero, ...(parsed.hero || {}) },
        services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : DEFAULT_CMS_DATA.services,
        pages: {
          manifesto: { ...DEFAULT_CMS_DATA.pages.manifesto, ...(parsed.pages?.manifesto || {}) },
          methodology: { ...DEFAULT_CMS_DATA.pages.methodology, ...(parsed.pages?.methodology || {}) },
          training: { ...DEFAULT_CMS_DATA.pages.training, ...(parsed.pages?.training || {}) },
          concierge: { ...DEFAULT_CMS_DATA.pages.concierge, ...(parsed.pages?.concierge || {}) }
        },
        mediaVault: Array.isArray(parsed.mediaVault) && parsed.mediaVault.length > 0 ? parsed.mediaVault : DEFAULT_CMS_DATA.mediaVault
      };
    }
  } catch (err) {
    console.warn('[CMS Store] Error reading local CMS cache, falling back to defaults:', err);
  }
  return DEFAULT_CMS_DATA;
}

/**
 * Save CMS data to localStorage and dispatch update event across application
 */
export function saveCmsStore(data) {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem('nexa_cms_last_saved', new Date().toISOString());
    window.dispatchEvent(new CustomEvent(CMS_UPDATED_EVENT, { detail: data }));
    return true;
  } catch (err) {
    console.error('[CMS Store] Failed to save CMS store:', err);
    return false;
  }
}

/**
 * Reset CMS store back to initial code defaults
 */
export function resetCmsStore() {
  try {
    localStorage.removeItem(CMS_STORAGE_KEY);
    localStorage.setItem('nexa_cms_last_saved', new Date().toISOString());
    window.dispatchEvent(new CustomEvent(CMS_UPDATED_EVENT, { detail: DEFAULT_CMS_DATA }));
    return DEFAULT_CMS_DATA;
  } catch (err) {
    console.error('[CMS Store] Failed to reset CMS store:', err);
    return DEFAULT_CMS_DATA;
  }
}

/**
 * Export CMS store as a downloadable JSON file
 */
export function exportCmsJson() {
  const store = getCmsStore();
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nexa-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
