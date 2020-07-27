import 'ion-rangeslider';

class Slider {
  constructor(element) {
    this.resultSpan = element.siblings('.js-range-slider__result');
    element.ionRangeSlider({
      type: 'double',
      step: 100,
      hide_min_max: true,
      hide_from_to: true,
      onChange: this.showData.bind(this),
      onStart: this.showData.bind(this),
    });
  }

  showData(data) {
    this.resultSpan.html(`${data.from_pretty}₽ - ${data.to_pretty}₽`);
  }
}

const sliders = $('.js-range-slider');
sliders.each((index, element) => new Slider($(element)));
