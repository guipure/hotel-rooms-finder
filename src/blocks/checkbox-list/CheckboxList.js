class CheckboxList {
  constructor($element) {
    this._init($element);
  }

  _init($element) {
    const $dropdown = $element.find('.js-checkbox-list__dropdown');
    const $label = $element.children('.js-checkbox-list__label');
    this._addEventListeners($dropdown, $label);

    $dropdown.hide();
  }

  _addEventListeners($dropdown, $label) {
    $label.on('click', this._handleLabelClick.bind(this, $dropdown, $label));
  }

  _handleLabelClick($dropdown, $label) {
    const $icon = $label.find('.js-checkbox-list__icon');

    $icon.toggleClass('checkbox-list__icon_rotated');
    $dropdown.is(':hidden')
      ? $dropdown.slideDown('fast')
      : $dropdown.hide('fast');
  }
}

export { CheckboxList };
