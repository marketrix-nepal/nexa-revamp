/**
 * Concierge Component (Act 6: Strategic Engagement Concierge)
 * Split stage with 3-step high-conviction scoping terminal on left
 * and senior partner access protocol on right.
 */

export function renderConcierge() {
  return `
    <section id="concierge-stage" class="section">
      <div class="container-wide">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">06 // STRATEGIC ENGAGEMENT CONCIERGE</div>
          <h2 class="section-title">
            Initiate Direct Partner Scoping.
          </h2>
          <p class="section-desc">
            We operate with a high-conviction, low-volume advisory model. Every brief is audited directly by senior strategy and deep-tech partners across Singapore and New Zealand.
          </p>
        </div>

        <!-- Split Terminal Grid -->
        <div class="grid-split-50">
          <!-- Left: Scoping Terminal Form -->
          <div class="concierge-form-box">
            <form id="strategic-brief-form" novalidate>
              <!-- Step 1: Engagement Vector -->
              <div class="concierge-step-block">
                <div class="concierge-step-label">01. ENGAGEMENT VECTOR</div>
                <div class="choice-button-group" id="vector-choice-group" role="radiogroup" aria-label="Engagement Vector">
                  <button type="button" class="choice-btn selected" data-value="Brand Strategy" role="radio" aria-checked="true">Brand Strategy</button>
                  <button type="button" class="choice-btn" data-value="Storytelling" role="radio" aria-checked="false">Storytelling</button>
                  <button type="button" class="choice-btn" data-value="Digital Platform" role="radio" aria-checked="false">Digital Platform</button>
                  <button type="button" class="choice-btn" data-value="AI Automation" role="radio" aria-checked="false">AI Automation</button>
                  <button type="button" class="choice-btn" data-value="Full Growth Engine" role="radio" aria-checked="false">Full Growth Engine</button>
                </div>
                <input type="hidden" name="engagement_vector" id="input-engagement-vector" value="Brand Strategy" />
              </div>

              <!-- Step 2: Commercial Stage -->
              <div class="concierge-step-block">
                <div class="concierge-step-label">02. COMMERCIAL STAGE</div>
                <div class="choice-button-group" id="stage-choice-group" role="radiogroup" aria-label="Commercial Stage">
                  <button type="button" class="choice-btn selected" data-value="Early-Stage (0→1)" role="radio" aria-checked="true">Early-Stage (0→1)</button>
                  <button type="button" class="choice-btn" data-value="Scale-Up (Series A/B)" role="radio" aria-checked="false">Scale-Up (Series A/B)</button>
                  <button type="button" class="choice-btn" data-value="Enterprise Transformation" role="radio" aria-checked="false">Enterprise Transformation</button>
                </div>
                <input type="hidden" name="commercial_stage" id="input-commercial-stage" value="Early-Stage (0→1)" />
              </div>

              <!-- Step 3: Primary Hub Desk -->
              <div class="concierge-step-block">
                <div class="concierge-step-label">03. PRIMARY HUB DESK</div>
                <div class="choice-button-group" id="hub-choice-group" role="radiogroup" aria-label="Primary Hub Desk">
                  <button type="button" class="choice-btn selected" data-value="Singapore Desk" role="radio" aria-checked="true">🇸🇬 Singapore Desk</button>
                  <button type="button" class="choice-btn" data-value="New Zealand Desk" role="radio" aria-checked="false">🇳🇿 New Zealand Desk</button>
                  <button type="button" class="choice-btn" data-value="Global Hybrid" role="radio" aria-checked="false">Global Hybrid</button>
                </div>
                <input type="hidden" name="hub_desk" id="input-hub-desk" value="Singapore Desk" />
              </div>

              <!-- Contact & Venture Details -->
              <div class="form-field-group">
                <label for="brief-name" class="form-label">Name & Executive Title</label>
                <input 
                  type="text" 
                  id="brief-name" 
                  name="name" 
                  class="form-input" 
                  placeholder="e.g. Katherine Sterling, Managing Director" 
                  required
                />
              </div>

              <div class="form-field-group">
                <label for="brief-email" class="form-label">Corporate Email</label>
                <input 
                  type="email" 
                  id="brief-email" 
                  name="email" 
                  class="form-input" 
                  placeholder="katherine@enterprise.com" 
                  required
                />
              </div>

              <div class="form-field-group">
                <label for="brief-summary" class="form-label">Venture Brief & Strategic Friction</label>
                <textarea 
                  id="brief-summary" 
                  name="summary" 
                  class="form-textarea" 
                  placeholder="Describe your current commercial inflection point, core bottlenecks, and target timeline..."
                  required
                ></textarea>
              </div>

              <!-- Submit CTA with confirmation container -->
              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                <span>Transmit Strategic Brief →</span>
              </button>

              <div id="form-feedback" style="display: none; margin-top: 1.5rem; padding: 1.25rem; border-radius: var(--r-btn); background: rgba(229, 25, 45, 0.12); border: 1px solid var(--border-crimson);">
                <div style="display: flex; align-items: center; gap: 0.65rem; color: #FFFFFF; font-weight: 600; margin-bottom: 0.35rem;">
                  <span class="pulse-node"></span>
                  <span>Brief Transmitted Successfully</span>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0;">
                  Your submission has been routed directly to our Managing Partners in Singapore & Auckland. Expect a diagnostic response within 24 business hours.
                </p>
              </div>
            </form>
          </div>

          <!-- Right: Senior Partner Access Protocol -->
          <div class="partner-protocol-box">
            <div class="protocol-item">
              <div class="protocol-header">
                <span class="protocol-num">01 //</span>
                <span>ZERO JUNIOR INTERMEDIARIES</span>
              </div>
              <p class="protocol-desc">
                We don't delegate enterprise scoping to business development reps or junior account handlers. Every brief is audited directly by senior strategy principals and technical architects.
              </p>
            </div>

            <div class="protocol-item">
              <div class="protocol-header">
                <span class="protocol-num">02 //</span>
                <span>24-HOUR STRATEGIC SLA</span>
              </div>
              <p class="protocol-desc">
                Qualified submissions receive a preliminary diagnostic review and confidential calendar access with our partners within 24 business hours.
              </p>
            </div>

            <div class="protocol-item">
              <div class="protocol-header">
                <span class="protocol-num">03 //</span>
                <span>STRICT INSTITUTIONAL NDA</span>
              </div>
              <p class="protocol-desc">
                All preliminary venture IP and proprietary data transmissions are protected under institutional non-disclosure standards prior to initial consultation.
              </p>
            </div>

            <!-- Hub Physical Locations Ledger -->
            <div class="protocol-item" style="background: rgba(10, 13, 20, 0.85); border-color: var(--border-subtle);">
              <div class="section-label" style="margin-bottom: 1rem;">BI-COASTAL EMBASSIES</div>
              
              <div class="hub-location-ledger">
                <div class="location-item">
                  <span class="pulse-node"></span>
                  <div class="location-info">
                    <h4>Singapore Gateway Desk</h4>
                    <p>Marina Bay Financial Centre, Tower 2 · Singapore 018983</p>
                  </div>
                </div>

                <div class="location-item" style="margin-top: 0.75rem;">
                  <span class="pulse-node pulse-node-amber"></span>
                  <div class="location-info">
                    <h4>New Zealand Frontier Desk</h4>
                    <p>Commercial Bay Tower, 11-19 Customs St W · Auckland 1010</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initConciergeEvents() {
  // Option button group selection logic
  function setupChoiceGroup(groupId, inputId) {
    const group = document.getElementById(groupId);
    const input = document.getElementById(inputId);
    if (!group || !input) return;

    const buttons = group.querySelectorAll('.choice-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => {
          b.classList.remove('selected');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');
        input.value = btn.getAttribute('data-value');
      });
    });
  }

  setupChoiceGroup('vector-choice-group', 'input-engagement-vector');
  setupChoiceGroup('stage-choice-group', 'input-commercial-stage');
  setupChoiceGroup('hub-choice-group', 'input-hub-desk');

  // Form submit handler with validation
  const form = document.getElementById('strategic-brief-form');
  const feedback = document.getElementById('form-feedback');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('brief-name');
      const emailInput = document.getElementById('brief-email');
      const summaryInput = document.getElementById('brief-summary');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !summaryInput.value.trim()) {
        alert('Please complete all fields to submit your strategic brief.');
        return;
      }

      // Smooth display of confirmation banner
      feedback.style.display = 'block';
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.innerHTML = '<span>Brief Transmitted ✓</span>';
      }

      // Scroll smoothly to feedback if needed
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}
