import './styles/main.css';

import { initSmoothScroll } from './animations/smoothScroll.js';
import { initScrollTimeline } from './animations/scrollTimeline.js';
import { initCursor } from './animations/cursor.js';

import { renderNavbar, initNavbarEvents } from './components/navbar.js';
import { renderHero, initAtomicClocks } from './components/hero.js';
import { renderManifesto } from './components/manifesto.js';
import { renderDisciplines, initDisciplinesEvents } from './components/disciplines.js';
import { renderDossiers, initDossierEvents } from './components/dossiers.js';
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

    <!-- Persistent Ambient 3D Neural Monolith Background (Video Last Frame) -->
    <div class="site-ambient-bg" aria-hidden="true"></div>
    <div class="site-ambient-scrim" aria-hidden="true"></div>

    <!-- Navigation Header -->
    ${renderNavbar()}

    <!-- Main Content Flow -->
    <main id="app-content">
      ${renderHero()}
      ${renderManifesto()}
      ${renderDisciplines()}
      ${renderDossiers()}
      ${renderIdeasLab()}
      ${renderConcierge()}
      ${renderFooter()}
    </main>

    <!-- Universal Progressive Disclosure Modal Reader -->
    ${renderDetailModalContainer()}
  `;

  // 1. Initialize smooth inertia scrolling (Lenis)
  initSmoothScroll();

  // 3. Initialize 6-Act choreographed GSAP ScrollTrigger timeline
  initScrollTimeline();

  // 4. Initialize live microsecond atomic clocks (SGT / NZST)
  initAtomicClocks();

  // 5. Initialize custom magnetic difference cursor
  initCursor();

  // 6. Initialize interactive component event listeners
  initNavbarEvents();
  initDisciplinesEvents();
  initDossierEvents();
  initIdeasLabEvents();
  initConciergeEvents();
  initDetailModalEvents();
  initFooterEvents();

  console.log('[NEXA GROWTH] Strategic Digital Platform Initialized Successfully.');
}

// Boot application upon DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
