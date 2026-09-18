import './styles/main.css';

import { initSmoothScroll } from './animations/smoothScroll.js';
import { initScrollTimeline } from './animations/scrollTimeline.js';
import { initCursor } from './animations/cursor.js';

import { renderNavbar, initNavbarEvents } from './components/navbar.js';
import { renderHero, initAtomicClocks } from './components/hero.js';
import { renderManifesto, initManifestoEvents } from './components/manifesto.js';
import { renderMethodology, initMethodologyEvents } from './components/methodology.js';
import { renderDisciplines, initDisciplinesEvents } from './components/disciplines.js';
import { renderDossiers, initDossierEvents } from './components/dossiers.js';
import { renderTraining, initTrainingEvents } from './components/training.js';
import { renderIdeasLab, initIdeasLabEvents } from './components/ideasLab.js';
import { renderConcierge, initConciergeEvents } from './components/concierge.js';
import { renderDetailModalContainer, initDetailModalEvents } from './components/detailModal.js';
import { renderFooter, initFooterEvents } from './components/footer.js';

function bootstrapApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Render complete DOM architecture
  appContainer.innerHTML = `
    <!-- Film Grain Microscopic Overlay -->
    <div class="film-grain-overlay" aria-hidden="true"></div>

    <!-- Persistent Ambient 3D Neural Monolith Background -->
    <div class="site-ambient-bg" aria-hidden="true"></div>
    <div class="site-ambient-scrim" aria-hidden="true"></div>

    <!-- Navigation Header -->
    ${renderNavbar()}

    <!-- Main Content Flow -->
    <main id="app-content">
      ${renderHero()}
      ${renderManifesto()}
      ${renderMethodology()}
      ${renderDisciplines()}
      ${renderDossiers()}
      ${renderTraining()}
      ${renderIdeasLab()}
      ${renderConcierge()}
      ${renderFooter()}
    </main>

    <!-- Universal Progressive Disclosure Modal Reader -->
    ${renderDetailModalContainer()}
  `;

  // 1. Initialize smooth inertia scrolling (Lenis)
  initSmoothScroll();

  // 2. Initialize choreographed GSAP ScrollTrigger timeline
  initScrollTimeline();

  // 3. Initialize live microsecond atomic clocks (Auckland NZST / Singapore SGT)
  initAtomicClocks();

  // 4. Initialize custom magnetic cursor
  initCursor();

  // 5. Initialize interactive component event listeners
  initNavbarEvents();
  initManifestoEvents();
  initMethodologyEvents();
  initDisciplinesEvents();
  initDossierEvents();
  initTrainingEvents();
  initIdeasLabEvents();
  initConciergeEvents();
  initDetailModalEvents();
  initFooterEvents();

  console.log('[NEXA GROWTH] Strategic Digital Platform Initialized Successfully.');
}

// Live Edge Sync Listener from Website CMS Suite
window.addEventListener('nexa:cms-updated', () => {
  console.log('[NEXA Live Sync] Content update received from CMS Suite.');
  const disciplinesEl = document.getElementById('disciplines-stage');
  if (disciplinesEl) {
    const temp = document.createElement('div');
    temp.innerHTML = renderDisciplines();
    const newDisciplines = temp.firstElementChild;
    if (newDisciplines) {
      disciplinesEl.replaceWith(newDisciplines);
      initDisciplinesEvents();
    }
  }
});

// Boot application upon DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
