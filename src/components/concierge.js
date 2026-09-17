import { COMPANY_INFO } from '../data/companyData.js';

/**
 * Contact & Project Inquiry Component (Concierge)
 * Structured inquiry form aligned with the 4 target client profiles
 * and 8 core service pillars, plus direct studio contact details.
 */

export function renderConcierge() {
  return `
    <section id="concierge-stage" class="section">
      <div class="container-wide">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">CONTACT & INQUIRIES</div>
          <h2 class="section-title">
            Transform Your Vision into a Scalable System.
          </h2>
          <p class="section-desc">
            Ready to clarify your strategy, build a modern brand, launch digital platforms, or automate customer acquisition? Detail your operational goals below.
          </p>
        </div>

        <!-- Split Layout: Form on Left, Direct Contact on Right -->
        <div class="grid-split-50">
          <!-- Left: Clean Project Inquiry Form -->
          <div class="contact-form-card glass-panel">
            <form id="contact-inquiry-form" novalidate>
              <!-- Step 1: Client Profile -->
              <div class="form-group-block">
                <label class="form-block-label">1. WHAT BEST DESCRIBES YOUR ORGANIZATION?</label>
                <div class="choice-button-group" id="client-type-group" role="radiogroup" aria-label="Organization Type">
                  <button type="button" class="choice-btn selected" data-value="Entrepreneur" role="radio" aria-checked="true">Entrepreneur / Founder</button>
                  <button type="button" class="choice-btn" data-value="SME" role="radio" aria-checked="false">Growing SME</button>
                  <button type="button" class="choice-btn" data-value="Institution" role="radio" aria-checked="false">Institution / Public</button>
                  <button type="button" class="choice-btn" data-value="Enterprise" role="radio" aria-checked="false">Enterprise / Large Co</button>
                </div>
                <input type="hidden" name="client_type" id="input-client-type" value="Entrepreneur" />
              </div>

              <!-- Step 2: Primary Pillar Needed -->
              <div class="form-group-block">
                <label class="form-block-label">2. PRIMARY CAPABILITY OR PILLAR NEEDED</label>
                <div class="choice-button-group choice-wrap-grid" id="service-choice-group" role="radiogroup" aria-label="Primary Capability">
                  <button type="button" class="choice-btn selected" data-value="Strategy & Growth" role="radio" aria-checked="true">01. Strategy & Growth</button>
                  <button type="button" class="choice-btn" data-value="Brand & Communication" role="radio" aria-checked="false">02. Brand & Comm</button>
                  <button type="button" class="choice-btn" data-value="Digital Transformation" role="radio" aria-checked="false">03. Digital Platform</button>
                  <button type="button" class="choice-btn" data-value="AI & Automation" role="radio" aria-checked="false">04. AI & Automation</button>
                  <button type="button" class="choice-btn" data-value="Marketing & Acquisition" role="radio" aria-checked="false">05. Marketing & Acquisition</button>
                  <button type="button" class="choice-btn" data-value="CRM & Experience" role="radio" aria-checked="false">06. CRM & Retention</button>
                  <button type="button" class="choice-btn" data-value="Innovation & Ideas" role="radio" aria-checked="false">07. From Idea to Market</button>
                  <button type="button" class="choice-btn" data-value="Data & Performance" role="radio" aria-checked="false">08. Data & Analytics</button>
                  <button type="button" class="choice-btn" data-value="Connected Growth System" role="radio" aria-checked="false">Full Connected System</button>
                </div>
                <input type="hidden" name="service_needed" id="input-service-needed" value="Strategy & Growth" />
              </div>

              <!-- Step 3: Estimated Project Budget -->
              <div class="form-group-block">
                <label class="form-block-label">3. ESTIMATED COMMERCIAL BUDGET</label>
                <div class="choice-button-group" id="budget-choice-group" role="radiogroup" aria-label="Budget Range">
                  <button type="button" class="choice-btn" data-value="Under $15k" role="radio" aria-checked="false">Under $15k</button>
                  <button type="button" class="choice-btn selected" data-value="$15k - $35k" role="radio" aria-checked="true">$15k - $35k</button>
                  <button type="button" class="choice-btn" data-value="$35k - $75k" role="radio" aria-checked="false">$35k - $75k</button>
                  <button type="button" class="choice-btn" data-value="$75k+" role="radio" aria-checked="false">$75k+</button>
                </div>
                <input type="hidden" name="budget_range" id="input-budget-range" value="$15k - $35k" />
              </div>

              <!-- Contact Inputs -->
              <div class="form-field-group">
                <label for="contact-name" class="form-label">Full Name</label>
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
                <label for="contact-email" class="form-label">Corporate Email</label>
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
                <label for="contact-company" class="form-label">Company / Institution / Website</label>
                <input 
                  type="text" 
                  id="contact-company" 
                  name="company" 
                  class="form-input" 
                  placeholder="e.g. yourcompany.com" 
                />
              </div>

              <div class="form-field-group">
                <label for="contact-message" class="form-label">Key Problem, Opportunity or Project Goals</label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  class="form-textarea" 
                  placeholder="Briefly describe your current business bottleneck, timeline, or growth objective..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="form-submit-row">
                <button type="submit" class="btn btn-primary btn-lg" id="contact-submit-btn" style="width: 100%;">
                  <span>Submit Strategic Inquiry →</span>
                </button>
              </div>

              <!-- Form Feedback Message -->
              <div id="form-feedback" class="form-feedback-notice" style="display: none;" role="status"></div>
            </form>
          </div>

          <!-- Right: Studio Details & Process Guarantee -->
          <div class="contact-info-panel">
            <!-- Direct Email Block -->
            <div class="studio-direct-card glass-panel" style="margin-bottom: 1.5rem;">
              <div class="direct-card-label">DIRECT INQUIRIES</div>
              <a href="mailto:${COMPANY_INFO.contact.email}" class="direct-email-link">
                ${COMPANY_INFO.contact.email}
              </a>
              <p class="direct-response-promise">
                Executive response within 24 hours. We sign standard non-disclosure agreements (NDAs) before evaluating proprietary business concepts.
              </p>
            </div>

            <!-- Global Hub Locations -->
            <div class="studio-direct-card glass-panel" style="margin-bottom: 1.5rem;">
              <div class="direct-card-label">GLOBAL HUBS & OPERATING JURISDICTIONS</div>
              
              <div style="margin-bottom: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <span class="pulse-node pulse-node-amber"></span>
                  <span style="font-weight: 700; color: #FFFFFF;">${COMPANY_INFO.locations.headquarters.role}: ${COMPANY_INFO.locations.headquarters.city}</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
                  ${COMPANY_INFO.locations.headquarters.address}
                </p>
                <p style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--amber); margin-top: 0.25rem;">
                  Timezone: ${COMPANY_INFO.locations.headquarters.tzAbbr} (${COMPANY_INFO.locations.headquarters.utcOffset})
                </p>
              </div>

              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <span class="pulse-node"></span>
                  <span style="font-weight: 700; color: #FFFFFF;">${COMPANY_INFO.locations.hub.role}: ${COMPANY_INFO.locations.hub.city}</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
                  ${COMPANY_INFO.locations.hub.address}
                </p>
                <p style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--crimson); margin-top: 0.25rem;">
                  Timezone: ${COMPANY_INFO.locations.hub.tzAbbr} (${COMPANY_INFO.locations.hub.utcOffset})
                </p>
              </div>
            </div>

            <!-- What Happens Next Guarantee -->
            <div class="studio-direct-card glass-panel">
              <div class="direct-card-label">WHAT HAPPENS NEXT?</div>
              <ol class="next-steps-list">
                <li>
                  <strong>1. Initial Diagnostic:</strong> We review your business model, positioning, and current technical/marketing challenges.
                </li>
                <li>
                  <strong>2. Strategy Session:</strong> A 45-minute consultation with a senior transformation partner to map options.
                </li>
                <li>
                  <strong>3. Proposal & System Blueprint:</strong> A transparent roadmap outlining deliverables, timelines, and verified ROI.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initConciergeEvents() {
  const form = document.getElementById('contact-inquiry-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  // Setup choice button interactions
  function setupChoiceGroup(groupId, inputId) {
    const group = document.getElementById(groupId);
    const input = document.getElementById(inputId);
    if (!group || !input) return;

    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.choice-btn');
      if (!btn) return;

      group.querySelectorAll('.choice-btn').forEach((b) => {
        b.classList.remove('selected');
        b.setAttribute('aria-checked', 'false');
      });

      btn.classList.add('selected');
      btn.setAttribute('aria-checked', 'true');
      input.value = btn.dataset.value;
    });
  }

  setupChoiceGroup('client-type-group', 'input-client-type');
  setupChoiceGroup('service-choice-group', 'input-service-needed');
  setupChoiceGroup('budget-choice-group', 'input-budget-range');

  // Submit handling
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      if (feedback) {
        feedback.className = 'form-feedback-notice error';
        feedback.textContent = 'Please fill out all required fields before submitting.';
        feedback.style.display = 'block';
      }
      return;
    }

    const submitBtn = document.getElementById('contact-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing Diagnostic Dispatch...</span>';
    }

    // Forward to backend API if available, else show instant confirmation
    fetch('/api/crm/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_name: form.company.value.trim() || name,
        contact_email: email,
        client_type: form.client_type.value,
        selected_pillar: form.service_needed.value,
        budget_range: form.budget_range.value,
        message: message
      })
    }).catch(() => {
      // Graceful fallback for static preview
    }).finally(() => {
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Submit Strategic Inquiry →</span>';
        }
        if (feedback) {
          feedback.className = 'form-feedback-notice success';
          feedback.innerHTML = `
            <strong>Inquiry Received Successfully.</strong><br/>
            Thank you, ${name}. Our Auckland and Singapore transformation principals will review your diagnostic and reach out at <em>${email}</em> within 24 hours.
          `;
          feedback.style.display = 'block';
        }
        form.reset();
      }, 700);
    });
  });
}
