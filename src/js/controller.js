import 'model.js';
import { setInput } from './model.js';
import './view.js';

const handleInputChange = e => {
  const field = e.target.dataset.field;
  const value = e.target.dataset.value ?? e.target.value;

  setInput(field, value);
  view.render(model.state);
};
