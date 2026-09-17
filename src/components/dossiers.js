import { caseStudiesData } from '../data/caseStudiesData.js';

/**
 * Intervention Models & Case Studies Component
 * Demonstrates the 4 authentic intervention archetypes from the NEXA GROWTH charter:
 * SME Transformation, App Idea-to-Market, Institutional Modernization, and Omnichannel CRM.
 */

export function renderDossiers() {
  const cardsHtml = caseStudiesData
    .map((item) => {
      const chipsHtml = item.chips
        .map((chip) => `<span class="dossier-chip">${chip}</span>`)
        .join('');

      return `
        <article class="case-study-card glass-panel" id="case-study-${item.id}">
          <div class="case-card-header">
            <div class="case-card-meta">
              <span class="case-sector-badge">${item.sector}</span>
              <span class="case-client-name">${item.client}</span>
            </div>

            <!-- Big Impact Metric Callout -->
            <div class="case-metric-box">
              <div class="case-metric-number">${item.statNumber}</div>
              <div class="case-metric-label">${item.statLabel}</div>
            </div>
          </div>

          <!-- Title & Essence -->
          <h3 class="case-card-title">${item.title}</h3>
          <p class="case-card-essence">${item.essenceHook}</p>

          <!-- 3-Column Scannable Highlights Grid -->
          <div class="case-pillars-grid">
            <div class="case-pillar-item">
              <span class="pillar-label">The Challenge</span>
              <p class="pillar-text">${item.challenge}</p>
            </div>
            <div class="case-pillar-item">
              <span class="pillar-label">What We Built</span>
              <p class="pillar-text">${item.solution}</p>
            </div>
            <div class="case-pillar-item">
              <span class="pillar-label">The Measured Outcome</span>
              <p class="pillar-text">${item.result}</p>
            </div>
          </div>

          <!-- Service Chips -->
          <div class="dossier-chips">
            ${chipsHtml}
          </div>

          <!-- Quote & Action Footer -->
          <div class="case-card-footer">
            <div class="case-quote-box">
              <p class="case-quote-text">"${item.quote.text}"</p>
              <span class="case-quote-author">— ${item.quote.author}, ${item.quote.title}</span>
            </div>

            <button 
              class="btn btn-primary btn-sm open-case-modal-btn" 
              data-case-id="${item.id}"
              aria-label="View full intervention details for ${item.client}"
            >
              <span>View Intervention Details →</span>
            </button>
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
          <div class="section-label">EXAMPLES OF INTERVENTION</div>
          <h2 class="section-title">
            Structured Execution. Measurable Growth.
          </h2>
          <p class="section-desc">
            Explore how NEXA's connected systems transform struggling SMEs, fast-track entrepreneurs to market, modernize institutions, and compound repeat customer loyalty.
          </p>
        </div>

        <!-- Case Studies List -->
        <div class="case-studies-list">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

export function initDossierEvents() {
  // Modal triggers handled centrally by detailModal.js
}
