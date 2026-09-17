import { COMPANY_INFO } from '../data/companyData.js';

/**
 * Transformation Methodology & Value Model Component
 * Interactive visual representation of the 6-step transformation process,
 * interactive Connected Value Model carousel, and radiant gradient journey pipeline.
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
      <div class="step-card-footer">
        <span class="step-phase-pill">Phase 0${idx + 1}</span>
        <span class="step-arrow-icon">→</span>
      </div>
    </div>
  `).join('');

  const valueModelSlidesHtml = COMPANY_INFO.valueModel.map((item, idx) => `
    <div class="carousel-slide-card glass-panel ${idx === 7 ? 'slide-climax' : ''}" data-slide-idx="${idx}">
      <div class="slide-card-top">
        <span class="slide-step-num">${item.step}</span>
        <span class="slide-phase-badge">Phase 0${idx + 1}</span>
      </div>
      <h4 class="slide-card-title">${item.label}</h4>
      <p class="slide-card-desc">${item.desc}</p>
      <div class="slide-card-status">
        <span class="pulse-node ${idx === 7 ? 'pulse-node-amber' : ''}"></span>
        <span class="slide-status-text">${idx === 7 ? 'Continuous Scaling' : 'Connected Pipeline'}</span>
      </div>
    </div>
  `).join('');

  const carouselDotsHtml = COMPANY_INFO.valueModel.map((_, idx) => `
    <button class="carousel-dot-btn ${idx === 0 ? 'active' : ''}" data-dot-idx="${idx}" aria-label="Go to Slide 0${idx + 1}"></button>
  `).join('');

  return `
    <section id="methodology-stage" class="section">
      <div class="container-wide">
        
        <!-- Section Header (Refined, Non-Bulky) -->
        <div class="section-header">
          <div class="section-label">HOW NEXA GROWTH WORKS</div>
          <h2 class="section-title">
            The 6-Step <span class="text-gradient-brand">Transformation Process</span>.
          </h2>
          <p class="section-desc">
            A battle-tested methodology guiding engagements from initial commercial diagnosis through strategy, creation, engineering, customer acquisition, and scale.
          </p>
        </div>

        <!-- 6-Step Transformation Process Grid -->
        <div class="methodology-grid">
          ${stepsHtml}
        </div>

        <!-- Connected Value Model Carousel (Replaces Native Scroll) -->
        <div class="value-model-container glass-panel">
          <div class="value-model-header-row">
            <div class="model-header-left">
              <span class="badge badge-crimson">THE NEXA VALUE MODEL</span>
              <h3 class="value-model-title">
                The Complete Connected Growth Flywheel
              </h3>
              <p class="value-model-lead">
                Every stage compounds into the next: strategic insight informs technical architecture, automated funnels capture demand, and analytics fuel continuous optimization.
              </p>
            </div>

            <!-- Carousel Nav Controls -->
            <div class="carousel-nav-controls">
              <button class="carousel-nav-btn" id="carousel-prev-btn" aria-label="Previous Slide">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <div class="carousel-counter-badge" id="carousel-counter-display">
                <span class="active-counter-num">01</span> / 08
              </div>

              <button class="carousel-nav-btn" id="carousel-next-btn" aria-label="Next Slide">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Carousel Stage & Viewport -->
          <div class="carousel-viewport" id="value-carousel-viewport">
            <div class="carousel-track" id="value-carousel-track">
              ${valueModelSlidesHtml}
            </div>
          </div>

          <!-- Carousel Pagination Dots -->
          <div class="carousel-dots-row" id="value-carousel-dots">
            ${carouselDotsHtml}
          </div>

          <!-- The Core Transformation Journey Banner (Gradient Progression to Orange Growth) -->
          <div class="transformation-journey-strip">
            <div class="journey-header-meta">
              <span class="journey-label">THE END-TO-END JOURNEY:</span>
              <span class="journey-sublabel">Linear Pipeline → Compounding Enterprise Value</span>
            </div>

            <div class="journey-sequence-pipeline" id="journey-pipeline">
              <div class="journey-step-wrapper step-1" data-step-name="IDEA">
                <span class="journey-pill pill-gradient-1">IDEA</span>
                <span class="journey-arrow arrow-1">→</span>
              </div>
              <div class="journey-step-wrapper step-2" data-step-name="STRATEGY">
                <span class="journey-pill pill-gradient-2">STRATEGY</span>
                <span class="journey-arrow arrow-2">→</span>
              </div>
              <div class="journey-step-wrapper step-3" data-step-name="BRAND">
                <span class="journey-pill pill-gradient-3">BRAND</span>
                <span class="journey-arrow arrow-3">→</span>
              </div>
              <div class="journey-step-wrapper step-4" data-step-name="DIGITAL">
                <span class="journey-pill pill-gradient-4">DIGITAL</span>
                <span class="journey-arrow arrow-4">→</span>
              </div>
              <div class="journey-step-wrapper step-5" data-step-name="AI">
                <span class="journey-pill pill-gradient-5">AI</span>
                <span class="journey-arrow arrow-5">→</span>
              </div>
              <div class="journey-step-wrapper step-6" data-step-name="AUTOMATION">
                <span class="journey-pill pill-gradient-6">AUTOMATION</span>
                <span class="journey-arrow arrow-6">→</span>
              </div>
              <div class="journey-step-wrapper step-7" data-step-name="MARKETING">
                <span class="journey-pill pill-gradient-7">MARKETING</span>
                <span class="journey-arrow arrow-7">→</span>
              </div>
              <div class="journey-step-wrapper step-8" data-step-name="DATA">
                <span class="journey-pill pill-gradient-8">DATA</span>
                <span class="journey-arrow arrow-8">→</span>
              </div>
              <div class="journey-step-wrapper step-9" data-step-name="GROWTH">
                <span class="journey-pill pill-gradient-9 pill-climax-growth">
                  <span class="growth-sparkle">✦</span>
                  <span>GROWTH</span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initMethodologyEvents() {
  // 1. Carousel Logic for NEXA Value Model
  const viewport = document.getElementById('value-carousel-viewport');
  const track = document.getElementById('value-carousel-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const counterDisplay = document.getElementById('carousel-counter-display');
  const dotBtns = document.querySelectorAll('.carousel-dot-btn');
  const slides = document.querySelectorAll('.carousel-slide-card');

  if (!viewport || !track || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayInterval = null;

  function updateCarousel(idx) {
    if (idx < 0) idx = totalSlides - 1;
    if (idx >= totalSlides) idx = 0;
    currentSlide = idx;

    // Scroll active slide into view smoothly
    const targetSlide = slides[idx];
    if (targetSlide) {
      const scrollLeft = targetSlide.offsetLeft - viewport.offsetLeft;
      viewport.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }

    // Update active classes
    slides.forEach((slide, i) => {
      slide.classList.toggle('active-slide', i === currentSlide);
    });

    dotBtns.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    if (counterDisplay) {
      counterDisplay.innerHTML = `<span class="active-counter-num">0${currentSlide + 1}</span> / 0${totalSlides}`;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentSlide - 1);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateCarousel(currentSlide + 1);
      resetAutoplay();
    });
  }

  dotBtns.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.dotIdx, 10);
      if (!isNaN(idx)) {
        updateCarousel(idx);
        resetAutoplay();
      }
    });
  });

  // Clicking a slide brings it directly to active focus
  slides.forEach((slide) => {
    slide.addEventListener('click', () => {
      const idx = parseInt(slide.dataset.slideIdx, 10);
      if (!isNaN(idx)) {
        updateCarousel(idx);
        resetAutoplay();
      }
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      updateCarousel(currentSlide + 1);
    }, 4000);
  }

  function resetAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    startAutoplay();
  }

  viewport.addEventListener('mouseenter', () => {
    if (autoplayInterval) clearInterval(autoplayInterval);
  });

  viewport.addEventListener('mouseleave', () => {
    resetAutoplay();
  });

  // Initialize carousel at slide 0
  updateCarousel(0);
  startAutoplay();

  // 2. Interactive Journey Pipeline Hover Glow
  const journeyWrappers = document.querySelectorAll('.journey-step-wrapper');
  journeyWrappers.forEach((wrap, i) => {
    wrap.addEventListener('mouseenter', () => {
      for (let j = 0; j <= i; j++) {
        journeyWrappers[j].classList.add('pipeline-highlighted');
      }
    });
    wrap.addEventListener('mouseleave', () => {
      journeyWrappers.forEach(w => w.classList.remove('pipeline-highlighted'));
    });
  });
}
