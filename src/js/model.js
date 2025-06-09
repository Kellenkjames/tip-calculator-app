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

//* This function is generic - it can update any input field
const setInput = (field, value) => {
  // 1. Trim whitespace from value
  // 2. Convert to number (or set to '' if empty)
  // 3. Validate that value is a non-negative number
  // 4. Update state.inputs[field] with sanitized value
};

setInput('billAmount', '42.50');
setInput('tipPercentage', '15');
setInput('numberOfPeople', '3');
