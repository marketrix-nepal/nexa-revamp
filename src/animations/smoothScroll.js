import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initSmoothScroll() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.35, // Responsive sweet spot: eliminates drag while maintaining high-end cushioning
    easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic ease-out for lively yet buttery motion
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.72, // Middle ground between 0.82 (fast) and 0.58 (slow)
    touchMultiplier: 1.15,
    infinite: false
  });

  // Synchronize Lenis scroll with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Expose globally for modal lock / scroll-to operations
  window.lenis = lenisInstance;

  return lenisInstance;
}

export function scrollToTarget(target, options = {}) {
  if (!lenisInstance) return;
  lenisInstance.scrollTo(target, {
    offset: -80,
    duration: 1.4,
    ...options
  });
}
