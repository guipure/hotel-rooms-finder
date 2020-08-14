import 'paginationjs';

class Pagination {
  constructor($element, pageSize, totalNumber) {
    $element.pagination({
      dataSource: this.getRange(totalNumber),
      pageSize,
      pageRange: 1,
      autoHidePrevious: true,
      autoHideNext: true,
      showFirstOnEllipsisShow: false,
      footer: this.getFooter.bind(this),
      nextText: '<i class="pagination__icon material-icons">arrow_forward</i>',
      prevText: '<i class="pagination__icon material-icons">arrow_back</i>',
      ulClassName: 'pagination__ul',
      activeClassName: 'pagination_active',
    });
  }

  getRange(number) {
    const result = [];
    for (let i = 1; i <= number; i++) {
      result.push(i);
    }
    return result;
  }

  getFooter(currentPage, totalPage, totalNumber) {
    const pageRange = Math.ceil(totalNumber / totalPage);
    const isExceeded = pageRange * currentPage > totalNumber;
    const to = isExceeded ? totalNumber : pageRange * currentPage;
    const from = pageRange * (currentPage - 1) + 1;
    let total;

    if (totalNumber > 100) {
      total = `${(100 * Math.floor(totalNumber / 100)).toString()}+`;
    } else {
      total = totalNumber.toString();
    }
    return `<span class="pagination__text">${from} – ${to} из ${total} вариантов аренды</span>`;
  }
}

const paginations = $('.js-pagination');
paginations.each((index, element) => {
  const { pageSize, totalNumber } = element.dataset;
  new Pagination($(element), Number(pageSize), Number(totalNumber));
});
