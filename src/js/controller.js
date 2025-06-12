import * as model from './model.js';
import * as view from './view.js';

/**
 * Handles input changes across all fields.
 * Retrieves field name and value, updates state via model, and triggers DOM re-render.
 *
 * @param {Event} e - Input or click event
 */
const handleInputChange = e => {
  let field = e.target.dataset.field;
  const value = e.target.dataset.value ?? e.target.value;

  if (!field) return;

  // Determine if all inputs are empty (initial)
  view.toggleEmptyState(isEmptyState());

  model.setInput(field, value);
  view.render(model.state);

  // Error toggle logic for numberOfPeople
  if (field === 'numberOfPeople') {
    const num = parseFloat(value);
    const hasError = num === 0;
    view.toggleError(hasError);
  }

  // Handle tip percentage feedback
  view.handleTipPercentage(e);

  // Fade animation for results values
  view.fadeAnimation();
};

/**
 * Handles reset logic.
 * Resets state and DOM to initial values.
 */
const handleReset = () => {
  model.reset();
  view.reset();
};

/**
 * Determine if all inputs are empty
 * Initial state of the application
 * @returns {boolean} true or false
 */
const isEmptyState = () => {
  const { bill, tipPercentage, numberOfPeople } = model.state.inputs;
  return !bill && !tipPercentage && !numberOfPeople;
};

/**
 * Initializes the application:
 * - Adds event listeners via delegation
 * - Sets up reset functionality
 * - Renders initial state
 */
const init = () => {
  const form = document.querySelector('.form');

  form.addEventListener('input', e => {
    if (
      e.target.classList.contains('form__input') ||
      e.target.classList.contains('tip-button--custom')
    ) {
      handleInputChange(e);
    }
  });

  form.addEventListener('click', e => {
    if (e.target.classList.contains('tip-button')) {
      handleInputChange(e);
    }
  });

  const resetBtn = document.querySelector('.results-card__reset-btn');
  resetBtn.addEventListener('click', handleReset);

  view.render(model.state);
};

init();
