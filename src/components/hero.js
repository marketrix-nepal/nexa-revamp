/**
 * Hero Component (Act 1: The Overture — Kinetic Neural Monolith)
 * Full-bleed scroll-driven 3D video pinned stage with live atomic clocks,
 * choreographed dark-mode glassmorphic overlays, 8 Core Service Pillars spotlights,
 * and high-converting climax CTA.
 */

export const CORE_SERVICES = [
  {
    index: '01',
    title: 'Strategy & Growth',
    tagline: 'Defensible Commercial Architecture',
    desc: 'Formulating market research, competitive moats, resilient business models, and high-margin go-to-market roadmaps.',
    pill: 'Strategy & Direction'
  },
  {
    index: '02',
    title: 'Brand & Storytelling',
    tagline: 'Identity & Narrative Precision',
    desc: 'Building iconic visual identities, executive thought leadership, and persuasive corporate storytelling that commands trust.',
    pill: 'Brand Equity'
  },
  {
    index: '03',
    title: 'Digital Transformation',
    tagline: 'High-Velocity Platforms & UX',
    desc: 'Moving businesses from legacy manual friction to modern web platforms, client portals, and frictionless customer journeys.',
    pill: 'Digital Systems'
  },
  {
    index: '04',
    title: 'AI & Automation',
    tagline: 'Autonomous Business Leverage',
    desc: 'Deploying tailored multi-agent workflows, 24/7 lead qualification agents, and automated internal productivity engines.',
    pill: 'Operational Velocity'
  },
  {
    index: '05',
    title: 'Marketing & Acquisition',
    tagline: 'High-Intent Omnichannel Growth',
    desc: 'Targeted paid advertising, technical SEO, high-converting landing pages, and direct WhatsApp/SMS conversational funnels.',
    pill: 'Customer Acquisition'
  },
  {
    index: '06',
    title: 'CRM & Experience',
    tagline: 'Pipeline Mastery & Loyalty Loops',
    desc: 'Structuring modern CRM data models, automated follow-ups, customer segmentation, and lifetime value retention loops.',
    pill: 'Customer Lifetime Value'
  },
  {
    index: '07',
    title: 'Innovation & Ideas',
    tagline: 'From Idea to Market Incubation',
    desc: 'Guiding entrepreneurs and enterprises through product ideation, rapid MVP prototyping, and commercial market validation.',
    pill: 'Zero-to-One Launch'
  },
  {
    index: '08',
    title: 'Data & Performance',
    tagline: 'Data-Driven Decision Making',
    desc: 'Constructing unified KPI dashboards, conversion attribution models, and continuous ROI tracking for decisive leadership.',
    pill: 'Decisive ROI'
  }
];

