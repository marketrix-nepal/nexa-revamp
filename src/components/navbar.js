/**
 * Navbar Component
 * Features architectural fixed layout, crisp PNG logo, hub status,
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

        <!-- Hub Desk Status Telemetry -->
        <div class="nav-hub-indicator" title="Live Bi-Coastal Connectivity">
          <span class="pulse-node"></span>
          <span>SG · NZ ACTIVE</span>
        </div>

        <!-- Navigation Links -->
        <nav aria-label="Primary Navigation">
          <ul class="nav-links">
            <li><a href="#manifesto-stage" class="nav-link">About Us</a></li>
            <li><a href="#disciplines-stage" class="nav-link">Services</a></li>
            <li><a href="#dossiers-stage" class="nav-link">Case Studies</a></li>
            <li><a href="#ideas-lab-stage" class="nav-link">Insights</a></li>
            <li><a href="#concierge-stage" class="nav-link">Contact</a></li>
          </ul>
        </nav>

        <!-- Right Actions -->
        <div class="nav-actions">
          <a href="#concierge-stage" class="btn btn-primary btn-sm">
            <span>Get in Touch</span>
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
          <li><a href="#manifesto-stage" class="mobile-nav-link">About Us</a></li>
          <li><a href="#disciplines-stage" class="mobile-nav-link">Services</a></li>
          <li><a href="#dossiers-stage" class="mobile-nav-link">Case Studies</a></li>
          <li><a href="#ideas-lab-stage" class="mobile-nav-link">Insights</a></li>
          <li><a href="#concierge-stage" class="mobile-nav-link">Contact</a></li>
        </ul>

        <div style="padding-top: 2rem; border-top: 1px solid var(--border-subtle);">
          <p style="font-family: var(--font-body); font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            Singapore & New Zealand · Global Creative & Tech Studio
          </p>
          <a href="#concierge-stage" class="btn btn-primary" style="width: 100%;">
            <span>Get in Touch →</span>
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
