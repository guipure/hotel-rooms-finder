import { CheckboxList } from './CheckboxList';

function onLoad() {
  const $lists = $('.js-checkbox-list');
  $lists.each((_, element) => new CheckboxList($(element)));
}

window.addEventListener('load', onLoad);
