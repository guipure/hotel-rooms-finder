import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';

class DateDropdown {
  constructor($element) {
    this.$dropdown = $element;
    this._init();
  }

  _init() {
    const $calendar = this.$dropdown.children('.js-date-dropdown__calendar');
    this.calendar = $calendar.datepicker({
      prevHtml: '<span class="material-icons">arrow_back</span>',
      nextHtml: '<span class="material-icons">arrow_forward</span>',
      navTitles: {
        days: 'MM <i>yyyy</i>',
      },
      clearButton: true,
      selectOtherYears: false,
      range: true,
      onSelect: this._onSelect.bind(this),
      inline: true,
    }).data('datepicker');
    this.$datepicker = this.calendar.$datepicker;
    this.isInline = $calendar.hasClass('date-dropdown__calendar_inline');
    this.hasTwoInputs = this.$dropdown.hasClass('date-dropdown_doubleField');
    this._addButtons();
    this._addEventListeners();
  }

  _toggleCalendar() {
    this.$datepicker.toggle();
  }

  _hideCalendar() {
    this.$datepicker.hide();
  }

  _clearInputs() {
    this.calendar.clear();
  }

  _documentOnClick(event) {
    const $target = $(event.target);
    const targetIsCell = $target.hasClass('datepicker--cell');
    const targetIsNavAction = !!$target.parents('.datepicker--nav-action').length;
    const targetIsNavTitle = !!$target.closest('.datepicker--nav-title').length;
    const targetIsDropdown = !!$target.parents('.js-date-dropdown').length;
    const targetIsWithinCalendar = targetIsDropdown
      || targetIsNavAction
      || targetIsNavTitle
      || targetIsCell;
    if (targetIsWithinCalendar) return;
    this._hideCalendar();
  }

  _addButtons() {
    const $buttons = this.$datepicker.find('.datepicker--buttons');
    $buttons.empty();
    this._addClearBtn($buttons);
    this._addSubmitBtn($buttons);
  }

  _addClearBtn($buttons) {
    const clear = this.$dropdown.find('.js-date-dropdown__clear');
    const clearBtn = clear.find('button');
    clearBtn.on('click', this._clearInputs.bind(this));
    $buttons.append(clear);
  }

  _addSubmitBtn($buttons) {
    const submit = this.$dropdown.find('.js-date-dropdown__submit');
    const submitBtn = submit.find('button');
    if (!this.isInline) {
      submitBtn.on('click', this._hideCalendar.bind(this));
    }
    $buttons.append(submit);
  }

  _addEventListeners() {
    const $inputs = this.$dropdown.find('.js-date-dropdown__input');
    if (!this.isInline) {
      this.$datepicker.hide();
      $(document).on('click', this._documentOnClick.bind(this));
    }
    $inputs.closest('.js-date-dropdown__input-box')
      .each((index, element) => $(element).on('click', this._toggleCalendar.bind(this)));
  }

  _onSelect() {
    const $inputs = this.$dropdown.find('.js-date-dropdown__input');
    const $input = $inputs.eq(0);
    let $secondInput;
    if (this.hasTwoInputs) {
      $secondInput = $inputs.eq(1);
    }
    const dates = this.calendar.selectedDates;
    if (this.hasTwoInputs) {
      $input.val(this._formatDate(dates[0], 'dotted'));
      if (dates.length === 2) {
        $secondInput.val(this._formatDate(dates[1], 'dotted'));
      } else $secondInput.val('');
    } else {
      const firstDate = this._formatDate(dates[0], 'dayAndMonth');
      $input.val(firstDate);
      if (dates.length === 2) {
        const secondDate = this._formatDate(dates[1], 'dayAndMonth');
        $input.val(`${firstDate} - ${secondDate}`);
      }
    }
  }

  _formatDate(date, format) {
    if (!date) return '';
    let day = date.getDate().toString();
    const monthNumber = date.getMonth();
    const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const monthName = monthNames[monthNumber];
    let month = (monthNumber + 1).toString();
    const year = date.getFullYear().toString();

    switch (format) {
      case 'dotted':
        if (Number(day) < 10) {
          day = `0${day}`;
        }

        if (Number(month) < 10) {
          month = `0${month}`;
        }

        return `${day}.${month}.${year}`;
      case 'dayAndMonth':
        return `${day} ${monthName}`;
      default:
        return date;
    }
  }
}

export { DateDropdown };
