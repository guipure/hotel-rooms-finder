import 'paginationjs';

class Pagination {
  constructor(element, pageSize, totalNumber) {
    element.pagination({
      dataSource: this.range(totalNumber),
      pageSize,
      pageRange: 1,
      autoHidePrevious: true,
      autoHideNext: true,
      showFirstOnEllipsisShow: false,
      footer: this.footer.bind(this),
      nextText: '<i class="pagination__icon material-icons">arrow_forward</i>',
      prevText: '<i class="pagination__icon material-icons">arrow_back</i>',
      ulClassName: 'js-pagination__ul',
      activeClassName: 'js-pagination_active',
    });
  }

  range(number) {
    const result = [];
    for (let i = 1; i <= number; i++) {
      result.push(i);
    }
    return result;
  }

  footer(currentPage, totalPage, totalNumber) {
    const pageRange = Math.ceil(totalNumber / totalPage);
    const isExeeded = pageRange * currentPage > totalNumber;
    const to = isExeeded ? totalNumber : pageRange * currentPage;
    const from = pageRange * (currentPage - 1) + 1;
    let total;

    if (totalNumber > 100) {
      total = `${(100 * Math.floor(totalNumber / 100)).toString()}+`;
    } else {
      total = totalNumber.toString();
    }
    return `${from} – ${to} из ${total} вариантов аренды`;
  }
}

const paginations = $('.js-pagination');
paginations.each((index, element) => new Pagination($(element), Number(element.dataset.pageSize), Number(element.dataset.totalNumber)));
