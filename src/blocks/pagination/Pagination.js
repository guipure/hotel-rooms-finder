import 'paginationjs';

class Pagination {
  constructor($element, pageSize, totalNumber) {
    $element.pagination({
      dataSource: this._getRange(totalNumber),
      pageSize,
      pageRange: 1,
      autoHidePrevious: true,
      autoHideNext: true,
      showFirstOnEllipsisShow: false,
      footer: this._getFooter.bind(this),
      nextText: '<i class="pagination__icon material-icons">arrow_forward</i>',
      prevText: '<i class="pagination__icon material-icons">arrow_back</i>',
      ulClassName: 'pagination__ul',
      activeClassName: 'pagination_active',
    });
  }

  _getRange(number) {
    const result = [];

    for (let i = 1; i <= number; i++) {
      result.push(i);
    }

    return result;
  }

  _getFooter(currentPage, totalPage, totalNumber) {
    const pageRange = Math.ceil(totalNumber / totalPage);
    const isExceeded = pageRange * currentPage > totalNumber;
    const to = isExceeded ? totalNumber : pageRange * currentPage;
    const from = pageRange * (currentPage - 1) + 1;
    const total = totalNumber > 100
      ? `${(100 * Math.floor(totalNumber / 100)).toString()}+`
      : totalNumber.toString();

    return `<span class="pagination__text">${from} – ${to} из ${total} вариантов аренды</span>`;
  }
}

export { Pagination };
