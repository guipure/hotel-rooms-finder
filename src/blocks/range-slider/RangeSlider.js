import bind from 'bind-decorator';
import 'ion-rangeslider';
import 'ion-rangeslider/css/ion.rangeSlider.css';

class RangeSlider {
  constructor(element) {
    this._init(element);
  }

  _init(element) {
    this.resultSpan = element.siblings('.js-range-slider__result');

    element.ionRangeSlider({
      type: 'double',
      step: 100,
      hide_min_max: true,
      hide_from_to: true,
      onChange: this._showData,
      onStart: this._showData,
    });
  }

  @bind
  _showData(data) {
    this.resultSpan.html(`${data.from_pretty}₽ - ${data.to_pretty}₽`);
  }
}

export { RangeSlider };
