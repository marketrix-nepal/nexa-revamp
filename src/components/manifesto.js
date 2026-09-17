import { COMPANY_INFO } from '../data/companyData.js';

/**
 * Company Overview & Target Clients Component
 * Articulates the core vision, consulting-creation-transformation identity,
 * and detailed breakdown of the 4 client segments NEXA GROWTH serves.
 */

export function renderManifesto() {
  const clientsHtml = COMPANY_INFO.targetClients.map((client) => {
    const needsListHtml = client.needs.map(need => `
      <li>
        <span class="need-bullet-check">✓</span>
        <span>${need}</span>
      </li>
    `).join('');

    return `
      <div class="target-client-card glass-panel" id="client-segment-${client.id}">
        <div class="client-card-header">
          <span class="badge badge-crimson">${client.badge}</span>
          <h3 class="client-card-title">${client.title}</h3>
        </div>
        <p class="client-card-focus">${client.focus}</p>
        <div class="client-needs-block">
          <div class="client-needs-label">Typical Intervention Needs:</div>
          <ul class="client-needs-list">
            ${needsListHtml}
          </ul>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section id="manifesto-stage" class="section">
      <div class="container-wide">
        
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">COMPANY OVERVIEW & VISION</div>
          <h2 class="section-title">
            Strategy, Technology & Growth Systems.
          </h2>
          <p class="section-desc">
            NEXA GROWTH is a strategy, technology and growth company helping entrepreneurs, SMEs, institutions and organizations transform their ideas, brands and business activities into structured, scalable solutions and growth systems.
          </p>
        </div>

        <!-- Core Vision Callout: Not Just Services, But Connected Systems -->
        <div class="vision-statement-banner glass-panel">
          <div class="vision-banner-kicker">
            <span class="badge badge-amber">THE NEXA APPROACH</span>
            <span class="vision-kicker-text">Beyond Isolated Agency Deliverables</span>
          </div>
          <h3 class="vision-banner-title">
            “NEXA does not simply provide communication or digital services. Our approach is to understand a business problem or opportunity, develop the appropriate strategy, design the required solution, implement it when necessary, and measure its performance.”
          </h3>
          <p class="vision-banner-lead">
            Our objective is to create connected systems where strategy, technology, marketing, sales, customer experience, automation and data work seamlessly together to generate sustainable enterprise value.
          </p>
        </div>

        <!-- 3 Core Strategic Pillars of Operation -->
        <div class="grid-3" style="margin-bottom: clamp(3rem, 6vw, 5rem);">
          <div class="value-pillar-card">
            <div class="pillar-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 class="pillar-title">01. Strategy & Positioning</h3>
            <p class="pillar-desc">
              We define clear commercial directions, defensible market positioning, and revenue models so your business stands out distinctly from competitors.
            </p>
            <ul class="pillar-points">
              <li>Comprehensive market & competitor audits</li>
              <li>Defensible value proposition design</li>
              <li>Actionable go-to-market roadmaps</li>
            </ul>
          </div>

          <div class="value-pillar-card">
            <div class="pillar-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3 class="pillar-title">02. Creation & Technology</h3>
            <p class="pillar-desc">
              We design iconic brand identities, write high-conversion copy, and build lightning-fast web platforms, client portals, and digital products.
            </p>
            <ul class="pillar-points">
              <li>Visual brand identity & design systems</li>
              <li>High-converting mobile-first web platforms</li>
              <li>Custom portals, MVPs & digital products</li>
            </ul>
          </div>

          <div class="value-pillar-card">
            <div class="pillar-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <h3 class="pillar-title">03. Automation & Scale</h3>
            <p class="pillar-desc">
              We deploy tailored AI workflows, organize CRM pipelines, activate omnichannel acquisition, and analyze data to fuel continuous ROI.
            </p>
            <ul class="pillar-points">
              <li>Practical AI assistants & workflow automation</li>
              <li>CRM pipelines, WhatsApp/SMS lead nurture</li>
              <li>Unified KPI analytics & revenue attribution</li>
            </ul>
          </div>
        </div>

        <!-- Target Audiences Sub-Section -->
        <div class="target-clients-section" style="margin-bottom: clamp(3rem, 6vw, 5rem);">
          <div class="section-header" style="margin-bottom: 2rem;">
            <div class="section-label">WHO WE SERVE</div>
            <h3 class="section-title" style="font-size: clamp(1.75rem, 3.5vw, 2.5rem);">
              Engineered for Four Target Client Profiles.
            </h3>
            <p class="section-desc">
              Whether you are an ambitious founder building an MVP or an established institution modernizing public services, NEXA provides structured solutions tailored to your operational scale.
            </p>
          </div>

          <div class="grid-2 target-clients-grid">
            ${clientsHtml}
          </div>
        </div>

        <!-- Bi-Coastal Global Presence (Auckland HQ + Singapore Hub) -->
        <div class="hub-ledger-grid">
          <!-- Auckland Global HQ -->
          <div class="hub-ledger-card">
            <div class="hub-card-header">
              <div class="hub-city-name">
                <span class="pulse-node pulse-node-amber"></span>
                <span>Auckland Headquarters</span>
              </div>
              <div class="badge badge-amber">GLOBAL HEADQUARTERS</div>
            </div>
            <div class="hub-coord">Auckland, New Zealand · NZST (UTC+12)</div>
            <p class="hub-thesis" style="margin-top: 1rem;">
              Directing global corporate governance, core strategic frameworks, brand architecture, and technology research for international client partnerships.
            </p>
          </div>

          <!-- Singapore International Hub -->
          <div class="hub-ledger-card">
            <div class="hub-card-header">
              <div class="hub-city-name">
                <span class="pulse-node"></span>
                <span>Singapore Hub</span>
              </div>
              <div class="badge badge-crimson">INTERNATIONAL HUB</div>
            </div>
            <div class="hub-coord">Singapore · SGT (UTC+8)</div>
            <p class="hub-thesis" style="margin-top: 1rem;">
              Leading regional market growth, cross-border digital transformation, enterprise client engagements, and capital advisory across the Asia-Pacific corridor.
            </p>
          </div>
        </div>

      </div>
    </section>
  `;
}
