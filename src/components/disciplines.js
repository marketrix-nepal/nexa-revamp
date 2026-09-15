import { servicesData } from '../data/servicesData.js';

/**
 * Services Component (formerly Disciplines)
 * Clean, responsive interactive service showcase with instant tab switching,
 * scannable capability cards, and modal deep-dives.
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
          <div class="section-label">OUR SERVICES</div>
          <h2 class="section-title">
            Everything You Need to Scale Your Business.
          </h2>
          <p class="section-desc">
            We partner with you across six core areas—from brand positioning and high-converting websites to custom software and smart AI automation.
          </p>
        </div>

        <!-- Services Interactive Hub Layout -->
        <div class="services-hub-layout">
          <!-- Navigation Tabs Rail -->
          <div class="services-tabs-rail" id="services-tabs-list" role="tablist" aria-label="Services List">
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
 * Renders the content panel for the currently selected service
 */
export function renderServiceContent(index) {
  const service = servicesData[index];
  if (!service) return '';

  // 3 Primary Capabilities
  const topThree = service.whatWeOffer.slice(0, 3);
  const capabilitiesHtml = topThree
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
        <div class="badge badge-crimson">${service.number} · ${service.tagline}</div>
        <h3 class="service-panel-title">${service.title}</h3>
        <p class="service-panel-lead">${service.shortDesc}</p>
      </div>

      <!-- 3 Key Features / Deliverables Grid -->
      <div class="capability-cards-grid">
        ${capabilitiesHtml}
      </div>

      <!-- Proven Result Banner & Modal Trigger -->
      <div class="service-result-banner">
        <div class="result-info-block">
          <span class="result-highlight-badge">REAL-WORLD OUTCOME</span>
          <div class="result-client-name">${service.caseHighlight.client}</div>
          <div class="result-metric-text">${service.caseHighlight.outcome}</div>
        </div>

        <button 
          class="btn btn-ghost btn-sm open-service-modal-btn" 
          data-service-id="${service.id}"
          aria-label="View full details for ${service.title}"
        >
          <span>View Service Details →</span>
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

  // Render initial tab content
  canvasTarget.innerHTML = renderServiceContent(0);

  // Global helper to switch service cleanly
  window.setActiveServiceIndex = (index) => {
    if (index === activeIndex) return;
    activeIndex = index;

    const allTabs = tabList.querySelectorAll('.service-tab-btn');
    allTabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Smooth fade transition
    canvasTarget.style.opacity = '0';
    canvasTarget.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      canvasTarget.innerHTML = renderServiceContent(index);
      canvasTarget.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      canvasTarget.style.opacity = '1';
      canvasTarget.style.transform = 'translateY(0)';
    }, 150);
  };

  // Tab click handler
  tabList.addEventListener('click', (e) => {
    const btn = e.target.closest('.service-tab-btn');
    if (!btn) return;
    const index = parseInt(btn.getAttribute('data-index'), 10);
    if (!isNaN(index)) {
      window.setActiveServiceIndex(index);
    }
  });
}
