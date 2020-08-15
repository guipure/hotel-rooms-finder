class CheckboxList {
  constructor($element) {
    const $dropdown = $element.find('.js-checkbox-list__dropdown');
    const $label = $element.children('.js-checkbox-list__label');
    $label.on('click', this._slide.bind(this, $dropdown, $label));
    $dropdown.hide();
  }

  _slide($dropdown, $label) {
    const $icon = $label.find('.js-checkbox-list__icon');
    $icon.toggleClass('checkbox-list__icon_rotated');
    if ($dropdown.is(':hidden')) {
      $dropdown.slideDown('fast');
    } else $dropdown.hide('fast');
  }
}

export { CheckboxList };
