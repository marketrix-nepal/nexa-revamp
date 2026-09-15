/**
 * Manifesto Component (Act 2: The Word-Illumination Scrub)
 * 150vh scroll scrub stage where each word illuminates as the user scrolls,
 * anchored by the bi-coastal institutional ledger.
 */

export function renderManifesto() {
  const manifestoRawText = `Traditional agencies construct ephemeral marketing campaigns. Pure software houses write code oblivious to market psychology. Commoditized AI shops assemble plastic prompts. NEXA GROWTH operates at the irreversible convergence of human strategic intuition and autonomous algorithmic velocity. We build companies that cannot be commoditized, cloned, or out-positioned.`;

  // Split words into spans for GSAP scrub illumination
  const wordsHtml = manifestoRawText
    .split(/\s+/)
    .map((word) => {
      // Highlight brand name or key words with accent class
      const isAccent = word.includes('NEXA') || word.includes('GROWTH');
      return `<span class="scrub-word ${isAccent ? 'accent-target' : ''}">${word}</span>`;
    })
    .join(' ');

  return `
    <section id="manifesto-stage" class="section">
      <div class="container-wide">
        <!-- Manifesto Header -->
        <div class="section-label">
          02 // THE MANIFESTO
        </div>

        <!-- Word Illumination Scrub Container -->
        <div class="manifesto-prose" id="manifesto-scrub-target" aria-label="NEXA Manifesto">
          ${wordsHtml}
        </div>

        <!-- Bi-Coastal Dual-Hub Institutional Ledger -->
        <div class="hub-ledger-grid">
          <!-- Singapore Hub -->
          <div class="hub-ledger-card">
            <div class="hub-card-header">
              <div class="hub-city-name">
                <span class="pulse-node"></span>
                <span>Singapore Hub</span>
              </div>
              <div class="badge badge-crimson">GATEWAY DESK</div>
            </div>
            <div class="hub-coord">1.3521° N, 103.8198° E · UTC+8</div>
            <p class="hub-thesis" style="margin-top: 1rem;">
              APAC Institutional Capital Conviction & Sovereign Market Liquidity. Direct connectivity to global syndicates, family offices, and multinational commercial corridors.
            </p>
          </div>

          <!-- New Zealand Hub -->
          <div class="hub-ledger-card">
            <div class="hub-card-header">
              <div class="hub-city-name">
                <span class="pulse-node pulse-node-amber"></span>
                <span>New Zealand Hub</span>
              </div>
              <div class="badge badge-amber">FRONTIER DESK</div>
            </div>
            <div class="hub-coord">-36.8485° S, 174.7633° E · UTC+12</div>
            <p class="hub-thesis" style="margin-top: 1rem;">
              Pacific Frontier Innovation & Narrative Architecture. Uncompromised deep-tech originality, clean marine technology research, and contrarian commercial incubation.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
