import { Pagination } from './Pagination';

function onLoad() {
  const paginations = $('.js-pagination');
  paginations.each((index, element) => {
    const { pageSize, totalNumber } = element.dataset;
    new Pagination($(element), Number(pageSize), Number(totalNumber));
  });
}

window.addEventListener('load', onLoad);
