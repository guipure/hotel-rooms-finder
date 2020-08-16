class Dropdown {
  constructor(element) {
    this.dropdown = element;
    this._addEventListeners();
  }

  _addEventListeners() {
    document.addEventListener('click', this._hide.bind(this));

    const box = this.dropdown.querySelector('.js-dropdown__box');
    box.addEventListener('click', this._toggle.bind(this));

    const operators = this.dropdown.querySelectorAll('.js-dropdown__operator');
    Array.from(operators).forEach((operator) =>
      operator.addEventListener('click', this._handleOperator.bind(this))
    );

    const submitButton = this.dropdown.querySelector('.js-dropdown__submit');
    submitButton.addEventListener('click', this._submit.bind(this));

    const clearButton = this.dropdown.querySelector('.js-dropdown__clear');
    clearButton.firstElementChild.addEventListener(
      'click',
      this._clear.bind(this)
    );
  }

  _submit() {
    this._toggle();
  }

  _toggle() {
    const menu = this.dropdown.querySelector('.js-dropdown__menu');
    menu.classList.toggle('dropdown__menu_hidden');
    const icon = this.dropdown.querySelector('.js-dropdown__icon');
    icon.classList.toggle('dropdown__icon_rotated');
    const box = this.dropdown.querySelector('.js-dropdown__box');
    box.classList.toggle('dropdown__box_opened');
    box.classList.toggle('dropdown__box_closed');
  }

  _hide(event) {
    if (event.target.closest('.js-dropdown') === this.dropdown) return;
    const isClosed = !this.dropdown.querySelector('.dropdown__box_opened');
    if (isClosed) return;
    this._toggle();
  }

  _showClearButton() {
    const clearButton = this.dropdown.querySelector('.js-dropdown__clear');
    clearButton.classList.remove('dropdown__clear_hidden');
  }

  _hideClearButton() {
    const clearButton = this.dropdown.querySelector('.js-dropdown__clear');
    clearButton.classList.add('dropdown__clear_hidden');
  }

  _handleOperator(event) {
    let valueElement;
    let minusElement;
    const isTargetPlus = event.target.classList.contains(
      'dropdown__operator_plus'
    );

    if (isTargetPlus) {
      valueElement = event.target.previousElementSibling;
      minusElement = valueElement.previousElementSibling;
    } else {
      valueElement = event.target.nextElementSibling;
      minusElement = event.target;
    }

    this._calculateValue(valueElement, minusElement, isTargetPlus);
  }

  _calculateValue(valueElement, minusElement, isTargetPlus) {
    let value = Number(valueElement.innerHTML);
    isTargetPlus ? value++ : value--;

    if (value < 0) return;

    this._handleMinus(minusElement, value);
    valueElement.innerHTML = value.toString();

    this._sum();
  }

  _handleMinus(minusElement, value) {
    if (value === 0) {
      minusElement.classList.add('dropdown__operator_disabled');
    }

    value > 0
      && minusElement.classList.contains('dropdown__operator_disabled')
      && minusElement.classList.remove('dropdown__operator_disabled');
  }

  _sum() {
    const values = Array.from(
      this.dropdown.querySelectorAll('.js-dropdown__value')
    ).map((value) => Number(value.innerHTML));

    const sum = values.reduce((a, b) => a + b, 0);

    if (sum === 0) {
      this._clear();
      return;
    }

    this._showClearButton();
    const result = this.dropdown.querySelector('.js-dropdown__result');

    const labels = Array.from(
      this.dropdown.querySelectorAll('.js-dropdown__label')
    ).map((label) => label.innerHTML);

    if (result.classList.contains('guests')) {
      result.innerHTML = sum.toString() + this._correctEnding(sum, 'гость');
    } else {
      const allItems = [];

      values.forEach((value, index) => {
        if (value > 0) {
          allItems.push(
            value.toString() + this._correctEnding(value, labels[index])
          );
        }
      });

      result.innerHTML = allItems.join(', ');
    }
  }

  _correctEnding(value, word) {
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
      // no default
    }

    if (value > 4 && value < 21) return ` ${types[2]}`;
    if (value % 10 === 1) return ` ${types[0]}`;
    if (value % 10 > 1 && value % 10 < 5) return ` ${types[1]}`;
    return ` ${types[2]}`;
  }

  _clear() {
    const result = this.dropdown.querySelector('.js-dropdown__result');
    const values = this.dropdown.querySelectorAll('.js-dropdown__value');

    values.forEach((value) => {
      value.innerHTML = '0';
      value.previousElementSibling.classList.add('dropdown__operator_disabled');
    });

    if (result.classList.contains('guests')) {
      result.innerHTML = 'Сколько гостей';
    } else {
      result.innerHTML = 'Сколько кроватей';
    }

    this._hideClearButton();
  }
}

export { Dropdown };
