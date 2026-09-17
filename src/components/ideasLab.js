import { ideasLabData } from '../data/ideasLabData.js';

/**
 * Insights & Practical Guides Component (Ideas Lab)
 * Practical thinking on connected growth systems, AI workflows,
 * and strategic market positioning.
 */

export function renderIdeasLab() {
  const cardsHtml = ideasLabData
    .map((item) => `
      <article class="insight-article-card glass-panel" id="insight-${item.id}">
        <div class="insight-top-meta">
          <span class="insight-category-tag">${item.category}</span>
          <span class="badge badge-amber">${item.badge}</span>
        </div>

        <h3 class="insight-card-title">${item.title}</h3>
        <p class="insight-card-summary">${item.summary}</p>

        <div class="insight-card-footer">
          <button 
            class="btn btn-ghost btn-sm open-lab-modal-btn" 
            data-exp-id="${item.id}"
            aria-label="Read strategic insight: ${item.title}"
          >
            <span>Read Strategic Insight →</span>
          </button>
        </div>
      </article>
    `)
    .join('');

  return `
    <section id="ideas-lab-stage" class="section">
      <div class="container-wide">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">PRACTICAL THINKING & INSIGHTS</div>
          <h2 class="section-title">
            Architectural Insights for Modern Business.
          </h2>
          <p class="section-desc">
            Bite-sized strategic frameworks on why connected growth systems outperform isolated vendors, how to launch MVPs in 90 days, and where to apply practical AI.
          </p>
        </div>

        <!-- 2-Column Responsive Insights Grid -->
        <div class="grid-2">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

export function initIdeasLabEvents() {
  // Modal triggers handled centrally by detailModal.js
}
