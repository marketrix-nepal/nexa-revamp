import { ideasLabData } from '../data/ideasLabData.js';

/**
 * Ideas Lab Component (Act 5: Speculative R&D Ledger)
 * 2-column architectural deck detailing 6 research blueprints
 * with progressive hypothesis disclosure drawers.
 */

export function renderIdeasLab() {
  const cardsHtml = ideasLabData
    .map((lab) => `
      <div class="lab-card" id="lab-inquiry-${lab.id}">
        <div>
          <div class="lab-top-meta">
            <span class="lab-inquiry-num">${lab.inquiryNum} · ${lab.category}</span>
            <span class="badge badge-amber">${lab.badge}</span>
          </div>

          <h3 class="lab-title">${lab.title}</h3>
          <p class="lab-summary">${lab.summary}</p>
        </div>

        <div>
          <!-- Inline Drawer Trigger -->
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <button 
              class="btn btn-ghost btn-sm toggle-lab-drawer-btn" 
              data-target="lab-drawer-${lab.id}"
              aria-expanded="false"
              aria-label="Inspect blueprint for ${lab.title}"
            >
              <span class="lab-toggle-text">Inspect Blueprint ⌄</span>
            </button>

            <button 
              class="btn btn-primary btn-sm open-lab-modal-btn" 
              data-exp-id="${lab.id}"
              aria-label="Open full technical blueprint for ${lab.title}"
            >
              <span>Full Blueprint →</span>
            </button>
          </div>

          <!-- Progressive Disclosure Drawer -->
          <div class="lab-drawer-wrapper" id="lab-drawer-${lab.id}">
            <div class="lab-drawer-inner">
              <div class="lab-hypothesis-block">
                <div class="lab-hypothesis-title">// CORE RESEARCH HYPOTHESIS & METHODOLOGY</div>
                <p class="lab-hypothesis-text">${lab.hypothesis}</p>
                <div class="lab-hypothesis-title" style="margin-top: 1rem;">// SYSTEM ARCHITECTURE & DELIVERABLE</div>
                <p class="lab-hypothesis-text">${lab.architecture}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <section id="ideas-lab-stage" class="section">
      <div class="container-wide">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">05 // NEXA IDEAS LAB</div>
          <h2 class="section-title">
            Speculative R&D & Pacific Deep-Tech Blueprints.
          </h2>
          <p class="section-desc">
            Where we incubate non-consensus commercial models, autonomous agent architectures, and cryptographic brand provenance systems before enterprise market consensus.
          </p>
        </div>

        <!-- 2-Column Architectural Deck -->
        <div class="grid-2">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

export function initIdeasLabEvents() {
  const toggleButtons = document.querySelectorAll('.toggle-lab-drawer-btn');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      if (!drawer) return;

      const isExpanded = drawer.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded);
      const textSpan = btn.querySelector('.lab-toggle-text');
      if (textSpan) {
        textSpan.textContent = isExpanded ? 'Collapse Blueprint ⌃' : 'Inspect Blueprint ⌄';
      }

      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    });
  });
}
