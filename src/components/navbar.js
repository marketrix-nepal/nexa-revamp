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
          <a href="/admin.html" class="btn btn-ghost btn-sm nav-admin-btn" title="Internal Operations Portal">
            <span class="pulse-indicator-dot"></span>
            <span>Console</span>
          </a>

          <a href="#concierge-stage" class="btn btn-primary btn-sm">
            <span>Start a Project</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <!-- Mobile Toggle -->
          <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Toggle Menu" aria-expanded="false">
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Drawer -->
      <div class="mobile-drawer" id="mobile-drawer">
        <ul class="mobile-nav-list">
          <li><a href="#manifesto-stage" class="mobile-nav-link">Company Overview & Vision</a></li>
          <li><a href="#methodology-stage" class="mobile-nav-link">Transformation Methodology</a></li>
          <li><a href="#disciplines-stage" class="mobile-nav-link">8 Core Service Pillars</a></li>
          <li><a href="#dossiers-stage" class="mobile-nav-link">Intervention Case Studies</a></li>
          <li><a href="#training-stage" class="mobile-nav-link">Training & Consulting</a></li>
          <li><a href="#ideas-lab-stage" class="mobile-nav-link">Insights & Guides</a></li>
          <li><a href="#concierge-stage" class="mobile-nav-link">Contact & Inquiries</a></li>
          <li><a href="/admin.html" class="mobile-nav-link" style="color: var(--amber);">Internal Operations Console →</a></li>
        </ul>

        <div style="padding-top: 2rem; border-top: 1px solid var(--border-subtle);">
          <p style="font-family: var(--font-body); font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            Auckland, New Zealand (HQ) · Singapore (Hub)
          </p>
          <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--crimson); margin-bottom: 1.25rem;">
            nexaafricadigital@gmail.com
          </p>
          <a href="#concierge-stage" class="btn btn-primary" style="width: 100%;">
            <span>Start a Project →</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

export function initNavbarEvents() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      if (window.lenis) window.lenis.stop();
    } else {
      if (window.lenis) window.lenis.start();
    }
  });

  // Close drawer on link click
  const mobileLinks = drawer.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', false);
      if (window.lenis) window.lenis.start();
    });
  });
}
