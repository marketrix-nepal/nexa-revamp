import { servicesData } from '../data/servicesData.js';
import { caseStudiesData } from '../data/caseStudiesData.js';
import { ideasLabData } from '../data/ideasLabData.js';
import { insightsData } from '../data/insightsData.js';

/**
 * Universal Modal Reader Component
 * Handles progressive disclosure deep-dives for Services, Case Studies,
 * Ideas Lab Blueprints, and Editorial Insights.
 */

export function renderDetailModalContainer() {
  return `
    <div 
      id="universal-modal" 
      class="modal-backdrop" 
      role="dialog" 
      aria-modal="true" 
      aria-hidden="true"
    >
      <div class="modal-box" id="modal-box-element">
        <button 
          class="modal-close-btn" 
          id="modal-close-btn" 
          aria-label="Close modal"
        >
          ✕
        </button>
        <div id="modal-content-slot" class="modal-content-body">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>
  `;
}

export function openModal(htmlContent, hash = '') {
  const modal = document.getElementById('universal-modal');
  const slot = document.getElementById('modal-content-slot');
  if (!modal || !slot) return;

  slot.innerHTML = htmlContent;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  if (window.lenis) {
    window.lenis.stop();
  }

  if (hash) {
    history.replaceState(null, '', `#${hash}`);
  }
}

export function closeModal() {
  const modal = document.getElementById('universal-modal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');

  if (window.lenis) {
    window.lenis.start();
  }

  // Clear hash without reload if it matches modal hash patterns
  if (location.hash.startsWith('#service-') || 
      location.hash.startsWith('#case-') || 
      location.hash.startsWith('#lab-') || 
      location.hash.startsWith('#insight-')) {
    history.replaceState(null, '', window.location.pathname);
  }
}

// Global openers
export function openServiceModalById(id) {
  const service = servicesData.find((s) => s.id === id || s.slug === id);
  if (!service) return;

  const deliverablesHtml = service.solutionsDeliverables
    .map((deliv) => `
      <li class="deliverable-item">
        <span class="deliverable-bullet">▸</span>
        <span>${deliv}</span>
      </li>
    `)
    .join('');

  const approachHtml = service.approach
    .map((step) => `
      <div style="margin-bottom: 1.25rem;">
        <div style="font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700; color: var(--crimson); margin-bottom: 0.35rem;">
          ${step.step}
        </div>
        <p style="font-size: 0.94rem; color: var(--text-secondary); margin: 0;">
          ${step.detail}
        </p>
      </div>
    `)
    .join('');

  const content = `
    <div class="badge badge-crimson">${service.number} // ${service.tagline}</div>
    <h2>${service.title}</h2>
    <p class="lead">${service.heroLead}</p>

    <div class="modal-section">
      <div class="modal-section-title">// 4-PHASE STRATEGIC METHODOLOGY</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        ${approachHtml}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">// ENTERPRISE DELIVERABLES & ARTIFACTS</div>
      <ul class="deliverables-checklist">
        ${deliverablesHtml}
      </ul>
    </div>

    <div class="modal-section" style="background: rgba(255, 255, 255, 0.02); padding: 1.5rem; border-radius: var(--r-btn); border: 1px solid var(--border-hairline);">
      <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">
        COMMERCIAL BENCHMARK
      </div>
      <h4 style="font-size: 1.1rem; color: #FFFFFF; margin-bottom: 0.35rem;">
        ${service.caseHighlight.client}
      </h4>
      <p style="font-size: 0.92rem; color: var(--text-secondary); margin: 0;">
        ${service.caseHighlight.desc}
      </p>
    </div>

    <div style="margin-top: 2.5rem; display: flex; gap: 1rem; align-items: center;">
      <a href="#concierge-stage" class="btn btn-primary" onclick="window.closeDetailModal()">
        <span>Scope ${service.title} Engagement →</span>
      </a>
      <button class="btn btn-ghost" onclick="window.closeDetailModal()">
        <span>Dismiss</span>
      </button>
    </div>
  `;

  openModal(content, `service-${service.id}`);
}

