// App state + business logic

export const state = {
  inputs: {
    billAmount: '',
    tipPercentage: '',
    numberOfPeople: '',
  },
  results: {
    tipAmountPerPerson: '0.00',
    totalPerPerson: '0.00',
  },
};

/**
 * General-purpose setter function for updating any of the three fields in your state’s inputs object:
 *
 * @param {string} field string which represents the input field
 * @param {string} rawValue string which represents the input value
 */
export const setInput = (field, rawValue) => {
  const allowedFields = Object.keys(state.inputs);
  if (!allowedFields.includes(field)) return;

  const sanitizedInput = String(rawValue).trim();
  const value = sanitizedInput === '' ? '' : parseFloat(sanitizedInput);
  if (value !== '' && isNaN(value)) return;

  state.inputs[field] = value;
  calculateResults();
};

/**
 * Rounds a number to two decimal places.
 *
 * @param {num} num - The number to round.
 * @returns {number} The rounded number.
 */
const round = num => Math.round(num * 100) / 100;

/**
 * Checks if a value is a valid number.
 *
 * @param {*} val val - The value to validate.
 * @returns {boolean} True if the value is a valid number, false otherwise.
 */
const isValid = val => typeof val === 'number' && !isNaN(val);

/**
 * Calculates the tip and total per person using current state inputs.
 * Updates the state with the computed results.
 */
const calculateResults = () => {
  const { billAmount, tipPercentage, numberOfPeople } = state.inputs;

  if (
    !isValid(billAmount) ||
    !isValid(tipPercentage) ||
    !isValid(numberOfPeople) ||
    numberOfPeople <= 0
  ) {
    state.results.tipAmountPerPerson = '0.00';
    state.results.totalPerPerson = '0.00';
    return;
  }

  const tipAmount = billAmount * (tipPercentage / 100);
  const tipAmountPerPerson = tipAmount / numberOfPeople;
  const totalPerPerson = (billAmount + tipAmount) / numberOfPeople;

  state.results.tipAmountPerPerson = round(tipAmountPerPerson);
  state.results.totalPerPerson = round(totalPerPerson);
};

/**
 * Reset app state to initial values.
 */
export const reset = () => {
  state.inputs.billAmount = '';
  state.inputs.tipPercentage = '';
  state.inputs.numberOfPeople = '';
  state.results.tipAmountPerPerson = '';
  state.results.totalPerPerson = '';
};
