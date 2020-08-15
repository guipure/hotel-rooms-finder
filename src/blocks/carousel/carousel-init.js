import { Carousel } from './Carousel';

function onLoad() {
  const carousels = Array.from(document.querySelectorAll('.js-carousel'));
  carousels.forEach((carousel) => new Carousel(carousel));
}

window.addEventListener('load', onLoad);