export function openCaseStudyModalById(id) {
  const dossier = caseStudiesData.find((c) => c.id === id || c.slug === id);
  if (!dossier) return;

  const chipsHtml = dossier.chips
    .map((chip) => `<span class="dossier-chip">${chip}</span>`)
    .join('');

  const content = `
    <div class="dossier-index">DOSSIER ${dossier.index} · ${dossier.sector.toUpperCase()} · ${dossier.year}</div>
    <h2>${dossier.title}</h2>
    <p class="lead">${dossier.essenceHook}</p>

    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
      ${chipsHtml}
    </div>

    <div class="modal-section">
      <div class="modal-section-title">// 01 THE STRATEGIC FRICTION</div>
      <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary);">${dossier.challenge}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">// 02 STRATEGY & CONCEPTUAL HOOK</div>
      <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 1rem;">${dossier.strategy}</p>
      <div style="padding: 1rem 1.25rem; background: rgba(229, 25, 45, 0.08); border-left: 3px solid var(--crimson); border-radius: 0 var(--r-btn) var(--r-btn) 0;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--crimson); font-weight: 700;">THE CORE HOOK:</span>
        <span style="font-size: 0.95rem; color: #FFFFFF; margin-left: 0.5rem;">${dossier.idea}</span>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">// 03 ARCHITECTURAL & TECHNICAL EXECUTION</div>
      <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary);">${dossier.solution}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">// 04 ENTERPRISE OUTCOME</div>
      <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary);">${dossier.result}</p>
    </div>

    <div class="dossier-verified-quote" style="margin-top: 2rem;">
      <p class="quote-text">"${dossier.quote.text}"</p>
      <div class="quote-author">— ${dossier.quote.author}, ${dossier.quote.title}</div>
    </div>

    <div style="margin-top: 2.5rem; display: flex; gap: 1rem; align-items: center;">
      <a href="#concierge-stage" class="btn btn-primary" onclick="window.closeDetailModal()">
        <span>Initiate Similar Transformation →</span>
      </a>
      <button class="btn btn-ghost" onclick="window.closeDetailModal()">
        <span>Dismiss</span>
      </button>
    </div>
  `;

  openModal(content, `case-${dossier.id}`);
}

export function openLabModalById(id) {
  const lab = ideasLabData.find((l) => l.id === id);
  if (!lab) return;

  const content = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
      <span class="lab-inquiry-num">${lab.inquiryNum} · ${lab.category}</span>
      <span class="badge badge-amber">${lab.badge}</span>
    </div>
    <h2>${lab.title}</h2>
    <p class="lead">${lab.summary}</p>

    <div class="modal-section">
      <div class="modal-section-title">// SPECULATIVE RESEARCH HYPOTHESIS</div>
      <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary);">${lab.hypothesis}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">// SYSTEM ARCHITECTURE & PROTOCOL</div>
      <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary);">${lab.architecture}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">// SPECIFICATION & DELIVERABLE</div>
      <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary);">${lab.deliverable}</p>
    </div>

    <div style="margin-top: 2.5rem; display: flex; gap: 1rem; align-items: center;">
      <a href="#concierge-stage" class="btn btn-primary" onclick="window.closeDetailModal()">
        <span>Co-Develop R&D Blueprint →</span>
      </a>
      <button class="btn btn-ghost" onclick="window.closeDetailModal()">
        <span>Dismiss</span>
      </button>
    </div>
  `;

  openModal(content, `lab-${lab.id}`);
}

// Expose globally for HTML event handlers
window.openServiceModalById = openServiceModalById;
window.openCaseStudyModalById = openCaseStudyModalById;
window.openLabModalById = openLabModalById;
window.closeDetailModal = closeModal;

export function initDetailModalEvents() {
  const modal = document.getElementById('universal-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Dismiss on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Dismiss on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Global delegation for modal trigger buttons
  document.addEventListener('click', (e) => {
    const serviceBtn = e.target.closest('.open-service-modal-btn');
    if (serviceBtn) {
      const id = serviceBtn.getAttribute('data-service-id');
      openServiceModalById(id);
      return;
    }

    const caseBtn = e.target.closest('.open-case-modal-btn');
    if (caseBtn) {
      const id = caseBtn.getAttribute('data-case-id');
      openCaseStudyModalById(id);
      return;
    }

    const labBtn = e.target.closest('.open-lab-modal-btn');
    if (labBtn) {
      const id = labBtn.getAttribute('data-exp-id');
      openLabModalById(id);
      return;
    }
  });

  // Check URL hash on page load for deep links
  const hash = window.location.hash;
  if (hash.startsWith('#service-')) {
    const id = hash.replace('#service-', '');
    setTimeout(() => openServiceModalById(id), 250);
  } else if (hash.startsWith('#case-')) {
    const id = hash.replace('#case-', '');
    setTimeout(() => openCaseStudyModalById(id), 250);
  } else if (hash.startsWith('#lab-')) {
    const id = hash.replace('#lab-', '');
    setTimeout(() => openLabModalById(id), 250);
  }
}
