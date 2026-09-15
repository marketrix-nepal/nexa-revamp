/**
 * Hero Component (Act 1: The Overture)
 * 100vh Pinned Stage with live atomic clocks, kinetic headline,
 * executive synthesis, and dual CTAs.
 */

export function renderHero() {
  return `
    <section id="hero-stage" class="section section-full">
      <div class="container-wide">
        <!-- Telemetry Status Bar with Atomic Clocks -->
        <div class="hero-telemetry-bar">
          <div class="badge badge-crimson">
            <span class="pulse-node"></span>
            <span>STRATEGIC CONVERGENCE DESK</span>
          </div>

          <div class="atomic-clocks-wrapper" id="atomic-clocks-container">
            <div class="atomic-clock-item">
              <span>🇸🇬 Singapore</span>
              <span class="clock-time" id="clock-singapore">--:--:-- SGT</span>
            </div>
            <div class="atomic-clock-item">
              <span>🇳🇿 New Zealand</span>
              <span class="clock-time" id="clock-newzealand">--:--:-- NZST</span>
            </div>
          </div>
        </div>

        <!-- Sub-Label Hierarchy -->
        <div class="hero-sublabel">
          THE STRATEGIC CONVERGENCE
        </div>

        <!-- Master Kinetic Headline -->
        <h1 class="hero-main-title">
          <span class="hero-title-gradient">We Turn Ideas</span><br/>
          <span class="hero-title-accent">Into Growth.</span>
        </h1>

        <!-- Strategic Disciplines Strip -->
        <div class="hero-disciplines-strip">
          <span class="hero-discipline-tag">Strategy</span>
          <span class="hero-discipline-tag">Story</span>
          <span class="hero-discipline-tag">Copywriting</span>
          <span class="hero-discipline-tag">Technology</span>
          <span class="hero-discipline-tag">AI Automation</span>
          <span class="hero-discipline-tag">Ideas Lab</span>
        </div>

        <!-- Lead Executive Synthesis -->
        <p class="hero-executive-lead">
          We engineer defensible market positioning, hypnotic narrative architecture, bespoke digital platforms, and autonomous intelligence systems—turning raw ambition into compounding enterprise equity.
        </p>

        <!-- Primary CTA Array (Strict Anti-Pill Mandate: 6px) -->
        <div class="hero-cta-group">
          <a href="#concierge-stage" class="btn btn-primary btn-lg">
            <span>Initiate Consultation</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <a href="#disciplines-stage" class="btn btn-ghost btn-lg">
            <span>Explore Disciplines</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 3V11M7 11L10.5 7.5M7 11L3.5 7.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `;
}

/**
 * Live microsecond-synchronized atomic clocks for Singapore and New Zealand
 */
export function initAtomicClocks() {
  const sgClockEl = document.getElementById('clock-singapore');
  const nzClockEl = document.getElementById('clock-newzealand');

  if (!sgClockEl || !nzClockEl) return;

  const sgFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Singapore',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const nzFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Pacific/Auckland',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  function updateClocks() {
    const now = new Date();
    sgClockEl.textContent = `${sgFormatter.format(now)} SGT`;
    nzClockEl.textContent = `${nzFormatter.format(now)} NZST`;
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}
