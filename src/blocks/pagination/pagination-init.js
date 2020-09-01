import { Pagination } from './Pagination';

function onLoad() {
  const paginationElements = $('.js-pagination');
  paginationElements.each((_, element) => {
    const { pageSize, totalNumber } = element.dataset;
    new Pagination($(element), Number(pageSize), Number(totalNumber));
  });
}

window.addEventListener('load', onLoad);
