import 'air-datepicker';

class DateDropdown {
  constructor(element) {
    this.box = element.children('.js-date-dropdown__box');
    this.calendar = this.box.datepicker({
      prevHtml: '<span class="material-icons">arrow_back</span>',
      nextHtml: '<span class="material-icons">arrow_forward</span>',
      navTitles: {
        days: 'MM <i>yyyy</i>',
      },
      clearButton: true,
      selectOtherYears: false,
      range: true,
      onSelect: this.onSelect.bind(this),
    }).data('datepicker');
    this.datepicker = this.calendar.$datepicker;
    this.input = this.calendar.$el;
    this.dropdown = this.input.closest('.js-date-dropdown');
    this.buttons = this.datepicker.find('.datepicker--buttons');
    this.buttons.empty();
    this.addClearBtn();
    this.addSubmitBtn();
    this.hasTwoInputs = /doubleField/.test(this.dropdown.attr('class'));
    if (this.hasTwoInputs) {
      this.secondInput = this.addTheSecondInput(element);
    }
  }

  clearInputs() {
    if (this.hasTwoInputs) this.secondInput.val('');
    this.calendar.clear();
  }

  addClearBtn() {
    const clear = this.dropdown.find('.js-date-dropdown__clear');
    const clearBtn = clear.find('button');
    clearBtn.on('click', () => this.clearInputs());
    this.buttons.append(clear);
  }

  addSubmitBtn() {
    const submit = this.dropdown.find('.js-date-dropdown__submit');
    const submitBtn = submit.find('button');
    submitBtn.on('click', () => this.calendar.hide());
    this.buttons.append(submit);
  }

  addTheSecondInput(input) {
    const secondField = this.dropdown.children('.field:last-child');
    const secondInputDiv = input.clone();
    const secondInput = secondInputDiv.children('input');
    secondInputDiv.on('click', () => this.calendar.show());
    secondField.append(secondInputDiv);
    return secondInput;
  }

  onSelect() {
    const dates = this.calendar.selectedDates;
    if (this.hasTwoInputs) {
      this.input.val(this.formatDate(dates[0], 'dotted'));
      if (dates.length == 2) this.secondInput.val(this.formatDate(dates[1], 'dotted'));
      else this.secondInput.val('');
    } else {
      this.input.val(this.formatDate(dates[0], 'dayAndMonth'));
      if (dates.length == 2) this.input.val(`${this.formatDate(dates[0], 'dayAndMonth')} - ${this.formatDate(dates[1], 'dayAndMonth')}`);
    }
  }

  formatDate(date, format) {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
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
        const monthNumber = date.getMonth();
        const monthsArray = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const monthName = monthsArray[monthNumber];
        return `${day} ${monthName}`;
      //no default
    }
  }
}

const dropdowns = $('.js-date-dropdown__input');
dropdowns.each((index, element) => new DateDropdown($(element)));
