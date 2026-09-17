import { COMPANY_INFO } from '../data/companyData.js';

/**
 * Company Overview & Target Clients Component
 * Articulates the core vision, consulting-creation-transformation identity,
 * interactive paradigm comparison, and interactive client archetype navigator.
 */

let activeClientIdx = 0;

export function renderManifesto() {
  const clientTabsHtml = COMPANY_INFO.targetClients.map((client, idx) => `
    <button 
      class="client-tab-pill ${idx === 0 ? 'active' : ''}" 
      data-client-idx="${idx}"
      role="tab"
      aria-selected="${idx === 0 ? 'true' : 'false'}"
      id="client-tab-${idx}"
    >
      <span class="client-tab-num">0${idx + 1}</span>
      <span class="client-tab-title">${client.title}</span>
    </button>
  `).join('');

  return `
    <section id="manifesto-stage" class="section">
      <div class="container-wide">
        
        <!-- Section Header (Refined, Non-Bulky) -->
        <div class="section-header">
          <div class="section-label">COMPANY OVERVIEW & VISION</div>
          <h2 class="section-title">
            Strategy, Technology &amp; <span class="text-gradient-brand">Growth Systems</span>.
          </h2>
          <p class="section-desc">
            NEXA is a strategy, technology and business growth partner helping entrepreneurs, SMEs, institutions and organizations transform ideas into structured, scalable market leaders.
          </p>
        </div>

        <!-- Interactive Strategic Paradigm HUD (System vs Agency) -->
        <div class="strategy-hud-container glass-panel">
          <div class="strategy-hud-top">
            <div class="hud-top-meta">
              <span class="badge badge-amber">THE NEXA APPROACH</span>
              <span class="hud-meta-text">Beyond Isolated Agency Deliverables</span>
            </div>

            <!-- Paradigm Switcher Controls -->
            <div class="paradigm-switcher" role="tablist" aria-label="System vs Agency Model">
              <button class="paradigm-toggle-btn active" data-paradigm="nexa" role="tab" aria-selected="true">
                <span class="paradigm-toggle-dot"></span>
                <span>The NEXA Connected System</span>
              </button>
              <button class="paradigm-toggle-btn" data-paradigm="conventional" role="tab" aria-selected="false">
                <span>Conventional Agency Model</span>
              </button>
            </div>
          </div>

          <!-- Paradigm View: NEXA Connected System (Active) -->
          <div class="paradigm-content-panel" id="paradigm-panel-nexa">
            <div class="paradigm-quote-strip">
              <div class="paradigm-quote-icon">“</div>
              <p class="paradigm-quote-body">
                NEXA does not simply provide communication or digital services. Our approach is to understand a business problem or opportunity, develop the appropriate strategy, design the required solution, implement it when necessary, and measure its performance.
              </p>
            </div>

            <!-- 4 Interactive Dimension Cards -->
            <div class="grid-4 paradigm-grid">
              <div class="paradigm-feature-card">
                <div class="feature-card-num">01</div>
                <h4 class="feature-card-title">Commercial Strategy First</h4>
                <p class="feature-card-desc">
                  Rigorous problem diagnosis, market moats, and unit economics before creative or code begins.
                </p>
                <div class="feature-card-tag">Zero Vanity Metrics</div>
              </div>

              <div class="paradigm-feature-card">
                <div class="feature-card-num">02</div>
                <h4 class="feature-card-title">Synchronized Stack</h4>
                <p class="feature-card-desc">
                  Brand narrative, custom web platforms, CRM pipelines, and AI workflows built as one unified engine.
                </p>
                <div class="feature-card-tag">Zero Vendor Hand-offs</div>
              </div>

              <div class="paradigm-feature-card">
                <div class="feature-card-num">03</div>
                <h4 class="feature-card-title">Continuous Telemetry</h4>
                <p class="feature-card-desc">
                  Closed-loop analytics connecting media spend directly to booked pipeline revenue and customer lifetime value.
                </p>
                <div class="feature-card-tag">100% Attributed ROI</div>
              </div>

              <div class="paradigm-feature-card">
                <div class="feature-card-num">04</div>
                <h4 class="feature-card-title">Senior Advisory Partner</h4>
                <p class="feature-card-desc">
                  Direct strategic consultation embedded alongside founders, executives, and technical leadership.
                </p>
                <div class="feature-card-tag">Executive Counsel</div>
              </div>
            </div>

            <!-- Live Telemetry KPI Strip -->
            <div class="paradigm-kpi-bar">
              <div class="kpi-metric-item">
                <span class="kpi-val">+3.8x</span>
                <span class="kpi-lbl">Pipeline Acceleration</span>
              </div>
              <div class="kpi-divider"></div>
              <div class="kpi-metric-item">
                <span class="kpi-val">0%</span>
                <span class="kpi-lbl">Fragmented Vendor Loss</span>
              </div>
              <div class="kpi-divider"></div>
              <div class="kpi-metric-item">
                <span class="kpi-val">8 Pillars</span>
                <span class="kpi-lbl">Single Synchronized Ecosystem</span>
              </div>
            </div>
          </div>

          <!-- Paradigm View: Conventional Agency (Contrast) -->
          <div class="paradigm-content-panel" id="paradigm-panel-conventional" style="display: none;">
            <div class="paradigm-quote-strip agency-quote-strip">
              <div class="paradigm-quote-icon">⚠️</div>
              <p class="paradigm-quote-body">
                Traditional agencies provide isolated, transactional deliverables—leaving founders and enterprises to stitch together disparate freelancers, software vendors, and marketing campaigns with no shared commercial accountability.
              </p>
            </div>

            <div class="grid-4 paradigm-grid">
              <div class="paradigm-feature-card agency-flaw-card">
                <div class="feature-card-num">✕</div>
                <h4 class="feature-card-title">Siloed Deliverables</h4>
                <p class="feature-card-desc">
                  Brand designers don’t talk to developers; developers don’t understand acquisition funnels.
                </p>
                <div class="feature-card-tag tag-flaw">High Coordination Tax</div>
              </div>

              <div class="paradigm-feature-card agency-flaw-card">
                <div class="feature-card-num">✕</div>
                <h4 class="feature-card-title">Vanity Metrics</h4>
                <p class="feature-card-desc">
                  Reporting impressions, clicks, and aesthetic likes that fail to translate into bankable revenue.
                </p>
                <div class="feature-card-tag tag-flaw">Unattributed ROI</div>
              </div>

              <div class="paradigm-feature-card agency-flaw-card">
                <div class="feature-card-num">✕</div>
                <h4 class="feature-card-title">Hand-Off Abandonment</h4>
                <p class="feature-card-desc">
                  Once a website or campaign launches, the agency vanishes—leaving systems to stagnate.
                </p>
                <div class="feature-card-tag tag-flaw">Zero Measurement</div>
              </div>

              <div class="paradigm-feature-card agency-flaw-card">
                <div class="feature-card-num">✕</div>
                <h4 class="feature-card-title">Junior Execution</h4>
                <p class="feature-card-desc">
                  Pitched by senior directors, then quietly handed off to junior coordinators with minimal domain depth.
                </p>
                <div class="feature-card-tag tag-flaw">Diluted Value</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3 Core Strategic Pillars (Streamlined, Non-Bulky Cards) -->
        <div class="grid-3 strategic-triad-grid" style="margin-bottom: clamp(3rem, 6vw, 4.5rem);">
          <div class="value-pillar-card glass-panel">
            <div class="pillar-header-row">
              <span class="pillar-num-badge">01</span>
              <span class="badge badge-crimson">STRATEGY &amp; DIRECTION</span>
            </div>
            <h3 class="pillar-title">Positioning &amp; Business Models</h3>
            <p class="pillar-desc">
              We define clear commercial directions, defensible market positioning, and revenue models that set your venture distinctly apart.
            </p>
            <div class="pillar-chip-list">
              <span class="pillar-chip">Market Audits</span>
              <span class="pillar-chip">Defensible Moats</span>
              <span class="pillar-chip">GTM Roadmaps</span>
            </div>
          </div>

          <div class="value-pillar-card glass-panel">
            <div class="pillar-header-row">
              <span class="pillar-num-badge">02</span>
              <span class="badge badge-amber">CREATION &amp; TECH</span>
            </div>
            <h3 class="pillar-title">Brand, Platform &amp; Experience</h3>
            <p class="pillar-desc">
              We design iconic brand identities, write high-conversion copy, and build lightning-fast web applications, portals, and MVPs.
            </p>
            <div class="pillar-chip-list">
              <span class="pillar-chip">Identity Systems</span>
              <span class="pillar-chip">Modern Web Apps</span>
              <span class="pillar-chip">Frictionless UX</span>
            </div>
          </div>

          <div class="value-pillar-card glass-panel">
            <div class="pillar-header-row">
              <span class="pillar-num-badge">03</span>
              <span class="badge badge-crimson">AUTOMATION &amp; SCALE</span>
            </div>
            <h3 class="pillar-title">AI, CRM &amp; Revenue Loops</h3>
            <p class="pillar-desc">
              We deploy tailored AI agents, structure automated CRM nurture pipelines, and unify performance telemetry to drive compound growth.
            </p>
            <div class="pillar-chip-list">
              <span class="pillar-chip">AI Workflows</span>
              <span class="pillar-chip">CRM Retention</span>
              <span class="pillar-chip">Unified Telemetry</span>
            </div>
          </div>
        </div>

        <!-- Interactive Target Audience Console (Replaces 4 Giant Bulky Cards) -->
        <div class="target-clients-section" style="margin-bottom: clamp(3rem, 6vw, 4.5rem);">
          <div class="section-header" style="margin-bottom: 1.5rem;">
            <div class="section-label">WHO WE SERVE</div>
            <h3 class="section-title">
              Engineered for Four Target Client Profiles.
            </h3>
            <p class="section-desc">
              Select your profile to inspect tailored intervention blueprints and expected commercial impact.
            </p>
          </div>

          <!-- Interactive Client Selector Tabs Rail -->
          <div class="client-tabs-rail" role="tablist" aria-label="Target Client Segments">
            ${clientTabsHtml}
          </div>

          <!-- Dynamic Client Canvas Panel -->
          <div class="client-interactive-canvas glass-panel" id="client-canvas-target">
            <!-- Dynamically populated by renderClientProfile(0) -->
          </div>
        </div>

        <!-- Bi-Coastal Global Presence (Auckland HQ + Singapore Hub) -->
        <div class="hub-ledger-grid">
          <!-- Auckland Global HQ -->
          <div class="hub-ledger-card glass-panel">
            <div class="hub-card-header">
              <div class="hub-city-name">
                <span class="pulse-node pulse-node-amber"></span>
                <span>Auckland Headquarters</span>
              </div>
              <div class="badge badge-amber">GLOBAL HQ</div>
            </div>
            <div class="hub-coord">Auckland, New Zealand · NZST / NZDT (UTC+12/13)</div>
            <p class="hub-thesis">
              Directing global corporate governance, core strategic frameworks, brand architecture, and technology research for international client partnerships.
            </p>
            <div class="hub-tags-strip">
              <span class="hub-mini-tag">Executive Strategy</span>
              <span class="hub-mini-tag">Brand Systems</span>
              <span class="hub-mini-tag">Governance</span>
            </div>
          </div>

          <!-- Singapore International Hub -->
          <div class="hub-ledger-card glass-panel">
            <div class="hub-card-header">
              <div class="hub-city-name">
                <span class="pulse-node"></span>
                <span>Singapore Hub</span>
              </div>
              <div class="badge badge-crimson">ASIA-PACIFIC HUB</div>
            </div>
            <div class="hub-coord">Marina Bay, Singapore · SGT (UTC+8)</div>
            <p class="hub-thesis">
              Leading regional market growth, cross-border digital transformation, enterprise client engagements, and capital advisory across the Asia-Pacific corridor.
            </p>
            <div class="hub-tags-strip">
              <span class="hub-mini-tag">Digital Transformation</span>
              <span class="hub-mini-tag">Enterprise AI</span>
              <span class="hub-mini-tag">Regional Growth</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

/**
 * Renders the detailed active client archetype card
 */
export function renderClientProfile(idx) {
  const client = COMPANY_INFO.targetClients[idx];
  if (!client) return '';

  const needsHtml = client.needs.map(need => `
    <div class="archetype-need-item">
      <span class="need-icon-check">✓</span>
      <span class="need-text">${need}</span>
    </div>
  `).join('');

  return `
    <div class="archetype-profile-panel">
      <div class="archetype-header-row">
        <div>
          <span class="badge badge-crimson">${client.badge}</span>
          <h4 class="archetype-title">${client.title}</h4>
        </div>
        <a href="#concierge-stage" class="btn btn-primary btn-sm archetype-cta-btn">
          <span>Start Project as ${client.title.split(' ')[0]} →</span>
        </a>
      </div>

      <p class="archetype-focus-lead">${client.focus}</p>

      <div class="archetype-blueprint-grid">
        <div class="blueprint-block">
          <div class="blueprint-label">TAILORED INTERVENTION ROADMAP</div>
          <div class="archetype-needs-grid">
            ${needsHtml}
          </div>
        </div>

        <div class="blueprint-impact-card">
          <div class="impact-card-label">EXPECTED TRANSFORMATION IMPACT</div>
          <div class="impact-metric-text">+240% Speed to Market</div>
          <p class="impact-desc">
            Direct transition from fragmented execution to a structured, repeatable growth system with measurable ROI telemetry.
          </p>
          <div class="impact-deliverables-pill">
            <span>Core Deliverables: Strategy · Tech · Brand · Retention</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initManifestoEvents() {
  // 1. Paradigm Switcher (The NEXA System vs Conventional Agency)
  const paradigmBtns = document.querySelectorAll('.paradigm-toggle-btn');
  const nexaPanel = document.getElementById('paradigm-panel-nexa');
  const agencyPanel = document.getElementById('paradigm-panel-conventional');

  paradigmBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      paradigmBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const target = btn.dataset.paradigm;
      if (target === 'nexa') {
        if (nexaPanel) nexaPanel.style.display = 'block';
        if (agencyPanel) agencyPanel.style.display = 'none';
      } else {
        if (nexaPanel) nexaPanel.style.display = 'none';
        if (agencyPanel) agencyPanel.style.display = 'block';
      }
    });
  });

  // 2. Client Archetype Tabs Switcher
  const clientTabs = document.querySelectorAll('.client-tab-pill');
  const clientTarget = document.getElementById('client-canvas-target');

  function updateClient(index) {
    activeClientIdx = index;
    clientTabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (clientTarget) {
      clientTarget.innerHTML = renderClientProfile(index);
    }
  }

  // Initial render of client 0
  updateClient(0);

  clientTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.clientIdx, 10);
      if (!isNaN(idx)) {
        updateClient(idx);
      }
    });
  });
}
