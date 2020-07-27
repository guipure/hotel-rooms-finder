const boxes = document.querySelectorAll('.dropdown__box');
const pluses = document.querySelectorAll('.dropdown__operator_plus');
const minuses = document.querySelectorAll('.dropdown__operator_minus');
const clearBtns = document.querySelectorAll('.dropdown__clear');
const submitBtns = document.querySelectorAll('.dropdown__submit');

window.addEventListener('click', hide);
Array.from(boxes).forEach((box) => box.addEventListener('click', show));
Array.from(pluses).forEach((plus) => plus.addEventListener('click', () => operator('plus')));
Array.from(minuses).forEach((minus) => minus.addEventListener('click', () => operator('minus')));
Array.from(submitBtns).forEach((btn) => btn.addEventListener('click', submit));

for (const btn of clearBtns) {
  const dropdown = btn.closest('.dropdown');
  const result = dropdown.querySelector('.dropdown__result');
  btn.firstElementChild.addEventListener('click', () => clear(dropdown, result));
}

function submit() {
  show();
}

function show() {
  const dropdown = event.currentTarget.closest('.dropdown');
  const menu = dropdown.querySelector('.dropdown__menu');
  const icon = dropdown.querySelector('.dropdown__icon');
  menu.classList.toggle('dropdown__menu_hidden');
  icon.classList.toggle('dropdown__icon_rotated');
}

function hide() {
  if (event.target.closest('.dropdown')) return;
  const menus = document.querySelectorAll('.dropdown__menu');
  const rotatedIcons = document.querySelectorAll('.dropdown__icon_rotated');

  for (const icon of rotatedIcons) {
    icon.classList.remove('dropdown__icon_rotated');
  }

  for (const menu of menus) {
    menu.classList.add('dropdown__menu_hidden');
  }
}

function operator(sign) {
  let valueDiv;
  let minusDiv;
  if (sign == 'plus') {
    valueDiv = event.target.previousElementSibling;
    minusDiv = valueDiv.previousElementSibling;
  } else {
    valueDiv = event.target.nextElementSibling;
    minusDiv = event.target;
  }
  let value = Number(valueDiv.innerHTML);
  sign == 'plus' ? value++ : value--;
  if (value < 0) return;
  if (value == 0) {
    minusDiv.classList.add('dropdown__operator_disabled');
  }
  if (value > 0 && minusDiv.classList.contains('dropdown__operator_disabled')) {
    minusDiv.classList.remove('dropdown__operator_disabled');
  }
  valueDiv.innerHTML = value.toString();
  sum(event.target.closest('.dropdown'));
}

function sum(dropdown) {
  const values = Array.from(dropdown.querySelectorAll('.dropdown__value')).map((value) => Number(value.innerHTML));
  const result = dropdown.querySelector('.dropdown__result');
  const labels = Array.from(dropdown.querySelectorAll('.dropdown__label')).map((label) => label.innerHTML);
  if (result.classList.contains('guests')) {
    const sum = values.reduce((a, b) => a + b, 0);
    result.innerHTML = sum.toString() + ending(sum, 'гость');
  } else {
    const itemsCount = [];

    values.forEach((value, index) => {
      if (value > 0) {
        itemsCount.push(value.toString() + ending(value, labels[index]));
      }
    });

    if (itemsCount.length > 2) {
      result.innerHTML = `${itemsCount.slice(0, 2).join(', ')}...`;
    } else {
      result.innerHTML = itemsCount.join(', ');
    }
  }
}

function ending(value, word) {
  let types;

  switch (word) {
    case 'спальни':
      types = ['спальня', 'спальни', 'спален'];
      break;
    case 'кровати':
      types = ['кровать', 'кровати', 'кроватей'];
      break;
    case 'ванные комнаты':
      types = ['ванная', 'ванных', 'ванных'];
      break;
    case 'гость':
      types = ['гость', 'гостя', 'гостей'];
      break;
  }

  if (value > 4 && value < 21) return (` ${types[2]}`);
  if (value % 10 == 1) return (` ${types[0]}`);
  if (value % 10 > 1 && value % 10 < 5) return (` ${types[1]}`);
  return (` ${types[2]}`);
}

function clear(dropdown, result) {
  const values = dropdown.querySelectorAll('.dropdown__value');

  for (const value of values) {
    value.innerHTML = '0';
    value.previousElementSibling.classList.add('dropdown__operator_disabled');
  }

  if (result.classList.contains('guests')) {
    result.innerHTML = 'Сколько гостей';
  } else {
    result.innerHTML = 'Сколько кроватей';
  }
}
