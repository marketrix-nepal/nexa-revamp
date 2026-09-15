import { ideasLabData } from '../data/ideasLabData.js';

/**
 * Insights Component (formerly Ideas Lab)
 * Clean, modern cards highlighting practical thinking on brand strategy,
 * web development, and AI automation.
 */

export function renderIdeasLab() {
  const cardsHtml = ideasLabData
    .map((item) => `
      <article class="insight-article-card" id="insight-${item.id}">
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
            aria-label="Read article: ${item.title}"
          >
            <span>Read Article →</span>
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
          <div class="section-label">INSIGHTS & INNOVATION</div>
          <h2 class="section-title">
            Practical Thinking for Modern Businesses.
          </h2>
          <p class="section-desc">
            Bite-sized guides and breakdowns on how to clarify your messaging, optimize website speed, and save hours each week with smart automation.
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
  // Modal triggers are handled centrally by detailModal.js
}
