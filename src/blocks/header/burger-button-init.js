import { BurgerButton } from './BurgerButton';

function onLoad() {
  const burgerButtons = document.querySelectorAll('.js-header__burger-button');
  burgerButtons.forEach((burgerBtn) =>  new BurgerButton(burgerBtn));
}

window.addEventListener('load', onLoad);
