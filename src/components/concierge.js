/**
 * Contact Component (formerly Concierge)
 * Simple, human, and inviting inquiry form with instant validation,
 * clear next steps, and studio direct contact details.
 */

export function renderConcierge() {
  return `
    <section id="concierge-stage" class="section">
      <div class="container-wide">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">CONTACT US</div>
          <h2 class="section-title">
            Let's Build Something Great Together.
          </h2>
          <p class="section-desc">
            Ready to upgrade your brand, launch a fast modern website, or automate your business operations? Tell us about your goals below, and we'll respond within 24 hours.
          </p>
        </div>

        <!-- Split Layout: Form on Left, Direct Contact on Right -->
        <div class="grid-split-50">
          <!-- Left: Clean Project Inquiry Form -->
          <div class="contact-form-card">
            <form id="contact-inquiry-form" novalidate>
              <!-- Step 1: Select Service -->
              <div class="form-group-block">
                <label class="form-block-label">1. WHAT DO YOU NEED HELP WITH?</label>
                <div class="choice-button-group" id="service-choice-group" role="radiogroup" aria-label="Service Needed">
                  <button type="button" class="choice-btn selected" data-value="Brand Strategy" role="radio" aria-checked="true">Brand Strategy</button>
                  <button type="button" class="choice-btn" data-value="Website Design" role="radio" aria-checked="false">Website Design</button>
                  <button type="button" class="choice-btn" data-value="Custom App" role="radio" aria-checked="false">Custom App</button>
                  <button type="button" class="choice-btn" data-value="AI Automation" role="radio" aria-checked="false">AI Automation</button>
                  <button type="button" class="choice-btn" data-value="Full Strategy" role="radio" aria-checked="false">Full Strategy</button>
                </div>
                <input type="hidden" name="service_needed" id="input-service-needed" value="Brand Strategy" />
              </div>

              <!-- Step 2: Estimated Budget -->
              <div class="form-group-block">
                <label class="form-block-label">2. ESTIMATED PROJECT BUDGET</label>
                <div class="choice-button-group" id="budget-choice-group" role="radiogroup" aria-label="Budget Range">
                  <button type="button" class="choice-btn" data-value="Under $10k" role="radio" aria-checked="false">Under $10k</button>
                  <button type="button" class="choice-btn selected" data-value="$10k - $25k" role="radio" aria-checked="true">$10k - $25k</button>
                  <button type="button" class="choice-btn" data-value="$25k - $50k" role="radio" aria-checked="false">$25k - $50k</button>
                  <button type="button" class="choice-btn" data-value="$50k+" role="radio" aria-checked="false">$50k+</button>
                </div>
                <input type="hidden" name="budget_range" id="input-budget-range" value="$10k - $25k" />
              </div>

              <!-- Contact Inputs -->
              <div class="form-field-group">
                <label for="contact-name" class="form-label">Your Name</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  class="form-input" 
                  placeholder="e.g. Sarah Jenkins" 
                  required
                />
              </div>

              <div class="form-field-group">
                <label for="contact-email" class="form-label">Work Email</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  class="form-input" 
                  placeholder="sarah@yourcompany.com" 
                  required
                />
              </div>

              <div class="form-field-group">
                <label for="contact-company" class="form-label">Company or Website (Optional)</label>
                <input 
                  type="text" 
                  id="contact-company" 
                  name="company" 
                  class="form-input" 
                  placeholder="e.g. yourcompany.com" 
                />
              </div>

              <div class="form-field-group">
                <label for="contact-message" class="form-label">How can we help you?</label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  class="form-textarea" 
                  placeholder="Tell us a little bit about your project, timeline, and current goals..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                <span>Send Message →</span>
              </button>

              <!-- Live Submission Feedback Banner -->
              <div class="submission-confirmation" id="contact-form-feedback" style="display: none;" role="status">
                <div class="confirmation-icon">✓</div>
                <div>
                  <h4 class="confirmation-title">Thank You! Message Received.</h4>
                  <p class="confirmation-desc">
                    We've received your project details and will review them carefully. Expect a personal reply from our team within 24 hours.
                  </p>
                </div>
              </div>
            </form>
          </div>

          <!-- Right: Studio Details & What Happens Next -->
          <div class="contact-info-panel">
            <!-- Studio Offices -->
            <div class="contact-office-card">
              <h3 class="office-card-title">Studio Locations</h3>
              <div class="office-locations-list">
                <div class="office-item">
                  <div class="office-header">
                    <span class="pulse-node"></span>
                    <strong>Singapore Hub</strong>
                  </div>
                  <p class="office-text">Marina Bay Financial Centre, Singapore</p>
                  <span class="office-time">Timezone: SGT (UTC+8)</span>
                </div>

                <div class="office-item">
                  <div class="office-header">
                    <span class="pulse-node pulse-node-amber"></span>
                    <strong>New Zealand Studio</strong>
                  </div>
                  <p class="office-text">Britomart Precinct, Auckland, New Zealand</p>
                  <span class="office-time">Timezone: NZST (UTC+12)</span>
                </div>
              </div>
            </div>

            <!-- What to Expect Box -->
            <div class="what-to-expect-card">
              <h4 class="expect-title">What Happens Next?</h4>
              <ol class="expect-steps-list">
                <li>
                  <strong>1. Project Review</strong>
                  <p>We review your goals, industry, and requirements within 24 hours.</p>
                </li>
                <li>
                  <strong>2. Strategy Consultation</strong>
                  <p>A friendly 30-minute call to answer questions and explore the best approach.</p>
                </li>
                <li>
                  <strong>3. Clear Proposal</strong>
                  <p>A transparent roadmap with fixed timelines, deliverables, and pricing.</p>
                </li>
              </ol>
            </div>

            <!-- Direct Contact Link -->
            <div class="direct-contact-note">
              <span>Prefer direct email?</span>
              <a href="mailto:hello@nexagrowth.com" class="direct-email-link">hello@nexagrowth.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Handles form validation and interactive choice selection
 */
export function initConciergeEvents() {
  const form = document.getElementById('contact-inquiry-form');
  if (!form) return;

  // Setup choice button group interactions
  function setupChoiceGroup(groupId, hiddenInputId) {
    const group = document.getElementById(groupId);
    const hiddenInput = document.getElementById(hiddenInputId);
    if (!group || !hiddenInput) return;

    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.choice-btn');
      if (!btn) return;

      group.querySelectorAll('.choice-btn').forEach((b) => {
        b.classList.remove('selected');
        b.setAttribute('aria-checked', 'false');
      });

      btn.classList.add('selected');
      btn.setAttribute('aria-checked', 'true');
      hiddenInput.value = btn.getAttribute('data-value') || '';
    });
  }

  setupChoiceGroup('service-choice-group', 'input-service-needed');
  setupChoiceGroup('budget-choice-group', 'input-budget-range');

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const feedbackEl = document.getElementById('contact-form-feedback');

    // Validation
    let isValid = true;
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--crimson)';
        isValid = false;
      } else {
        input.style.borderColor = 'var(--border-subtle)';
      }
    });

    if (emailInput && !emailInput.value.includes('@')) {
      emailInput.style.borderColor = 'var(--crimson)';
      isValid = false;
    }

    if (!isValid) return;

    // Show friendly success confirmation
    if (feedbackEl) {
      feedbackEl.style.display = 'flex';
      feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Reset fields
    form.reset();
  });
}
