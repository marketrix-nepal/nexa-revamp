import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollTimeline() {
  const heroStage = document.getElementById('hero-stage');
  const manifestoStage = document.getElementById('manifesto-stage');
  const methodologyStage = document.getElementById('methodology-stage');
  const disciplinesStage = document.getElementById('disciplines-stage');
  const dossiersStage = document.getElementById('dossiers-stage');
  const trainingStage = document.getElementById('training-stage');
  const labStage = document.getElementById('ideas-lab-stage');
  const conciergeStage = document.getElementById('concierge-stage');

  if (!heroStage) return;

  // 1. HIGH-PERFORMANCE CANVAS SCROLL SCRUBBING & CHOREOGRAPHY
  initHeroCanvasScrubbing(heroStage);

  // 2. ABOUT US SECTION REVEAL (Guaranteed visible cards with smooth stagger)
  if (manifestoStage) {
    const revealTargets = manifestoStage.querySelectorAll('.section-header, .vision-statement-banner, .value-pillar-card, .target-client-card, .hub-ledger-card');
    
    revealTargets.forEach(el => {
      el.style.visibility = 'visible';
    });

    gsap.fromTo(revealTargets, 
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: manifestoStage,
          start: 'top 85%',
          toggleActions: 'play none none none',
          fastScrollEnd: true
        }
      }
    );
  }

  // 2.5 METHODOLOGY SECTION REVEAL
  if (methodologyStage) {
    gsap.from(methodologyStage.querySelectorAll('.section-header, .methodology-step-card, .value-model-container'), {
      scrollTrigger: {
        trigger: methodologyStage,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // 3. SERVICES SECTION REVEAL (Fluid, unpinned)
  if (disciplinesStage) {
    gsap.from(disciplinesStage.querySelectorAll('.section-header, .services-tabs-rail, .service-content-canvas'), {
      scrollTrigger: {
        trigger: disciplinesStage,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // 3.5 TRAINING & CONSULTING SECTION REVEAL
  if (trainingStage) {
    gsap.from(trainingStage.querySelectorAll('.section-header, .training-card, .training-advisory-banner'), {
      scrollTrigger: {
        trigger: trainingStage,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // 4. CASE STUDIES CARDS (Smooth individual fade-ups)
  if (dossiersStage) {
    const caseCards = dossiersStage.querySelectorAll('.case-study-card');
    caseCards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out'
      });
    });
  }

  // 5. INSIGHTS SECTION (Clean 2-col stagger)
  if (labStage) {
    const insightCards = labStage.querySelectorAll('.insight-article-card');
    gsap.from(insightCards, {
      scrollTrigger: {
        trigger: labStage,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // 6. CONTACT SECTION
  if (conciergeStage) {
    gsap.from(conciergeStage.querySelectorAll('.contact-form-card, .contact-info-panel'), {
      scrollTrigger: {
        trigger: conciergeStage,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // 7. NAVBAR GLASS SHIFT
  const navbar = document.getElementById('navbar');
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      toggleClass: { className: 'nav-scrolled', targets: navbar }
    });
  }
}

/**
 * 60fps Canvas Image Sequence Engine: 100 high-res WebP frames, lerped scrub,
 * zero network stalls, and 3-phase choreographed story engine.
 */
function initHeroCanvasScrubbing(heroStage) {
  const canvas = heroStage.querySelector('#hero-monolith-canvas');
  const loader = heroStage.querySelector('#hero-video-loader');
  const scrubBar = heroStage.querySelector('#hero-scrub-bar');
  const introBlock = heroStage.querySelector('#hero-phase-intro');
  const servicesBlock = heroStage.querySelector('#hero-phase-services');
  const ctaBlock = heroStage.querySelector('#hero-phase-cta');
  const serviceCards = heroStage.querySelectorAll('.service-spotlight-card');
  const hudDots = heroStage.querySelectorAll('.hud-dot');
  const hudCounter = heroStage.querySelector('#services-hud-counter');
  const manifestoJumpBtn = heroStage.querySelector('#hero-manifesto-jump-btn');

  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  const TOTAL_FRAMES = 100;
  const frames = new Array(TOTAL_FRAMES);
  let loadedCount = 0;
  let isFirstFrameReady = false;

  function dismissLoader() {
    if (loader && !loader.classList.contains('loader-dismissed')) {
      loader.classList.add('loader-dismissed');
      setTimeout(() => {
        if (loader && loader.parentNode) loader.remove();
      }, 500);
    }
  }

  // High-performance canvas drawing with aspect-ratio cover
  function drawFrameCover(img) {
    if (!ctx || !canvas || !img) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1600;
    const ih = img.naturalHeight || 900;

    const canvasRatio = cw / ch;
    const imageRatio = iw / ih;

    let dw, dh, dx, dy;
    if (canvasRatio > imageRatio) {
      dw = cw;
      dh = cw / imageRatio;
      dx = 0;
      dy = (ch - dh) * 0.5;
    } else {
      dh = ch;
      dw = ch * imageRatio;
      dx = (cw - dw) * 0.5;
      dy = 0;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
  }

  // Fallback finder so canvas never blinks or flashes black
  function getClosestAvailableFrame(idx) {
    if (frames[idx]) return frames[idx];
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      if (idx - offset >= 0 && frames[idx - offset]) return frames[idx - offset];
      if (idx + offset < TOTAL_FRAMES && frames[idx + offset]) return frames[idx + offset];
    }
    return null;
  }

  // Canvas resize with retina sharpness
  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const targetIdx = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameIndex)));
    const img = getClosestAvailableFrame(targetIdx);
    if (img) drawFrameCover(img);
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });

  // 1. Preload frame 0 immediately for instant first paint (<50ms)
  const initialImg = new Image();
  initialImg.src = '/frames/frame_000.webp';
  initialImg.onload = () => {
    frames[0] = initialImg;
    isFirstFrameReady = true;
    resizeCanvas();
    drawFrameCover(initialImg);
    dismissLoader();
    ScrollTrigger.refresh();
  };

  // 2. Progressively preload the remaining sequence in background
  function preloadRemainingFrames() {
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = () => {
        frames[i] = img;
        loadedCount++;
      };
    }
  }

  // Kick off background sequence load
  preloadRemainingFrames();

  // Fail-safe loader timeout
  setTimeout(dismissLoader, 1500);

  // Smooth lerp render loop
  let targetFrameIndex = 0;
  let currentFrameIndex = 0;
  let lastDrawnIndex = -1;

  function loopCanvasRender() {
    const diff = targetFrameIndex - currentFrameIndex;
    if (Math.abs(diff) > 0.01) {
      currentFrameIndex += diff * 0.28; // Responsive, snappy lerp
    } else {
      currentFrameIndex = targetFrameIndex;
    }

    const frameToDraw = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameIndex)));
    if (frameToDraw !== lastDrawnIndex) {
      const img = getClosestAvailableFrame(frameToDraw);
      if (img) {
        drawFrameCover(img);
        lastDrawnIndex = frameToDraw;
      }
    }

    requestAnimationFrame(loopCanvasRender);
  }
  requestAnimationFrame(loopCanvasRender);

  // 3-Phase Choreography Engine
  function applyChoreography(progress) {
    // 1. Progress Bar
    if (scrubBar) {
      scrubBar.style.transform = `scaleX(${progress})`;
    }

    // 2. Phase 1: Intro (0% - 15%)
    if (introBlock) {
      if (progress <= 0.05) {
        introBlock.style.opacity = '1';
        introBlock.style.visibility = 'visible';
        introBlock.style.transform = 'translateY(0) scale(1)';
      } else if (progress > 0.05 && progress <= 0.15) {
        const p = (progress - 0.05) / 0.10;
        introBlock.style.opacity = Math.max(0, 1 - p).toFixed(3);
        introBlock.style.transform = `translateY(${-p * 35}px) scale(${1 - p * 0.05})`;
        introBlock.style.visibility = 'visible';
      } else {
        introBlock.style.opacity = '0';
        introBlock.style.visibility = 'hidden';
        introBlock.style.transform = 'translateY(-35px) scale(0.95)';
      }
    }

    // 3. Phase 2: 6 Core Services (15% - 82%)
    if (servicesBlock) {
      if (progress < 0.13 || progress > 0.84) {
        servicesBlock.style.opacity = '0';
        servicesBlock.style.visibility = 'hidden';
        servicesBlock.style.transform = 'translateY(25px)';
      } else if (progress >= 0.13 && progress <= 0.17) {
        const enterP = (progress - 0.13) / 0.04;
        servicesBlock.style.opacity = enterP.toFixed(3);
        servicesBlock.style.visibility = 'visible';
        servicesBlock.style.transform = `translateY(${(1 - enterP) * 25}px)`;
      } else if (progress >= 0.80 && progress <= 0.84) {
        const exitP = (progress - 0.80) / 0.04;
        servicesBlock.style.opacity = Math.max(0, 1 - exitP).toFixed(3);
        servicesBlock.style.visibility = 'visible';
        servicesBlock.style.transform = `translateY(${-exitP * 25}px)`;
      } else {
        servicesBlock.style.opacity = '1';
        servicesBlock.style.visibility = 'visible';
        servicesBlock.style.transform = 'translateY(0)';
      }

      if (progress >= 0.13 && progress <= 0.84 && serviceCards.length > 0) {
        const normalized = Math.max(0, Math.min(0.999, (progress - 0.16) / 0.65));
        const totalCards = serviceCards.length;
        const rawIdx = Math.floor(normalized * totalCards);
        const activeIdx = Math.min(totalCards - 1, Math.max(0, rawIdx));
        const subProgress = (normalized * totalCards) - activeIdx;

        serviceCards.forEach((card, idx) => {
          const isActive = idx === activeIdx;
          card.classList.toggle('card-active', isActive);
          const fill = card.querySelector('.spotlight-bar-fill');
          if (fill) {
            if (idx < activeIdx) {
              fill.style.transform = 'scaleX(1)';
            } else if (idx === activeIdx) {
              fill.style.transform = `scaleX(${Math.max(0, Math.min(1, subProgress))})`;
            } else {
              fill.style.transform = 'scaleX(0)';
            }
          }
        });

        hudDots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIdx);
        });

        if (hudCounter) {
          hudCounter.textContent = `0${activeIdx + 1} / 0${totalCards}`;
        }
      }
    }

    // 4. Phase 3: Climax CTA & Smooth Bridge to About Us (82% - 100%)
    if (ctaBlock) {
      if (progress < 0.82) {
        ctaBlock.style.opacity = '0';
        ctaBlock.style.visibility = 'hidden';
        ctaBlock.style.transform = 'translateY(35px) scale(0.96)';
      } else if (progress >= 0.82 && progress <= 0.88) {
        const p = (progress - 0.82) / 0.06;
        ctaBlock.style.opacity = p.toFixed(3);
        ctaBlock.style.visibility = 'visible';
        ctaBlock.style.transform = `translateY(${(1 - p) * 35}px) scale(${0.96 + p * 0.04})`;
      } else {
        ctaBlock.style.opacity = '1';
        ctaBlock.style.visibility = 'visible';
        ctaBlock.style.transform = 'translateY(0) scale(1)';
      }
    }
  }

  // Smooth Scroll Jump to Manifesto
  if (manifestoJumpBtn) {
    manifestoJumpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const manifesto = document.getElementById('manifesto-stage');
      if (manifesto) {
        manifesto.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Master GSAP ScrollTrigger for Hero Canvas Scrubbing
  ScrollTrigger.create({
    trigger: heroStage,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.35,
    onUpdate: (self) => {
      const p = Math.max(0, Math.min(1, self.progress));
      targetFrameIndex = p * (TOTAL_FRAMES - 1);
      applyChoreography(p);
    }
  });

  // Initial render at progress 0
  applyChoreography(0);
}