export function renderHero() {
  const servicesCardsHtml = CORE_SERVICES.map((s, i) => `
    <div class="service-spotlight-card glass-panel" data-service-idx="${i}">
      <div class="spotlight-card-top">
        <span class="spotlight-num">${s.index}</span>
        <span class="spotlight-pill">${s.pill}</span>
      </div>
      <div class="spotlight-kicker">${s.tagline}</div>
      <h3 class="spotlight-title">${s.title}</h3>
      <p class="spotlight-desc">${s.desc}</p>
      <div class="spotlight-bar-progress">
        <div class="spotlight-bar-fill"></div>
      </div>
    </div>
  `).join('');

  const hudDotsHtml = CORE_SERVICES.map((_, i) => `
    <span class="hud-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></span>
  `).join('');

  return `
    <section id="hero-stage" class="hero-scroll-track" aria-label="Hero Experience">
      <!-- Pinned 100vh Viewport -->
      <div class="hero-viewport-pinned" id="hero-viewport">
        
        <!-- Low-Overhead Buffer State -->
        <div class="hero-video-loader" id="hero-video-loader" aria-hidden="true">
          <div class="hero-loader-spinner"></div>
          <div class="hero-loader-status">
            <span class="loader-mono-tag">INITIALIZING NEXA SYSTEM</span>
            <span class="loader-sub">Auckland (HQ) · Singapore (Hub)...</span>
          </div>
        </div>

        <!-- Full-Bleed 3D Animation Background Canvas -->
        <div class="hero-canvas-wrapper" id="hero-canvas-wrapper">
          <canvas
            id="hero-monolith-canvas"
            class="hero-canvas-monolith"
            aria-label="NEXA GROWTH Monolith Engine"
          ></canvas>
          <!-- Multi-tier Cinematic Scrims & Vignettes -->
          <div class="hero-vignette-scrim" aria-hidden="true"></div>
          <div class="hero-radial-gradient-scrim" aria-hidden="true"></div>
        </div>

        <!-- Persistent Telemetry Header (Clocks) -->
        <header class="hero-persistent-header" aria-label="Global Studio Status">
          <div class="container-wide hero-telemetry-row">
            <div class="hero-status-spacer">
              <span class="pulse-indicator-dot"></span>
              <span class="mono-telemetry-text">OPERATIONAL · AUCKLAND HQ & SINGAPORE HUB</span>
            </div>

            <div class="atomic-clocks-wrapper" id="atomic-clocks-container">
              <div class="atomic-clock-item">
                <span class="clock-city">Auckland (HQ)</span>
                <span class="clock-time" id="clock-newzealand">--:--:-- NZST</span>
              </div>
              <div class="atomic-clock-item">
                <span class="clock-city">Singapore (Hub)</span>
                <span class="clock-time" id="clock-singapore">--:--:-- SGT</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Choreographed Dynamic Content Overlays -->
        <div class="hero-choreography-stage container-wide">
          
          <!-- Phase 1: 0% - 15% Scroll (Primary Title & Strategic Positioning) -->
          <div class="hero-phase-block hero-phase-intro" id="hero-phase-intro">
            <div class="hero-sublabel">
              STRATEGY · TECHNOLOGY · GROWTH
            </div>

            <h1 class="hero-main-title">
              <span class="hero-title-gradient">Transforming Ideas Into Brands,</span><br/>
              <span class="hero-title-accent">Digital Solutions & Growth Systems.</span>
            </h1>

            <div class="hero-disciplines-strip">
              <span class="hero-discipline-tag">Strategy</span>
              <span class="hero-discipline-tag">Growth</span>
              <span class="hero-discipline-tag">Brand</span>
              <span class="hero-discipline-tag">Digital Transformation</span>
              <span class="hero-discipline-tag">AI & Automation</span>
              <span class="hero-discipline-tag">Marketing</span>
              <span class="hero-discipline-tag">CRM</span>
              <span class="hero-discipline-tag">Innovation</span>
              <span class="hero-discipline-tag">Data</span>
            </div>

            <p class="hero-executive-lead">
              NEXA GROWTH connects strategy, creativity, technology, AI, automation, marketing and data to help entrepreneurs, SMEs, institutions and organizations build stronger brands, better systems and sustainable growth.
            </p>

            <div class="hero-scroll-affordance">
              <div class="scroll-mouse-pill">
                <span class="scroll-wheel-dot"></span>
              </div>
              <span class="scroll-prompt-label">SCROLL TO EXPLORE 8 PILLARS</span>
            </div>
          </div>

          <!-- Phase 2: 15% - 82% Scroll (Sequential 8 Core Pillars) -->
          <div class="hero-phase-block hero-phase-services" id="hero-phase-services" aria-hidden="true">
            <div class="services-hud-header">
              <div class="services-hud-left">
                <span class="services-hud-badge">THE 8 CORE SERVICE PILLARS</span>
                <span class="services-hud-counter" id="services-hud-counter">01 / 08</span>
              </div>
              <div class="services-hud-dots" id="services-hud-dots">
                ${hudDotsHtml}
              </div>
            </div>

            <div class="services-spotlight-deck" id="services-spotlight-deck">
              ${servicesCardsHtml}
            </div>
          </div>

          <!-- Phase 3: 82% - 100% Scroll (Climax CTA & Transition) -->
          <div class="hero-phase-block hero-phase-cta" id="hero-phase-cta" aria-hidden="true">
            <div class="hero-climax-card glass-panel">
              <div class="climax-badge">
                <span class="badge badge-crimson">The NEXA Advantage</span>
              </div>
              <h2 class="hero-climax-title">
                Connected Systems. Sustainable Growth.
              </h2>
              <p class="hero-climax-desc">
                From initial idea validation and brand architecture to AI automation, CRM pipelines, and data-driven scale—we engineer connected systems where every capability works together.
              </p>

              <div class="hero-climax-actions">
                <a href="#concierge-stage" class="btn btn-primary btn-lg">
                  <span>Start a Project</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>

                <a href="#manifesto-stage" class="btn btn-ghost btn-lg" id="hero-manifesto-jump-btn">
                  <span>Explore Company Overview</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 3V11M7 11L10.5 7.5M7 11L3.5 7.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Global Hero Progress Rail -->
        <div class="hero-scrub-rail" aria-hidden="true">
          <div class="hero-scrub-bar" id="hero-scrub-bar"></div>
        </div>

      </div>
    </section>
  `;
}

/**
 * Live microsecond-synchronized atomic clocks for Auckland (HQ) and Singapore (Hub)
 */
export function initAtomicClocks() {
  const sgClockEl = document.getElementById('clock-singapore');
  const nzClockEl = document.getElementById('clock-newzealand');

  if (!sgClockEl || !nzClockEl) return;

  const sgFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Singapore',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const nzFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Pacific/Auckland',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  function updateClocks() {
    const now = new Date();
    sgClockEl.textContent = `${sgFormatter.format(now)} SGT`;
    nzClockEl.textContent = `${nzFormatter.format(now)} NZST`;
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}
