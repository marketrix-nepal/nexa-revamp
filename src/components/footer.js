import { COMPANY_INFO } from '../data/companyData.js';

/**
 * Footer Component
 * Clean, modern footer with official global headquarters, Singapore hub,
 * verified direct email, site map, and internal console access.
 */

export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer id="footer-stage">
      <div class="container-wide">
        <!-- Top Tier -->
        <div class="footer-top">
          <!-- Brand Column -->
          <div class="footer-brand">
            <a href="#hero-stage" aria-label="NEXA GROWTH Home">
              <img 
                src="/logo.png" 
                alt="NEXA GROWTH" 
                class="footer-logo-img" 
                width="220" 
                height="78"
                loading="lazy"
              />
            </a>
            <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin-top: 1rem; max-width: 440px;">
              ${COMPANY_INFO.tagline}
            </p>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem; max-width: 440px;">
              A strategy, technology and growth company operating at the intersection of business strategy, creative direction, AI automation, CRM, and performance analytics.
            </p>
          </div>

          <!-- Studio Locations & Inquiries -->
          <div class="footer-coords-strip">
            <div class="footer-coord-block">
              <h5>AUCKLAND HEADQUARTERS</h5>
              <p style="font-weight: 500; color: #FFFFFF;">${COMPANY_INFO.locations.headquarters.city}, ${COMPANY_INFO.locations.headquarters.country}</p>
              <p style="font-size: 0.8rem; color: var(--text-muted);">${COMPANY_INFO.locations.headquarters.address}</p>
              <p style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--amber); margin-top: 0.25rem;">Timezone: ${COMPANY_INFO.locations.headquarters.tzAbbr} (${COMPANY_INFO.locations.headquarters.utcOffset})</p>
            </div>

            <div class="footer-coord-block">
              <h5>SINGAPORE HUB</h5>
              <p style="font-weight: 500; color: #FFFFFF;">${COMPANY_INFO.locations.hub.city}</p>
              <p style="font-size: 0.8rem; color: var(--text-muted);">${COMPANY_INFO.locations.hub.address}</p>
              <p style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--crimson); margin-top: 0.25rem;">Timezone: ${COMPANY_INFO.locations.hub.tzAbbr} (${COMPANY_INFO.locations.hub.utcOffset})</p>
            </div>

            <div class="footer-coord-block">
              <h5>DIRECT INQUIRIES</h5>
              <p style="font-weight: 500; color: #FFFFFF;">
                <a href="mailto:${COMPANY_INFO.contact.email}" style="color: #FFFFFF; text-decoration: underline;">
                  ${COMPANY_INFO.contact.email}
                </a>
              </p>
              <p style="color: var(--text-muted); margin-top: 0.25rem;">Response time: Within 24 hours</p>
              <div style="margin-top: 0.75rem;">
                <a href="/admin.html" class="footer-console-link">
                  <span>Internal Operations Console →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Tier: Legal & Back to Top -->
        <div class="footer-bottom">
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            © ${currentYear} NEXA GROWTH. All rights reserved. Transforming ideas into brands, digital solutions and growth systems.
          </div>

          <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
            <a href="#manifesto-stage" style="color: var(--text-muted); font-size: 0.85rem;">Overview</a>
            <a href="#methodology-stage" style="color: var(--text-muted); font-size: 0.85rem;">Methodology</a>
            <a href="#disciplines-stage" style="color: var(--text-muted); font-size: 0.85rem;">8 Pillars</a>
            <a href="#dossiers-stage" style="color: var(--text-muted); font-size: 0.85rem;">Interventions</a>
            <a href="#training-stage" style="color: var(--text-muted); font-size: 0.85rem;">Training</a>
            <a href="#concierge-stage" style="color: var(--text-muted); font-size: 0.85rem;">Contact</a>
            <a href="#hero-stage" class="btn-ghost btn-sm" id="return-to-summit-btn" style="padding: 0.4rem 0.9rem;">
              <span>Back to Top ↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

export function initFooterEvents() {
  const returnBtn = document.getElementById('return-to-summit-btn');
  if (returnBtn) {
    returnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
