import { trainingData } from '../data/trainingData.js';

/**
 * Training & Executive Consulting Component
 * Complementary offering for businesses, executives, entrepreneurs and organizations.
 */

export function renderTraining() {
  const cardsHtml = trainingData.map((item) => {
    const takeawaysHtml = item.keyTakeaways.map(t => `
      <li>
        <span class="takeaway-bullet">›</span>
        <span>${t}</span>
      </li>
    `).join('');

    return `
      <div class="training-card glass-panel" id="training-${item.id}">
        <div class="training-card-top">
          <span class="training-num">${item.number}</span>
          <span class="badge badge-amber">${item.badge}</span>
        </div>

        <h3 class="training-card-title">${item.title}</h3>
        <p class="training-card-desc">${item.shortDesc}</p>

        <div class="training-meta-row">
          <div class="training-meta-item">
            <span class="meta-label">Duration:</span>
            <span class="meta-val">${item.duration}</span>
          </div>
          <div class="training-meta-item">
            <span class="meta-label">Target:</span>
            <span class="meta-val">${item.audience}</span>
          </div>
        </div>

        <div class="training-takeaways">
          <div class="takeaways-label">Core Modules & Takeaways:</div>
          <ul class="takeaways-list">
            ${takeawaysHtml}
          </ul>
        </div>

        <div class="training-card-footer">
          <a href="#concierge-stage" class="btn btn-ghost btn-sm" style="width: 100%; justify-content: center;">
            <span>Inquire About This Program →</span>
          </a>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section id="training-stage" class="section">
      <div class="container-wide">
        
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">TRAINING & CONSULTING</div>
          <h2 class="section-title">
            Executive Workshops & Organizational Upskilling.
          </h2>
          <p class="section-desc">
            As a complementary capability to our implementation services, NEXA provides specialized training, interactive workshops, and high-level strategic advisory for leaders and teams.
          </p>
        </div>

        <!-- 3-Column Responsive Training Cards Grid -->
        <div class="grid-3 training-cards-grid">
          ${cardsHtml}
        </div>

        <!-- Training Inquiries Callout -->
        <div class="training-advisory-banner glass-panel">
          <div class="advisory-left">
            <h4 class="advisory-title">Custom Corporate Cohorts & Boardroom Intensives</h4>
            <p class="advisory-desc">
              We design custom on-site workshops and remote training programs tailored to your organization’s specific strategic challenges and technical stack across New Zealand, Singapore, and international markets.
            </p>
          </div>
          <div class="advisory-right">
            <a href="#concierge-stage" class="btn btn-primary">
              <span>Book Executive Advisory →</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initTrainingEvents() {
  // Add any interactive behaviors if needed
}
