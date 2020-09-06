class BurgerButton {
  constructor(element) {
    this._init(element);
  }

  _init(element) {
    element.addEventListener('click', this._handleBurgerClick.bind(this));
  }

  _handleBurgerClick(event) {
    const burgerButton = event.currentTarget;
    this._toggleButton(burgerButton);
    this._toggleMenu(burgerButton);
  }

  _toggleButton(burgerButton) {
    burgerButton.classList.toggle('header__burger-button_active');
  }

  _toggleMenu(burgerButton) {
    const container = burgerButton.closest('.header__container');
    const menu = container.querySelector('.header__menu');
    const isActive = burgerButton.classList.contains('header__burger-button_active');
    menu.style.display = isActive ? 'block' : 'none';
  }
}

export { BurgerButton };
