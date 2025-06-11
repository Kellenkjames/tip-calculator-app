/**
 * Renders the results section using the current state.
 * @param {Object} state - The application state object from model.js
 */
export const render = state => {
  const tipEl = document.querySelector('.results-card__value--tip');
  const totalEl = document.querySelector('.results-card__value--total');

  const { tipAmountPerPerson, totalPerPerson } = state.results;

  tipEl.textContent = formatCurrency(tipAmountPerPerson);
  totalEl.textContent = formatCurrency(totalPerPerson);
};

/**
 * Resets the input fields, tip buttons, and result display in the UI.
 */
export const reset = () => {
  // 1. Clear input fields
  document.querySelectorAll('[data-field]').forEach(input => {
    if (input.tagName === 'INPUT') input.value = '';
  });

  // 2. Clear selected tip buttons (remove active class)
  document.querySelectorAll('.tip-button').forEach(btn => {
    btn.classList.remove('active');
  });

  // 3. Reset result display
  const tipEl = document.querySelector('.results-card__value--tip');
  const totalEl = document.querySelector('.results-card__value--total');
  tipEl.textContent = '$0.00';
  totalEl.textContent = '$0.00';
};

export const toggleError = hasError => {
  const input = document.querySelector('[data-field="numberOfPeople"]');
  const group = input.closest('.form__group'); // ← Traverse up to the parent group

  if (!group) return;

  if (hasError) {
    group.classList.add('has-error');
    input.setAttribute('aria-invalid', 'true');
  } else {
    group.classList.remove('has-error');
    input.removeAttribute('aria-invalid');
  }
};

/**
 * Formatting helper to ensure consistent display (can be reused later)
 * @param {number|string} value
 * @returns {string}
 */
const formatCurrency = val =>
  val === '' ? '$0.00' : `$${parseFloat(val).toFixed(2)}`;
