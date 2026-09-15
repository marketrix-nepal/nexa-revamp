/**
 * Footer Component
 * Clean, modern footer with studio locations, contact links,
 * and back-to-top trigger.
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
            <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin-top: 1rem; max-width: 400px;">
              An international Creative Strategy & Innovation Studio operating across Singapore and New Zealand. We turn ambitious ideas into measurable business growth.
            </p>
          </div>

          <!-- Studio Locations & Inquiries -->
          <div class="footer-coords-strip">
            <div class="footer-coord-block">
              <h5>SINGAPORE HUB</h5>
              <p style="font-weight: 500; color: #FFFFFF;">Marina Bay Financial Centre</p>
              <p style="color: var(--crimson); margin-top: 0.25rem;">Timezone: SGT (UTC+8)</p>
            </div>

            <div class="footer-coord-block">
              <h5>NEW ZEALAND STUDIO</h5>
              <p style="font-weight: 500; color: #FFFFFF;">Britomart, Auckland Central</p>
              <p style="color: var(--amber); margin-top: 0.25rem;">Timezone: NZST (UTC+12)</p>
            </div>

            <div class="footer-coord-block">
              <h5>DIRECT INQUIRIES</h5>
              <p style="font-weight: 500; color: #FFFFFF;">hello@nexagrowth.com</p>
              <p style="color: var(--text-muted); margin-top: 0.25rem;">Response time: Within 24 hours</p>
            </div>
          </div>
        </div>

        <!-- Bottom Tier: Legal & Back to Top -->
        <div class="footer-bottom">
          <div>
            © ${currentYear} NEXA GROWTH. All rights reserved.
          </div>

          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <a href="#manifesto-stage" style="color: var(--text-muted); font-size: 0.85rem;">About</a>
            <a href="#disciplines-stage" style="color: var(--text-muted); font-size: 0.85rem;">Services</a>
            <a href="#dossiers-stage" style="color: var(--text-muted); font-size: 0.85rem;">Case Studies</a>
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
