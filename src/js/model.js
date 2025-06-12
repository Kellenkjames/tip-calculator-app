// model.js

// ==========================
// 🧠 STATE
// ==========================

/**
 * Central application state.
 * Inputs are raw values from the user. Results are calculated per person.
 */
export const state = {
  inputs: {
    billAmount: '',
    tipPercentage: '',
    numberOfPeople: '',
  },
  results: {
    tipAmountPerPerson: 0,
    totalPerPerson: 0,
  },
};

// ==========================
// 🎯 CORE METHODS
// ==========================

/**
 * Sets a user input value into state.
 * Triggers recalculation of results.
 *
 * @param {string} field - The input field to update
 * @param {string} rawValue - Raw user-entered value
 */
export function setInput(field, rawValue) {
  const allowedFields = Object.keys(state.inputs);
  if (!allowedFields.includes(field)) return;

  const sanitized = String(rawValue).trim();
  const value = sanitized === '' ? '' : parseFloat(sanitized);

  if (value !== '' && isNaN(value)) return;

  state.inputs[field] = value;
  calculateResults();
}

/**
 * Resets all input and result state to initial defaults.
 */
export function reset() {
  state.inputs = {
    billAmount: '',
    tipPercentage: '',
    numberOfPeople: '',
  };

  state.results = {
    tipAmountPerPerson: 0,
    totalPerPerson: 0,
  };
}

// ==========================
// 📊 CALCULATION
// ==========================

/**
 * Calculates tip and total per person based on current inputs.
 * Updates the results object in state.
 */
function calculateResults() {
  const { billAmount, tipPercentage, numberOfPeople } = state.inputs;

  if (
    !isValid(billAmount) ||
    !isValid(tipPercentage) ||
    !isValid(numberOfPeople) ||
    numberOfPeople <= 0
  ) {
    state.results.tipAmountPerPerson = 0;
    state.results.totalPerPerson = 0;
    return;
  }

  const tipAmount = billAmount * (tipPercentage / 100);
  const tipAmountPerPerson = tipAmount / numberOfPeople;
  const totalPerPerson = (billAmount + tipAmount) / numberOfPeople;

  state.results.tipAmountPerPerson = round(tipAmountPerPerson);
  state.results.totalPerPerson = round(totalPerPerson);
}

// ==========================
// 🧩 HELPERS
// ==========================

/**
 * Checks if value is a valid number (not NaN, not empty).
 * @param {*} val
 * @returns {boolean}
 */
function isValid(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Rounds a number to two decimal places.
 * @param {number} num
 * @returns {number}
 */
function round(num) {
  return Math.round(num * 100) / 100;
}
