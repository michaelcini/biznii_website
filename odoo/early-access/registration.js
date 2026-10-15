'use strict';
(() => {
  const form = document.querySelector('#registration-form');
  const fields = document.querySelector('#registration-fields');
  const button = document.querySelector('#register-button');
  const availability = document.querySelector('#registration-availability');
  const error = document.querySelector('#registration-error');
  const success = document.querySelector('#registration-success');
  const config = window.BIZNII_EARLY_ACCESS;
  let submitting = false;
  let accepted = false;
  // No email, comments, consent or other applicant data is persisted in the browser.
  const ready = config?.enabled === true && config.privacyApproved === true &&
    /^[a-zA-Z0-9_-]{6,64}$/.test(config.formId) &&
    /^\d{4}-\d{2}-\d{2}(?:-\d+)?$/.test(config.privacyVersion);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!ready || submitting || accepted) return;
    error.textContent = '';
    const email = form.elements.email;
    email.value = email.value.trim();
    for (const input of [email, form.elements.comments]) {
      input.setCustomValidity(input.value.length > input.maxLength
        ? `Please use no more than ${input.maxLength} characters.` : '');
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    // Reject modified dropdown values before sending; provider validation is also required.
    for (const select of form.querySelectorAll('select')) {
      if (![...select.options].some(option => option.value === data.get(select.name))) {
        error.textContent = 'Please choose one of the listed options.';
        select.focus();
        return;
      }
    }
    data.set('privacy_version', config.privacyVersion);
    data.set('programme', 'BizNii for Odoo Early Access');
    data.set('application_status', 'New');
    // Provider receipt time is authoritative. Status is maintained privately by the owner.
    submitting = true;
    fields.disabled = true;
    form.setAttribute('aria-busy', 'true');
    button.textContent = 'Registering…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(`https://submit-form.com/${config.formId}`, {
        method: 'POST', body: JSON.stringify(Object.fromEntries(data)),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        signal: controller.signal, credentials: 'omit', referrerPolicy: 'origin'
      });
      const result = await response.json();
      // Formspark's AJAX acceptance is a 2xx JSON object (normally {}).
      // Reject HTML challenge pages, malformed JSON and explicit error bodies.
      if (!response.ok || !result || typeof result !== 'object' || Array.isArray(result) ||
          result.error || result.errors || result.success === false) {
        error.textContent = response.status === 429
          ? 'Registration is busy. Please wait a few minutes before trying again.'
          : 'Your registration was not confirmed. Check your email and privacy consent, then try again. If this continues, contact support@biznii.com.';
        return;
      }
      accepted = true;
      form.reset();
      form.hidden = true;
      availability.hidden = true;
      success.hidden = false;
      success.focus();
    } catch {
      // Do not retry automatically: a lost response may follow a successful receipt.
      error.textContent = 'We could not confirm receipt. Your details are still here. Check your connection before trying again. If you may have already registered, contact support@biznii.com; repeated registrations are reviewed together.';
    } finally {
      clearTimeout(timeout);
      submitting = false;
      form.setAttribute('aria-busy', 'false');
      if (!accepted) {
        fields.disabled = false;
        button.textContent = 'Register My Interest';
        error.focus();
      }
    }
  });
  form.addEventListener('input', event => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
  });
  if (ready) {
    fields.disabled = false;
    availability.textContent = 'Only your email and registration consent are required. All technical questions are optional.';
  }
})();
