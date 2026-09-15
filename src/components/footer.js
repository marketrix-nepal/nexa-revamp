/**
 * Footer Component
 * Bi-coastal institutional coordinate ledger, high-res logo integration,
 * sitemap, and return-to-summit trigger.
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
            <a href="#hero-stage" aria-label="Return to Hero">
              <img 
                src="/logo.png" 
                alt="NEXA GROWTH" 
                class="footer-logo-img" 
                width="220" 
                height="78"
                loading="lazy"
              />
            </a>
            <p style="font-size: 0.94rem; line-height: 1.65; color: var(--text-secondary); margin-top: 1rem; max-width: 380px;">
              An international Creative Strategy & Innovation Company engineering defensible market positions, narrative architecture, and bespoke digital platforms.
            </p>
          </div>

          <!-- Bi-Coastal Coordinates Ledger -->
          <div class="footer-coords-strip">
            <div class="footer-coord-block">
              <h5>SINGAPORE GATEWAY</h5>
              <p>1.3521° N, 103.8198° E</p>
              <p style="margin-top: 0.25rem;">Marina Bay Financial Centre, Tower 2</p>
              <p style="color: var(--crimson); margin-top: 0.25rem;">UTC+08:00 · APAC Institutional Desk</p>
            </div>

            <div class="footer-coord-block">
              <h5>NEW ZEALAND FRONTIER</h5>
              <p>-36.8485° S, 174.7633° E</p>
              <p style="margin-top: 0.25rem;">Commercial Bay Tower, Customs St W</p>
              <p style="color: var(--amber); margin-top: 0.25rem;">UTC+12:00 · Pacific Innovation Desk</p>
            </div>

            <div class="footer-coord-block">
              <h5>STRATEGIC INQUIRIES</h5>
              <p>partner@nexagrowth.com</p>
              <p style="margin-top: 0.25rem;">Direct Partner SLA: 24 Hours</p>
              <p style="color: var(--text-muted); margin-top: 0.25rem;">Institutional NDA Standard</p>
            </div>
          </div>
        </div>

        <!-- Bottom Tier: Legal & Return to Summit -->
        <div class="footer-bottom">
          <div>
            © ${currentYear} NEXA GROWTH PTE. LTD. & NEXA INNOVATION NZ. ALL RIGHTS RESERVED.
          </div>

          <div style="display: flex; align-items: center; gap: 2rem;">
            <span>CONFIDENTIAL ADVISORY</span>
            <span>RESTRICTED ACCESS</span>
            <a href="#hero-stage" class="btn-ghost btn-sm" id="return-to-summit-btn" style="padding: 0.35rem 0.85rem;">
              <span>Return to Summit ↑</span>
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
        window.lenis.scrollTo(0, { duration: 1.6 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
