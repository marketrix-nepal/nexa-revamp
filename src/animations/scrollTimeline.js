import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sceneState } from '../webgl/scene.js';

gsap.registerPlugin(ScrollTrigger);

export function initScrollTimeline() {
  const heroStage = document.getElementById('hero-stage');
  const manifestoStage = document.getElementById('manifesto-stage');
  const disciplinesStage = document.getElementById('disciplines-stage');
  const dossiersStage = document.getElementById('dossiers-stage');
  const labStage = document.getElementById('ideas-lab-stage');
  const conciergeStage = document.getElementById('concierge-stage');

  if (!heroStage) return;

  // 1. HERO SCROLL SPLIT & DRIFT (Natural, unpinned fluid scroll)
  const heroTitleGradient = heroStage.querySelector('.hero-title-gradient');
  const heroTitleAccent = heroStage.querySelector('.hero-title-accent');

  if (heroTitleGradient && heroTitleAccent) {
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroStage,
        start: 'top top',
        end: 'bottom 20%',
        scrub: 0.6
      }
    });

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const splitDistance = isMobile ? 22 : 45;

    // "We Turn Ideas" drifts left, "Into Growth." drifts right as user scrolls down
    heroTl.to(heroTitleGradient, {
      x: -splitDistance,
      opacity: 0.3,
      ease: 'power1.out'
    }, 0);

    heroTl.to(heroTitleAccent, {
      x: splitDistance,
      opacity: 0.3,
      ease: 'power1.out'
    }, 0);

    heroTl.to('.hero-telemetry-bar, .hero-sublabel, .hero-disciplines-strip, .hero-executive-lead, .hero-cta-group', {
      opacity: 0.1,
      y: -25,
      stagger: 0.03,
      ease: 'power1.out'
    }, 0);

    // 3D Glass Sculpture fluid camera response
    heroTl.to(sceneState.cameraPos, {
      z: 7.0,
      y: 0.3,
      ease: 'power1.inOut'
    }, 0);

    heroTl.to(sceneState.sculptureRot, {
      y: '+=1.0',
      x: 0.3,
      ease: 'power1.inOut'
    }, 0);
  }

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

    // 3D Sculpture moves subtly to left flank
    ScrollTrigger.create({
      trigger: manifestoStage,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 1,
      onUpdate: (self) => {
        sceneState.sculpturePos.x = -1.8 * self.progress;
        sceneState.sculptureRot.y = 1.0 + self.progress * 1.5;
      }
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

    ScrollTrigger.create({
      trigger: disciplinesStage,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1,
      onUpdate: (self) => {
        sceneState.sculpturePos.x = 1.8 - self.progress * 0.8;
        sceneState.sculptureRot.y = 2.5 + self.progress * 1.8;
      }
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

    ScrollTrigger.create({
      trigger: dossiersStage,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1,
      onUpdate: (self) => {
        sceneState.sculpturePos.z = -1.0 - self.progress * 2.0;
        sceneState.sculptureScale = 1.0 - self.progress * 0.15;
      }
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
