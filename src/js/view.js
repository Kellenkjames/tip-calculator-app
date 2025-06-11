/**
 * Renders the results section using the current state.
 * @param {Object} state - The application state object from model.js
 */
export const render = state => {
  console.log(`[DEBUG] render called with:`, state);

  const tipEl = document.querySelector('.results-card__value--tip');
  const totalEl = document.querySelector('.results-card__value--total');

  tipEl.textContent = state.results.tipAmountPerPerson;
  totalEl.textContent = state.results.totalPerPerson;
};

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

/**
 * Optional formatting helper to ensure consistent display (can be reused later)
 * @param {number|string} value
 * @returns {string}
 */
const formatCurrency = value => {
  if (value === '' || typeof value !== 'number') return '$0.00';
  return `$${value.toFixed(2)}`;
};
