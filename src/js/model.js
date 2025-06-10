// App state + business logic

const state = {
  inputs: {
    billAmount: '',
    tipPercentage: '',
    numberOfPeople: '',
  },
  results: {
    tipAmountPerPerson: '',
    totalPerPerson: '',
  },
};

/**
 * General-purpose setter function for updating any of the three fields in your state’s inputs object:
 *
 * @param {string} field string which represents the input field
 * @param {string} rawValue string which represents the input value
 */
const setInput = (field, rawValue) => {
  const allowedFields = Object.keys(state.inputs);
  if (!allowedFields.includes(field)) return;

  const sanitizedInput = String(rawValue).trim();
  const value = sanitizedInput === '' ? '' : parseFloat(sanitizedInput);
  if (value !== '' && isNaN(value)) return;

  state.inputs[field] = value;
  calculateResults();
};

setInput('billAmount', '42.50');
setInput('tipPercentage', '15');
setInput('numberOfPeople', '3');
