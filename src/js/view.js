// view.js

// ==========================
// 🔧 DOM SELECTORS
// ==========================
const selectors = {
  app: document.querySelector('.app'),
  inputs: document.querySelectorAll('[data-field]'),
  tipButtons: document.querySelectorAll('.tip-button'),
  tipValue: document.querySelector('.results-card__value--tip'),
  totalValue: document.querySelector('.results-card__value--total'),
  customTipInput: document.querySelector(
    '[data-field="tipPercentage"][type="number"]'
  ),
  numberOfPeopleInput: document.querySelector('[data-field="numberOfPeople"]'),
};

// ==========================
// 🎯 CORE RENDER
// ==========================

/**
 * Renders the results section using the current state.
 * @param {Object} state - The application state from model.js
 */
export const render = state => {
  const { tipAmountPerPerson, totalPerPerson } = state.results;
  selectors.tipValue.textContent = formatCurrency(tipAmountPerPerson);
  selectors.totalValue.textContent = formatCurrency(totalPerPerson);
};

/**
 * Applies fade + scale animation to results when values change.
 */
export const fadeAnimation = () => {
  [selectors.tipValue, selectors.totalValue].forEach(el => {
    el.classList.add('animate');
    setTimeout(() => el.classList.remove('animate'), 250);
  });
};

// ==========================
// ♻️ STATE RESET
// ==========================

/**
 * Resets all inputs, tip buttons, results, and error/empty states.
 */
export const reset = () => {
  selectors.inputs.forEach(input => {
    if (input.tagName === 'INPUT') input.value = '';
  });

  selectors.tipButtons.forEach(btn => btn.classList.remove('active'));

  selectors.tipValue.textContent = '$0.00';
  selectors.totalValue.textContent = '$0.00';

  toggleEmptyState(true);
  toggleError(false);
};

// ==========================
// 🎛️ TOGGLE HANDLERS
// ==========================

/**
 * Toggles the empty state UI class.
 * @param {boolean} isEmpty
 */
export const toggleEmptyState = isEmpty => {
  selectors.app.classList.toggle('app--empty', isEmpty);
};

/**
 * Shows or hides the error state for number of people input.
 * @param {boolean} hasError
 */
export const toggleError = hasError => {
  const group = selectors.numberOfPeopleInput.closest('.form__group');
  if (!group) return;

  group.classList.toggle('has-error', hasError);
  selectors.numberOfPeopleInput.setAttribute('aria-invalid', hasError);
  if (!hasError) selectors.numberOfPeopleInput.removeAttribute('aria-invalid');
};

// ==========================
// 💡 TIP BUTTON INTERACTION
// ==========================

/**
 * Ensures only one preset tip button is active at a time.
 * Clears custom input when a preset is selected.
 * @param {Event} e
 */
export const handleTipPercentage = e => {
  const isPreset =
    e.target.matches('.tip-button') &&
    e.target.dataset.field === 'tipPercentage';

  if (!isPreset) return;

  if (selectors.customTipInput) selectors.customTipInput.value = '';

  selectors.tipButtons.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
};

// ==========================
// 🔢 HELPERS
// ==========================

/**
 * Formats a number to currency.
 * @param {number|string} val
 * @returns {string}
 */
const formatCurrency = val =>
  val === '' ? '$0.00' : `$${parseFloat(val).toFixed(2)}`;
