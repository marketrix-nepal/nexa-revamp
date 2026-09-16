/**
 * Hero Component (Act 1: The Overture — Kinetic Neural Monolith)
 * Full-bleed scroll-driven 3D video pinned stage with live atomic clocks,
 * choreographed dark-mode glassmorphic overlays, 6 core service spotlights,
 * and high-converting climax CTA.
 */

export const CORE_SERVICES = [
  {
    index: '01',
    title: 'Brand Strategy',
    tagline: 'Defensible Market Positioning',
    desc: 'Architecting distinctive identities, defensible moats, and unassailable brand equity engineered for generational longevity.',
    pill: 'Category Creation'
  },
  {
    index: '02',
    title: 'Storytelling',
    tagline: 'Narrative Architecture',
    desc: 'Crafting high-resonance brand mythology and cultural velocity that transform passive audiences into ardent brand advocates.',
    pill: 'Emotional Resonance'
  },
  {
    index: '03',
    title: 'Copywriting',
    tagline: 'Linguistic Precision',
    desc: 'Writing persuasive, high-conversion copy grounded in behavioral psychology to command unwavering attention and trigger action.',
    pill: 'Conversion Optimization'
  },
  {
    index: '04',
    title: 'Tech Innovation',
    tagline: 'Bespoke Digital Platforms',
    desc: 'Developing bleeding-edge web applications, interactive 3D ecosystems, and resilient software architectures built for hyper-speed.',
    pill: 'Sub-second Performance'
  },
  {
    index: '05',
    title: 'AI Automation',
    tagline: 'Autonomous Intelligence',
    desc: 'Deploying tailored multi-agent workflows, autonomous business logic, and predictive intelligence to compound team leverage.',
    pill: 'Operational Velocity'
  },
  {
    index: '06',
    title: 'Ideas Development',
    tagline: 'Zero-to-One Incubation',
    desc: 'Transforming nascent conceptual sparks into validated, production-grade business ventures and category-disrupting products.',
    pill: 'Rapid Prototyping'
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

  return `
    <section id="hero-stage" class="hero-scroll-track" aria-label="Hero Experience">
      <!-- Pinned 100vh Viewport -->
      <div class="hero-viewport-pinned" id="hero-viewport">
        
        <!-- Low-Overhead Buffer State -->
        <div class="hero-video-loader" id="hero-video-loader" aria-hidden="true">
          <div class="hero-loader-spinner"></div>
          <div class="hero-loader-status">
            <span class="loader-mono-tag">INITIALIZING EXPERIENCE</span>
            <span class="loader-sub">Preparing high-resolution sequence...</span>
          </div>
        </div>

        <!-- Full-Bleed 3D Animation Background Canvas -->
        <div class="hero-canvas-wrapper" id="hero-canvas-wrapper">
          <canvas
            id="hero-monolith-canvas"
            class="hero-canvas-monolith"
            aria-label="3D Neural Experience"
          ></canvas>
          <!-- Multi-tier Cinematic Scrims & Vignettes -->
          <div class="hero-vignette-scrim" aria-hidden="true"></div>
          <div class="hero-radial-gradient-scrim" aria-hidden="true"></div>
        </div>

        <!-- Persistent Telemetry Header (Clocks) -->
        <header class="hero-persistent-header" aria-label="Global Studio Status">
          <div class="container-wide hero-telemetry-row">
            <div class="hero-status-spacer"></div>

            <div class="atomic-clocks-wrapper" id="atomic-clocks-container">
              <div class="atomic-clock-item">
                <span class="clock-city">Singapore</span>
                <span class="clock-time" id="clock-singapore">--:--:-- SGT</span>
              </div>
              <div class="atomic-clock-item">
                <span class="clock-city">New Zealand</span>
                <span class="clock-time" id="clock-newzealand">--:--:-- NZST</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Choreographed Dynamic Content Overlays -->
        <div class="hero-choreography-stage container-wide">
          
          <!-- Phase 1: 0% - 25% Scroll (Primary Title & Strategic Lead) -->
          <div class="hero-phase-block hero-phase-intro" id="hero-phase-intro">
            <div class="hero-sublabel">
              Defensible Strategy · Web Engineering · AI Systems
            </div>

            <h1 class="hero-main-title">
              <span class="hero-title-gradient">We Turn Ideas</span><br/>
              <span class="hero-title-accent">Into Growth.</span>
            </h1>

            <div class="hero-disciplines-strip">
              <span class="hero-discipline-tag">Brand Strategy</span>
              <span class="hero-discipline-tag">Storytelling</span>
              <span class="hero-discipline-tag">Copywriting</span>
              <span class="hero-discipline-tag">Tech Innovation</span>
              <span class="hero-discipline-tag">AI Automation</span>
              <span class="hero-discipline-tag">Ideas Development</span>
            </div>

            <p class="hero-executive-lead">
              We partner with visionary founders and enterprises to engineer defensible market positioning, hypnotic narratives, bespoke digital platforms, and autonomous intelligence systems.
            </p>

            <div class="hero-scroll-affordance">
              <div class="scroll-mouse-pill">
                <span class="scroll-wheel-dot"></span>
              </div>
              <span class="scroll-prompt-label">SCROLL TO EXPLORE</span>
            </div>
          </div>

          <!-- Phase 2: 25% - 85% Scroll (Sequential 6 Core Services) -->
          <div class="hero-phase-block hero-phase-services" id="hero-phase-services" aria-hidden="true">
            <div class="services-hud-header">
              <div class="services-hud-left">
                <span class="services-hud-badge">CORE DISCIPLINES</span>
                <span class="services-hud-counter" id="services-hud-counter">01 / 06</span>
              </div>
              <div class="services-hud-dots" id="services-hud-dots">
                <span class="hud-dot active" data-dot="0"></span>
                <span class="hud-dot" data-dot="1"></span>
                <span class="hud-dot" data-dot="2"></span>
                <span class="hud-dot" data-dot="3"></span>
                <span class="hud-dot" data-dot="4"></span>
                <span class="hud-dot" data-dot="5"></span>
              </div>
            </div>

            <div class="services-spotlight-deck" id="services-spotlight-deck">
              ${servicesCardsHtml}
            </div>
          </div>

          <!-- Phase 3: 85% - 100% Scroll (Climax CTA & Transition) -->
          <div class="hero-phase-block hero-phase-cta" id="hero-phase-cta" aria-hidden="true">
            <div class="hero-climax-card glass-panel">
              <div class="climax-badge">
                <span class="badge badge-crimson">The Future of Growth</span>
              </div>
              <h2 class="hero-climax-title">
                Explore the Future of Growth.
              </h2>
              <p class="hero-climax-desc">
                From defensible brand positioning to autonomous AI infrastructure, we construct unfair advantages for companies poised to lead their markets.
              </p>

              <div class="hero-climax-actions">
                <a href="#concierge-stage" class="btn btn-primary btn-lg">
                  <span>Start a Project</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>

                <a href="#manifesto-stage" class="btn btn-ghost btn-lg" id="hero-manifesto-jump-btn">
                  <span>Explore Manifesto</span>
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
 * Live microsecond-synchronized atomic clocks for Singapore and New Zealand
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

