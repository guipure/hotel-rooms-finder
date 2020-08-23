import { RangeSlider } from './RangeSlider';

function onLoad() {
  const sliders = $('.js-range-slider__input');
  sliders.each((_, element) => new RangeSlider($(element)));
}

window.addEventListener('load', onLoad);
