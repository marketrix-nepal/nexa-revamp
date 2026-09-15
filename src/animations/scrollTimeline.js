import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sceneState } from '../webgl/scene.js';

gsap.registerPlugin(ScrollTrigger);

export function initScrollTimeline() {
  // Ensure DOM is ready
  const heroStage = document.getElementById('hero-stage');
  const manifestoStage = document.getElementById('manifesto-stage');
  const disciplinesStage = document.getElementById('disciplines-stage');
  const dossiersStage = document.getElementById('dossiers-stage');
  const labStage = document.getElementById('ideas-lab-stage');
  const conciergeStage = document.getElementById('concierge-stage');

  if (!heroStage) return;

  // 1. ACT 1: HERO PIN & AWAKENING TIMELINE
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: heroStage,
      start: 'top top',
      end: '+=100%',
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });

  heroTl.to('.hero-main-title', {
    scale: 1.05,
    letterSpacing: '0.01em',
    opacity: 0.15,
    y: -40,
    ease: 'power2.out'
  }, 0);

  heroTl.to('.hero-telemetry-bar, .hero-executive-lead, .hero-cta-group, .hero-sublabel, .hero-disciplines-strip', {
    opacity: 0,
    y: -30,
    stagger: 0.05,
    ease: 'power2.out'
  }, 0);

  heroTl.to(sceneState.cameraPos, {
    z: 7.2,
    y: 0.2,
    ease: 'power1.inOut'
  }, 0);

  heroTl.to(sceneState.sculptureRot, {
    y: '+=1.2',
    x: 0.4,
    ease: 'power1.inOut'
  }, 0);

  // 2. ACT 2: MANIFESTO WORD-ILLUMINATION SCRUB TIMELINE
  if (manifestoStage) {
    const words = manifestoStage.querySelectorAll('.scrub-word');
    
    const manifestoTl = gsap.timeline({
      scrollTrigger: {
        trigger: manifestoStage,
        start: 'top 20%',
        end: 'bottom 40%',
        scrub: 0.8
      }
    });

    // Word by word progressive illumination scrub
    manifestoTl.to(words, {
      opacity: 1,
      color: '#FFFFFF',
      stagger: 0.05,
      ease: 'power1.inOut'
    }, 0);

    // Dynamic 3D sculpture transit to the left side
    manifestoTl.to(sceneState.sculpturePos, {
      x: -2.2,
      y: 0.2,
      z: -0.5,
      ease: 'power1.inOut'
    }, 0);

    manifestoTl.to(sceneState.sculptureRot, {
      y: '+=1.8',
      x: -0.3,
      ease: 'power1.inOut'
    }, 0);
  }

  // 3. ACT 3: DISCIPLINE ENGINE (300vh Pinned Stage)
  if (disciplinesStage) {
    const pinContainer = disciplinesStage.querySelector('.disciplines-pinned-container');
    
    if (pinContainer) {
      ScrollTrigger.create({
        trigger: disciplinesStage,
        start: 'top top',
        end: '+=250%',
        pin: pinContainer,
        anticipatePin: 1,
        scrub: 0.6,
        onUpdate: (self) => {
          // Progress from 0 to 1 maps to 6 discipline blades (indices 0 to 5)
          const totalDisciplines = 6;
          const index = Math.min(
            totalDisciplines - 1,
            Math.floor(self.progress * totalDisciplines)
          );
          if (window.setActiveDisciplineIndex) {
            window.setActiveDisciplineIndex(index, false);
          }

          // Camera glide during discipline scrub
          sceneState.sculpturePos.x = 2.4 - self.progress * 0.8;
          sceneState.sculptureRot.y = 1.8 + self.progress * 2.5;
        }
      });
    }
  }

  // 4. ACT 4: TRANSFORMATION DOSSIERS
  if (dossiersStage) {
    const dossierCards = dossiersStage.querySelectorAll('.dossier-card');
    dossierCards.forEach((card, idx) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    });

    ScrollTrigger.create({
      trigger: dossiersStage,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1,
      onUpdate: (self) => {
        sceneState.sculpturePos.z = -1.5 - self.progress * 2.5;
        sceneState.sculptureScale = 1.0 - self.progress * 0.2;
        sceneState.bloomStrength = 0.38 + self.progress * 0.15;
      }
    });
  }

  // 5. ACT 5: SPECULATIVE R&D LAB
  if (labStage) {
    const labCards = labStage.querySelectorAll('.lab-card');
    gsap.from(labCards, {
      scrollTrigger: {
        trigger: labStage,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out'
    });

    ScrollTrigger.create({
      trigger: labStage,
      start: 'top 50%',
      end: 'bottom 50%',
      scrub: 1,
      onUpdate: (self) => {
        sceneState.sculpturePos.x = -1.8 + self.progress * 3.6;
        sceneState.rimLightIntensity = 8.0 + Math.sin(self.progress * Math.PI) * 4.0;
      }
    });
  }

  // 6. ACT 6: STRATEGIC ENGAGEMENT CONCIERGE
  if (conciergeStage) {
    ScrollTrigger.create({
      trigger: conciergeStage,
      start: 'top 70%',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        sceneState.cameraPos.y = -self.progress * 0.8;
        sceneState.sculptureScale = 0.85;
        sceneState.sculpturePos.y = -0.4;
      }
    });
  }

  // Navbar scroll background transition
  const navbar = document.getElementById('navbar');
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'nav-scrolled', targets: navbar }
    });
  }
}
