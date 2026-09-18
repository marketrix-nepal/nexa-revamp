/**
 * Navbar Component
 * Features architectural fixed layout, crisp logo, hub status,
 * navigation links, mobile drawer, and consultation trigger.
 */

export function renderNavbar() {
  return `
    <header id="navbar">
      <div class="container-wide nav-inner">
        <!-- Brand Lockup -->
        <a href="#hero-stage" class="nav-brand" aria-label="NEXA GROWTH Home">
          <img 
            src="/logo.png" 
            alt="NEXA GROWTH" 
            class="nav-logo-img" 
            width="218" 
            height="78"
            loading="eager"
          />
        </a>

        <!-- Navigation Links -->
        <nav aria-label="Primary Navigation">
          <ul class="nav-links">
            <li><a href="#manifesto-stage" class="nav-link">Overview</a></li>
            <li><a href="#methodology-stage" class="nav-link">Methodology</a></li>
            <li><a href="#disciplines-stage" class="nav-link">8 Pillars</a></li>
            <li><a href="#dossiers-stage" class="nav-link">Interventions</a></li>
            <li><a href="#training-stage" class="nav-link">Training</a></li>
            <li><a href="#ideas-lab-stage" class="nav-link">Insights</a></li>
            <li><a href="#concierge-stage" class="nav-link">Contact</a></li>
          </ul>
        </nav>

        <!-- Right Actions -->
        <div class="nav-actions">
          <a href="#concierge-stage" class="btn btn-primary btn-sm nav-cta-desktop">
            <span>Start a Project</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <a href="#concierge-stage" class="nav-cta-mobile" aria-label="Start Inquiry">
            <span>Inquire</span>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <!-- Mobile Toggle -->
          <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Toggle Menu" aria-expanded="false">
            <span class="toggle-bar"></span>
            <span class="toggle-bar"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Drawer (Sleek Spatial Drawer) -->
      <div class="mobile-drawer" id="mobile-drawer" aria-label="Mobile Navigation">
        <div class="mobile-drawer-header">
          <span class="drawer-status-dot"></span>
          <span class="drawer-status-text">AUCKLAND HQ · SINGAPORE HUB · ACTIVE</span>
        </div>

        <nav class="mobile-drawer-nav">
          <ul class="mobile-nav-list">
            <li>
              <a href="#manifesto-stage" class="mobile-nav-link">
                <span class="drawer-title">Overview</span>
                <span class="drawer-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="#methodology-stage" class="mobile-nav-link">
                <span class="drawer-title">Methodology</span>
                <span class="drawer-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="#disciplines-stage" class="mobile-nav-link">
                <span class="drawer-title">8 Service Pillars</span>
                <span class="drawer-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="#dossiers-stage" class="mobile-nav-link">
                <span class="drawer-title">Case Interventions</span>
                <span class="drawer-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="#training-stage" class="mobile-nav-link">
                <span class="drawer-title">Executive Training</span>
                <span class="drawer-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="#ideas-lab-stage" class="mobile-nav-link">
                <span class="drawer-title">Insights Lab</span>
                <span class="drawer-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="#concierge-stage" class="mobile-nav-link">
                <span class="drawer-title">Contact & Scoping</span>
                <span class="drawer-arrow">→</span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="mobile-drawer-footer">
          <a href="#concierge-stage" class="btn btn-primary drawer-action-btn">
            <span>Start a Project →</span>
          </a>
          <div class="drawer-quick-actions">
            <a href="mailto:nexaafricadigital@gmail.com" class="drawer-quick-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>Email Desk</span>
            </a>
            <a href="tel:+64210000000" class="drawer-quick-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Direct Call</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

export function initNavbarEvents() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.classList.toggle('is-active', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        if (window.lenis) window.lenis.stop();
        document.body.classList.add('nav-drawer-open');
      } else {
        if (window.lenis) window.lenis.start();
        document.body.classList.remove('nav-drawer-open');
      }
    });

    // Close drawer on link click
    const mobileLinks = drawer.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', false);
        document.body.classList.remove('nav-drawer-open');
        if (window.lenis) window.lenis.start();
      });
    });
  }

  // Smooth anchor navigation with generous offset to prevent navbar clipping
  const allNavAnchors = document.querySelectorAll('a[href^="#"]');
  allNavAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        if (window.lenis) {
          window.lenis.scrollTo(targetEl, { offset: -96, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
