class CheckboxList {
  constructor(element) {
    const dropdown = element.children('.js-checkbox-list__dropdown');
    const label = element.children('.js-checkbox-list__label');
    label.click(() => this.slide(dropdown, label));
  }

  slide(dropdown, label) {
    const icon = label.children('.js-checkbox-list__icon');
    icon.toggleClass('js-checkbox-list__icon_rotated');
    if (dropdown.is(':hidden')) {
      dropdown.slideDown('fast');
    } else dropdown.hide('fast');
  }
}

const lists = $('.js-checkbox-list');
lists.each((index, element) => new CheckboxList($(element)));
