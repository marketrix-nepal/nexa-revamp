import { servicesData } from '../data/servicesData.js';

/**
 * Disciplines Component (Act 3: The Discipline Engine)
 * Pinned 300vh spatial vector switcher with 6 architectural blades on left
 * and dynamic right stage with 3 focused capability cards and benchmark.
 */

let activeIndex = 0;

export function renderDisciplines() {
  const bladesHtml = servicesData
    .map((service, idx) => `
      <button 
        class="discipline-blade ${idx === 0 ? 'active' : ''}" 
        data-index="${idx}"
        data-service-id="${service.id}"
        aria-label="Switch to ${service.title}"
      >
        <div class="blade-content-left">
          <span class="blade-num">${service.number}</span>
          <span class="blade-title">${service.title}</span>
        </div>
        <span class="blade-indicator"></span>
      </button>
    `)
    .join('');

  return `
    <section id="disciplines-stage" class="section">
      <div class="disciplines-pinned-container">
        <div class="container-wide">
          <!-- Section Heading -->
          <div class="section-header" style="margin-bottom: 2rem;">
            <div class="section-label">03 // THE DISCIPLINE ENGINE</div>
            <h2 class="section-title" style="font-size: clamp(2rem, 3.8vw, 3.4rem);">
              Six Vectors of Defensible Enterprise Value.
            </h2>
          </div>

          <!-- 2-Column Spatial Synchronization Layout -->
          <div class="disciplines-layout">
            <!-- Left Rail: Architectural Blades -->
            <div class="disciplines-left-rail" id="disciplines-blade-list" role="tablist">
              ${bladesHtml}
            </div>

            <!-- Right Canvas: Vector Stage -->
            <div class="disciplines-right-canvas" id="disciplines-canvas-target" role="tabpanel">
              <!-- Dynamically populated by renderVectorStageContent(0) -->
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Renders the right canvas content for the currently active discipline
 */
export function renderVectorStageContent(index) {
  const service = servicesData[index];
  if (!service) return '';

  // 3 Focused Strategic Vectors (only the first 3 capabilities for pristine minimal layout)
  const topThreeVectors = service.whatWeOffer.slice(0, 3);
  const vectorsHtml = topThreeVectors
    .map((item, i) => `
      <div class="strategic-vector-card">
        <div class="strategic-vector-num">0${i + 1} // CAPABILITY</div>
        <div class="strategic-vector-title">${item.name}</div>
        <div class="strategic-vector-desc">${item.desc}</div>
      </div>
    `)
    .join('');

  return `
    <div>
      <div class="vector-stage-header">
        <div class="badge badge-crimson">${service.number} // ${service.tagline}</div>
        <h3 class="vector-stage-headline">${service.title}</h3>
        <p class="vector-stage-lead">${service.shortDesc}</p>
      </div>

      <!-- 3 Focused Strategic Vectors (Strict Minimalist Mandate) -->
      <div class="strategic-vectors-grid">
        ${vectorsHtml}
      </div>
    </div>

    <!-- Verified Commercial Benchmark & Universal Modal Trigger -->
    <div class="benchmark-banner">
      <div class="benchmark-info">
        <div class="benchmark-tag">VERIFIED COMMERCIAL BENCHMARK</div>
        <div class="benchmark-client">${service.caseHighlight.client}</div>
        <div class="benchmark-outcome">${service.caseHighlight.outcome}</div>
      </div>

      <button 
        class="btn btn-ghost btn-sm open-service-modal-btn" 
        data-service-id="${service.id}"
        aria-label="Inspect full architecture for ${service.title}"
      >
        <span>Inspect Full Architecture →</span>
      </button>
    </div>
  `;
}

/**
 * Sets the active discipline index, updating both blade styles and right stage content
 */
export function setActiveDisciplineIndex(index, updateScroll = false) {
  if (index === activeIndex) return;
  activeIndex = index;

  const blades = document.querySelectorAll('.discipline-blade');
  blades.forEach((blade, idx) => {
    blade.classList.toggle('active', idx === activeIndex);
  });

  const canvasTarget = document.getElementById('disciplines-canvas-target');
  if (canvasTarget) {
    // Smooth cross-fade transition
    canvasTarget.style.opacity = '0.35';
    canvasTarget.style.transform = 'translateY(6px)';
    canvasTarget.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

    setTimeout(() => {
      canvasTarget.innerHTML = renderVectorStageContent(activeIndex);
      canvasTarget.style.opacity = '1';
      canvasTarget.style.transform = 'translateY(0)';
    }, 120);
  }
}

// Expose globally for GSAP ScrollTrigger and click handlers
window.setActiveDisciplineIndex = setActiveDisciplineIndex;

export function initDisciplinesEvents() {
  const canvasTarget = document.getElementById('disciplines-canvas-target');
  if (canvasTarget) {
    canvasTarget.innerHTML = renderVectorStageContent(0);
  }

  const blades = document.querySelectorAll('.discipline-blade');
  blades.forEach((blade) => {
    blade.addEventListener('click', (e) => {
      const idx = parseInt(blade.getAttribute('data-index'), 10);
      setActiveDisciplineIndex(idx, true);
    });
  });
}
