import Cleave from 'cleave.js';

document.querySelectorAll('.js-input__box_masked').forEach(element => (
  new Cleave(element, {
    date: true,
    delimiter: '.',
  }
)));
