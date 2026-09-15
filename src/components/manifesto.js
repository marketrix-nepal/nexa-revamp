/**
 * About Us Component (formerly Manifesto)
 * Clean, modern editorial section with high-impact value cards
 * and bi-coastal studio locations.
 */

export function renderManifesto() {
  return `
    <section id="manifesto-stage" class="section">
      <div class="container-wide">
        <!-- Section Label & Heading -->
        <div class="section-header">
          <div class="section-label">ABOUT US</div>
          <h2 class="section-title">
            Where Clear Strategy Meets Modern Execution.
          </h2>
          <p class="section-desc">
            Most agencies create websites that look nice but don't convert, or build software disconnected from real business outcomes. We bridge that gap—combining sharp positioning, world-class design, and smart automation to turn your ideas into measurable growth.
          </p>
        </div>

        <!-- 3-Column Core Value Pillars -->
        <div class="grid-3" style="margin-bottom: clamp(2.5rem, 5vw, 4rem);">
          <!-- Pillar 1 -->
          <div class="value-pillar-card">
            <div class="pillar-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 class="pillar-title">Clear Brand Strategy</h3>
            <p class="pillar-desc">
              We cut through the noise to articulate exactly what makes your company unique. Clear messaging makes it easy for your target market to understand, trust, and choose you.
            </p>
            <ul class="pillar-points">
              <li>Distinctive market positioning</li>
              <li>Compelling value messaging</li>
              <li>High-converting landing page copy</li>
            </ul>
          </div>

          <!-- Pillar 2 -->
          <div class="value-pillar-card">
            <div class="pillar-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3 class="pillar-title">Modern Web Platforms</h3>
            <p class="pillar-desc">
              We build lighting-fast, responsive web platforms and applications that feel like bespoke products. Every interaction is designed to guide visitors smoothly toward taking action.
            </p>
            <ul class="pillar-points">
              <li>Responsive mobile-first design</li>
              <li>Sub-second loading speeds</li>
              <li>Optimized conversion funnels</li>
            </ul>
          </div>

          <!-- Pillar 3 -->
          <div class="value-pillar-card">
            <div class="pillar-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <h3 class="pillar-title">Practical AI Automation</h3>
            <p class="pillar-desc">
              We implement smart AI tools and automated pipelines that free your team from manual tasks, qualify inbound leads instantly, and scale your daily operations.
            </p>
            <ul class="pillar-points">
              <li>Automated customer qualification</li>
              <li>Intelligent data pipelines</li>
              <li>Custom AI assistants & tools</li>
            </ul>
          </div>
        </div>

        <!-- Bi-Coastal Studio Presence -->
        <div class="hub-ledger-grid">
          <!-- Singapore Hub -->
          <div class="hub-ledger-card">
            <div class="hub-card-header">
              <div class="hub-city-name">
                <span class="pulse-node"></span>
                <span>Singapore Hub</span>
              </div>
              <div class="badge badge-crimson">APAC HEADQUARTERS</div>
            </div>
            <div class="hub-coord">Singapore · SGT (UTC+8)</div>
            <p class="hub-thesis" style="margin-top: 1rem;">
              Directing growth strategy, international client engagements, and capital partnerships across the Asia-Pacific region.
            </p>
          </div>

          <!-- New Zealand Hub -->
          <div class="hub-ledger-card">
            <div class="hub-card-header">
              <div class="hub-city-name">
                <span class="pulse-node pulse-node-amber"></span>
                <span>New Zealand Studio</span>
              </div>
              <div class="badge badge-amber">INNOVATION LAB</div>
            </div>
            <div class="hub-coord">Auckland · NZST (UTC+12)</div>
            <p class="hub-thesis" style="margin-top: 1rem;">
              Leading creative direction, deep-tech research, bespoke software development, and specialized AI automation experiments.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
