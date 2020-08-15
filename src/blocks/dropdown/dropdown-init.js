import { Dropdown } from './Dropdown';

function onLoad() {
  const dropdowns = document.querySelectorAll('.js-dropdown');
  dropdowns.forEach((dropdown) => new Dropdown(dropdown));
}

window.addEventListener('load', onLoad);
