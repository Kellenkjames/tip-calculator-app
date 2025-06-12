// controller.js

import * as model from './model.js';
import * as view from './view.js';

// ==========================
// 🚀 INIT
// ==========================

/**
 * Initializes the application:
 * - Attaches input and click event delegation
 * - Sets up reset functionality
 * - Renders the initial view state
 */
const init = () => {
  const form = document.querySelector('.form');
  const resetBtn = document.querySelector('.results-card__reset-btn');

  form.addEventListener('input', onFormInput);
  form.addEventListener('click', onFormClick);
  resetBtn.addEventListener('click', handleReset);

  view.render(model.state);
};

init();

// ==========================
// 🧠 EVENT HANDLERS
// ==========================

/**
 * Handles all input-based user interactions.
 * Delegates changes to model, updates view, handles errors and animation.
 * @param {Event} e
 */
function handleInputChange(e) {
  const field = e.target.dataset.field;
  const value = e.target.dataset.value ?? e.target.value;

  if (!field) return;

  model.setInput(field, value);
  view.render(model.state);
  view.toggleEmptyState(isEmptyState());

  // Error validation for numberOfPeople
  if (field === 'numberOfPeople') {
    const hasError = parseFloat(value) === 0;
    view.toggleError(hasError);
  }

  // Visual feedback
  view.fadeAnimation();
}

/**
 * Handles reset logic.
 * Clears state and resets view to initial empty UI.
 */
function handleReset() {
  model.reset();
  view.reset();
}

// ==========================
// 🧩 DELEGATED LISTENERS
// ==========================

/**
 * Handles delegated form input events.
 * Triggers when user types or uses custom input.
 */
function onFormInput(e) {
  const isInput = e.target.classList.contains('form__input');
  const isCustomTip = e.target.classList.contains('tip-button--custom');

  if (isInput || isCustomTip) {
    handleInputChange(e);
  }
}

/**
 * Handles delegated tip percentage clicks.
 * Ensures preset buttons activate visual state.
 */
function onFormClick(e) {
  const isTipButton = e.target.classList.contains('tip-button');

  if (isTipButton) {
    view.handleTipPercentage(e);
    handleInputChange(e); // Updates state based on selected percentage
  }
}

// ==========================
// 🧮 UTILITIES
// ==========================

/**
 * Returns true if all user inputs are empty.
 * Used to toggle UI empty state.
 * @returns {boolean}
 */
function isEmptyState() {
  const { bill, tipPercentage, numberOfPeople } = model.state.inputs;
  return !bill && !tipPercentage && !numberOfPeople;
}
