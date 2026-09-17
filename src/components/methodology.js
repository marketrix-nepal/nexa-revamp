import { COMPANY_INFO } from '../data/companyData.js';

/**
 * Transformation Methodology & Value Model Component
 * Interactive visual representation of the 6-step transformation process
 * and the NEXA Connected Growth Value Model.
 */

export function renderMethodology() {
  const stepsHtml = COMPANY_INFO.methodologySteps.map((step, idx) => `
    <div class="methodology-step-card glass-panel" data-step-index="${idx}">
      <div class="step-card-header">
        <span class="step-num-badge">${step.number}</span>
        <span class="step-kicker-tag">${step.kicker}</span>
      </div>
      <h3 class="step-card-title">${step.title}</h3>
      <p class="step-card-desc">${step.desc}</p>
      <div class="step-card-indicator">
        <span class="step-arrow-line"></span>
        <span class="step-phase-label">Phase 0${idx + 1}</span>
      </div>
    </div>
  `).join('');

  const valueModelItems = COMPANY_INFO.valueModel.map((item, idx) => `
    <div class="value-model-node ${idx === 7 ? 'node-climax' : ''}">
      <div class="node-num">${item.step}</div>
      <div class="node-title">${item.label}</div>
      <div class="node-tooltip">${item.desc}</div>
      ${idx < COMPANY_INFO.valueModel.length - 1 ? '<span class="node-connector" aria-hidden="true">→</span>' : ''}
    </div>
  `).join('');

  return `
    <section id="methodology-stage" class="section">
      <div class="container-wide">
        
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">HOW NEXA GROWTH WORKS</div>
          <h2 class="section-title">
            The 6-Step Transformation Methodology.
          </h2>
          <p class="section-desc">
            We follow a structured transformation process that guides projects from initial diagnosis through strategy, creation, technology, marketing, and continuous optimization.
          </p>
        </div>

        <!-- 6-Step Transformation Process Grid -->
        <div class="methodology-grid">
          ${stepsHtml}
        </div>

        <!-- Connected Value Model & Flywheel -->
        <div class="value-model-container glass-panel">
          <div class="value-model-header">
            <span class="badge badge-crimson">THE NEXA VALUE MODEL</span>
            <h3 class="value-model-title">
              The Complete Connected Growth Flywheel
            </h3>
            <p class="value-model-lead">
              We identify a problem or opportunity, develop the strategy, create what is needed, implement the appropriate technology and systems, activate acquisition channels, measure performance and support continuous growth.
            </p>
          </div>

          <!-- Interactive Node Chain -->
          <div class="value-nodes-track" role="region" aria-label="NEXA Value Model Flow">
            ${valueModelItems}
          </div>

          <!-- The Core Transformation Journey Banner -->
          <div class="transformation-journey-strip">
            <span class="journey-label">THE END-TO-END JOURNEY:</span>
            <div class="journey-sequence">
              <span class="journey-pill">IDEA</span>
              <span class="journey-arrow">→</span>
              <span class="journey-pill">STRATEGY</span>
              <span class="journey-arrow">→</span>
              <span class="journey-pill">BRAND</span>
              <span class="journey-arrow">→</span>
              <span class="journey-pill">DIGITAL</span>
              <span class="journey-arrow">→</span>
              <span class="journey-pill">AI</span>
              <span class="journey-arrow">→</span>
              <span class="journey-pill">AUTOMATION</span>
              <span class="journey-arrow">→</span>
              <span class="journey-pill">MARKETING</span>
              <span class="journey-arrow">→</span>
              <span class="journey-pill">DATA</span>
              <span class="journey-arrow">→</span>
              <span class="journey-pill journey-pill-climax">GROWTH</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initMethodologyEvents() {
  // Add micro-interactions for step cards
  const stepCards = document.querySelectorAll('.methodology-step-card');
  stepCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('step-hovered');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('step-hovered');
    });
  });
}
