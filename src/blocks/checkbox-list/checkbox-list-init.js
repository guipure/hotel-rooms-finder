import { CheckboxList } from './CheckboxList';

function onLoad() {
  const $lists = $('.js-checkbox-list');
  $lists.each((index, element) => new CheckboxList($(element)));
}

window.addEventListener('load', onLoad);
