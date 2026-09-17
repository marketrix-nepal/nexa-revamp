import { servicesData } from '../data/servicesData.js';

/**
 * 8 Core Service Pillars Component (Disciplines)
 * Responsive interactive service showcase with instant tab switching across
 * all 8 interconnected pillars, scannable capability cards, and deep-dive modals.
 */

let activeIndex = 0;

export function renderDisciplines() {
  const tabsHtml = servicesData
    .map((service, idx) => `
      <button 
        class="service-tab-btn ${idx === 0 ? 'active' : ''}" 
        data-index="${idx}"
        data-service-id="${service.id}"
        role="tab"
        aria-selected="${idx === 0 ? 'true' : 'false'}"
        aria-controls="service-panel-${idx}"
        id="service-tab-${idx}"
      >
        <span class="tab-num">${service.number}</span>
        <span class="tab-title">${service.title}</span>
      </button>
    `)
    .join('');

  return `
    <section id="disciplines-stage" class="section">
      <div class="container-wide">
        <!-- Section Heading -->
        <div class="section-header">
          <div class="section-label">OUR 8 CORE SERVICE PILLARS</div>
          <h2 class="section-title">
            Interconnected Capabilities for Sustainable Growth.
          </h2>
          <p class="section-desc">
            Rather than a catalogue of isolated services, NEXA's eight pillars operate as a connected ecosystem—uniting strategy, brand, technology, automation, and data into scalable growth systems.
          </p>
        </div>

        <!-- Services Interactive Hub Layout -->
        <div class="services-hub-layout">
          <!-- Navigation Tabs Rail (8 Pillars) -->
          <div class="services-tabs-rail" id="services-tabs-list" role="tablist" aria-label="8 Service Pillars List">
            ${tabsHtml}
          </div>

          <!-- Active Service Content Canvas -->
          <div class="service-content-canvas" id="service-canvas-target" role="tabpanel">
            <!-- Dynamically populated by renderServiceContent(0) -->
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Renders the content panel for the currently selected service pillar
 */
export function renderServiceContent(index) {
  const service = servicesData[index];
  if (!service) return '';

  // 6 Primary Capabilities
  const capabilitiesHtml = service.whatWeOffer
    .map((item, i) => `
      <div class="capability-item-card">
        <div class="capability-num-tag">0${i + 1}</div>
        <h4 class="capability-item-title">${item.name}</h4>
        <p class="capability-item-desc">${item.desc}</p>
      </div>
    `)
    .join('');

  return `
    <div class="service-panel-fade">
      <!-- Service Header -->
      <div class="service-panel-header">
        <div class="badge badge-crimson">PILLAR ${service.number} · ${service.tagline}</div>
        <h3 class="service-panel-title">${service.title}</h3>
        <p class="service-panel-lead">${service.shortDesc}</p>
      </div>

      <!-- Key Capabilities Grid (All 6 displayed cleanly in 2x3 or 3x2) -->
      <div class="capability-cards-grid">
        ${capabilitiesHtml}
      </div>

      <!-- Proven Result Banner & Modal Trigger -->
      <div class="service-result-banner">
        <div class="result-info-block">
          <span class="result-highlight-badge">REAL-WORLD INTERVENTION OUTCOME</span>
          <div class="result-client-name">${service.caseHighlight.client}</div>
          <div class="result-metric-text">${service.caseHighlight.outcome}</div>
        </div>

        <button 
          class="btn btn-primary btn-sm open-service-modal-btn" 
          data-service-id="${service.id}"
          aria-label="View full details and deliverables for ${service.title}"
        >
          <span>Explore Pillar Deliverables →</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Event listeners for service tab switching
 */
export function initDisciplinesEvents() {
  const tabList = document.getElementById('services-tabs-list');
  const canvasTarget = document.getElementById('service-canvas-target');

  if (!tabList || !canvasTarget) return;

  // Render initial active service (Pillar 01)
  canvasTarget.innerHTML = renderServiceContent(0);

  // Tab click delegation
  tabList.addEventListener('click', (e) => {
    const btn = e.target.closest('.service-tab-btn');
    if (!btn) return;

    const idx = parseInt(btn.dataset.index, 10);
    if (idx === activeIndex) return;

    // Update active tab buttons
    tabList.querySelectorAll('.service-tab-btn').forEach((b, i) => {
      const isActive = i === idx;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    activeIndex = idx;

    // Smooth fade transition
    canvasTarget.classList.add('panel-switching');
    setTimeout(() => {
      canvasTarget.innerHTML = renderServiceContent(idx);
      canvasTarget.classList.remove('panel-switching');
    }, 150);
  });
}
