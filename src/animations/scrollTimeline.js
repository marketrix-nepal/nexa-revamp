import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollTimeline() {
  const heroStage = document.getElementById('hero-stage');
  const manifestoStage = document.getElementById('manifesto-stage');
  const disciplinesStage = document.getElementById('disciplines-stage');
  const dossiersStage = document.getElementById('dossiers-stage');
  const labStage = document.getElementById('ideas-lab-stage');
  const conciergeStage = document.getElementById('concierge-stage');

  if (!heroStage) return;

  // 1. KINETIC NEURAL MONOLITH: 3D VIDEO SCROLL SCRUBBING & CHOREOGRAPHY
  initHeroVideoScrubbing(heroStage);

  // 2. ABOUT US SECTION REVEAL (Clean crossfade & card stagger)
  if (manifestoStage) {
    gsap.from(manifestoStage.querySelectorAll('.section-header, .value-pillar-card, .hub-ledger-card'), {
      scrollTrigger: {
        trigger: manifestoStage,
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
 * High-performance, lerped video scrubbing and 3-phase choreographed story engine
 */
function initHeroVideoScrubbing(heroStage) {
  const video = heroStage.querySelector('#hero-monolith-video');
  const loader = heroStage.querySelector('#hero-video-loader');
  const scrubBar = heroStage.querySelector('#hero-scrub-bar');
  const introBlock = heroStage.querySelector('#hero-phase-intro');
  const servicesBlock = heroStage.querySelector('#hero-phase-services');
  const ctaBlock = heroStage.querySelector('#hero-phase-cta');
  const serviceCards = heroStage.querySelectorAll('.service-spotlight-card');
  const hudDots = heroStage.querySelectorAll('.hud-dot');
  const hudCounter = heroStage.querySelector('#services-hud-counter');
  const manifestoJumpBtn = heroStage.querySelector('#hero-manifesto-jump-btn');

  let videoDuration = 10.0;
  let isVideoReady = false;

  function dismissLoader() {
    if (loader && !loader.classList.contains('loader-dismissed')) {
      loader.classList.add('loader-dismissed');
      setTimeout(() => {
        if (loader && loader.parentNode) loader.remove();
      }, 700);
    }
  }

  if (video) {
    const handleLoaded = () => {
      if (isVideoReady) return;
      isVideoReady = true;
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        videoDuration = video.duration;
      }
      try {
        video.currentTime = 0.001;
      } catch (e) {
        // Handled silently for browser auto-seek policies
      }
      dismissLoader();
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 2) {
      handleLoaded();
    } else {
      video.addEventListener('loadedmetadata', handleLoaded, { once: true });
      video.addEventListener('canplay', handleLoaded, { once: true });
    }

    // Fail-safe timeout
    setTimeout(dismissLoader, 2000);
  } else {
    dismissLoader();
  }

  // Smooth lerped video scrubbing loop with non-blocking seek queue
  let targetVideoTime = 0;
  let currentVideoTime = 0;
  let isSeeking = false;
  let pendingTime = null;
  let scrubRafId = null;

  function requestVideoSeek(time) {
    if (!video || !isVideoReady || video.readyState < 2) return;
    if (isSeeking) {
      pendingTime = time;
      return;
    }
    isSeeking = true;
    try {
      video.currentTime = Math.max(0.001, Math.min(videoDuration - 0.001, time));
    } catch (e) {
      isSeeking = false;
    }
  }

  if (video) {
    video.addEventListener('seeked', () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const nextTime = pendingTime;
        pendingTime = null;
        requestVideoSeek(nextTime);
      }
    });
  }

  function loopVideoScrub() {
    if (video && isVideoReady && video.readyState >= 2) {
      const diff = targetVideoTime - currentVideoTime;
      if (Math.abs(diff) > 0.002) {
        currentVideoTime += diff * 0.22; // Snappier response while maintaining silky interpolation
        requestVideoSeek(currentVideoTime);
      }
    }
    scrubRafId = requestAnimationFrame(loopVideoScrub);
  }
  scrubRafId = requestAnimationFrame(loopVideoScrub);

  // Choreography Phase Engine (calibrated for 780vh track)
  function applyChoreography(progress) {
    // 1. Progress Bar
    if (scrubBar) {
      scrubBar.style.transform = `scaleX(${progress})`;
    }

    // 2. Phase 1: Intro (0% - 14%)
    if (introBlock) {
      if (progress <= 0.05) {
        introBlock.style.opacity = '1';
        introBlock.style.visibility = 'visible';
        introBlock.style.transform = 'translateY(0) scale(1)';
      } else if (progress > 0.05 && progress <= 0.14) {
        const p = (progress - 0.05) / 0.09;
        introBlock.style.opacity = Math.max(0, 1 - p).toFixed(3);
        introBlock.style.transform = `translateY(${-p * 35}px) scale(${1 - p * 0.05})`;
        introBlock.style.visibility = 'visible';
      } else {
        introBlock.style.opacity = '0';
        introBlock.style.visibility = 'hidden';
        introBlock.style.transform = 'translateY(-35px) scale(0.95)';
      }
    }

    // 3. Phase 2: 6 Core Services (14% - 84%)
    if (servicesBlock) {
      if (progress < 0.12 || progress > 0.85) {
        servicesBlock.style.opacity = '0';
        servicesBlock.style.visibility = 'hidden';
        servicesBlock.style.transform = 'translateY(25px)';
      } else if (progress >= 0.12 && progress <= 0.16) {
        const enterP = (progress - 0.12) / 0.04;
        servicesBlock.style.opacity = enterP.toFixed(3);
        servicesBlock.style.visibility = 'visible';
        servicesBlock.style.transform = `translateY(${(1 - enterP) * 25}px)`;
      } else if (progress >= 0.81 && progress <= 0.85) {
        const exitP = (progress - 0.81) / 0.04;
        servicesBlock.style.opacity = Math.max(0, 1 - exitP).toFixed(3);
        servicesBlock.style.visibility = 'visible';
        servicesBlock.style.transform = `translateY(${-exitP * 25}px)`;
      } else {
        servicesBlock.style.opacity = '1';
        servicesBlock.style.visibility = 'visible';
        servicesBlock.style.transform = 'translateY(0)';
      }

      if (progress >= 0.12 && progress <= 0.85 && serviceCards.length > 0) {
        const normalized = Math.max(0, Math.min(0.999, (progress - 0.15) / 0.66));
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

    // 4. Phase 3: Climax CTA (84% - 100%)
    if (ctaBlock) {
      if (progress < 0.84) {
        ctaBlock.style.opacity = '0';
        ctaBlock.style.visibility = 'hidden';
        ctaBlock.style.transform = 'translateY(35px) scale(0.96)';
      } else if (progress >= 0.84 && progress <= 0.89) {
        const p = (progress - 0.84) / 0.05;
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

  // Master GSAP ScrollTrigger for Hero Video Scrubbing
  ScrollTrigger.create({
    trigger: heroStage,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.4,
    onUpdate: (self) => {
      const p = Math.max(0, Math.min(1, self.progress));
      targetVideoTime = p * (video && video.duration && !isNaN(video.duration) ? video.duration : videoDuration);
      applyChoreography(p);
    }
  });

  // Initial render at progress 0
  applyChoreography(0);
}

