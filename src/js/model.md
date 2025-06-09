Q1: What pieces of data or "state" need to be stored or calculated in this app?
(e.g., bill amount, tip percentage, number of people, calculated results, etc.)

## We should store the following in our initial state:

- bill amount
- tip percentage
- number of people
- calculated results (tip amount per person, total per person)

## Initial Feedback

1. You’re 100% right that all of these are part of app state:

- They’re either user inputs or derived from inputs
- They affect what gets rendered
- They reset together

2. You're also correct that calculated values can (and probably should) be stored in their own object — to separate user input from derived data.

```js
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
```

✅ Q2 Review: Calculation Strategy

💬 You said:
“The model should calculate tipAmountPerPerson with a setter function
and totalPerPerson with a getter function.”

🔍 Feedback:
You’re on the right track! Let’s reframe slightly for clarity and predictability:

✅ Refined Strategy:

Use a pure calculateResults() function inside the model that:

1. Pulls billAmount, tipPercentage, and numberOfPeople from state.inputs

2. Computes tipAmountPerPerson and totalPerPerson

3. Stores them in state.results

This avoids hidden mutation inside a setter or getter, and keeps calculations explicit and testable.

💡 Think like this:

```js
function calculateResults() {
  // do math → update state.results
}
```

✅ Q3 Review: Data Exposure Strategy

💬 You said:
“I used to export the entire state object, but I feel we should only expose getState() and setState() so we don’t mutate anything by accident.”

🔍 Feedback:
Exactly.

This is a shift from procedural to protective/encapsulated architecture. And it’s perfect prep for framework thinking (e.g., Angular services or Redux stores).

⚙️ Core Functions

```js
function setInput(field, value) { ... }
function calculateResults() { ... }
function getState() { return structuredClone(state); } // read-only
function reset() { ... }
```

🔁 Exports

```js
export { setInput, calculateResults, getState, reset };
```
