import { DateDropdown } from './DateDropdown';

function onLoad() {
  const dropdowns = $('.js-date-dropdown');
  dropdowns.each((_, element) => new DateDropdown($(element)));
}

window.addEventListener('load', onLoad);
