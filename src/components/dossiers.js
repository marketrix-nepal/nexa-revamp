import { caseStudiesData } from '../data/caseStudiesData.js';

/**
 * Transformation Dossiers Component (Act 4: Institutional Dossiers)
 * Wide editorial cards with progressive disclosure inline drawer
 * and universal modal deep-dive triggers.
 */

export function renderDossiers() {
  const cardsHtml = caseStudiesData
    .map((dossier) => {
      const chipsHtml = dossier.chips
        .map((chip) => `<span class="dossier-chip">${chip}</span>`)
        .join('');

      return `
        <article class="dossier-card" id="dossier-${dossier.id}">
          <!-- Header Meta -->
          <div class="dossier-top-meta">
            <span class="dossier-index">DOSSIER ${dossier.index} · ${dossier.sector.toUpperCase()} · ${dossier.year}</span>
            <span class="dossier-client-tag">${dossier.client}</span>
          </div>

          <!-- Headline & Essence Hook -->
          <h3 class="dossier-headline">${dossier.title}</h3>
          <p class="dossier-essence">${dossier.essenceHook}</p>

          <!-- Service Chips -->
          <div class="dossier-chips">
            ${chipsHtml}
          </div>

          <!-- Dual Action Triggers -->
          <div class="dossier-actions">
            <button 
              class="btn btn-ghost btn-sm toggle-dossier-drawer-btn" 
              data-target="drawer-${dossier.id}"
              aria-expanded="false"
              aria-label="Inspect architecture for ${dossier.client}"
            >
              <span class="toggle-text">Inspect Architecture ⌄</span>
            </button>

            <button 
              class="btn btn-primary btn-sm open-case-modal-btn" 
              data-case-id="${dossier.id}"
              aria-label="View full case study for ${dossier.client}"
            >
              <span>Full Case Study →</span>
            </button>
          </div>

          <!-- Smooth Inline Drawer Accordion (0fr -> 1fr) -->
          <div class="dossier-drawer-wrapper" id="drawer-${dossier.id}">
            <div class="dossier-drawer-inner">
              <div class="dossier-architecture-grid">
                <!-- Pillar 01 -->
                <div>
                  <div class="dossier-pillar-title">// 01 THE STRATEGIC FRICTION</div>
                  <p class="dossier-pillar-text">${dossier.challenge}</p>
                </div>

                <!-- Pillar 02 -->
                <div>
                  <div class="dossier-pillar-title">// 02 PSYCHOLOGICAL & TECH ARCHITECTURE</div>
                  <p class="dossier-pillar-text">${dossier.solution}</p>
                </div>

                <!-- Pillar 03 -->
                <div>
                  <div class="dossier-pillar-title">// 03 THE ENTERPRISE OUTCOME</div>
                  <p class="dossier-pillar-text">${dossier.result}</p>
                </div>
              </div>

              <!-- Verified Executive Quote -->
              <div class="dossier-verified-quote">
                <p class="quote-text">"${dossier.quote.text}"</p>
                <div class="quote-author">— ${dossier.quote.author}, ${dossier.quote.title}</div>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section id="dossiers-stage" class="section">
      <div class="container-wide">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">04 // TRANSFORMATION DOSSIERS</div>
          <h2 class="section-title">
            Commercial Reframing & Market Moats.
          </h2>
          <p class="section-desc">
            Rigorous case examinations documenting how repositioned narrative architecture, bespoke technology, and verbal conviction compound enterprise valuation.
          </p>
        </div>

        <!-- Dossiers List Track -->
        <div class="dossiers-container">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

export function initDossierEvents() {
  const toggleButtons = document.querySelectorAll('.toggle-dossier-drawer-btn');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      if (!drawer) return;

      const isExpanded = drawer.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded);
      const textSpan = btn.querySelector('.toggle-text');
      if (textSpan) {
        textSpan.textContent = isExpanded ? 'Collapse Architecture ⌃' : 'Inspect Architecture ⌄';
      }

      // Refresh ScrollTrigger calculations after drawer resize
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    });
  });
}
