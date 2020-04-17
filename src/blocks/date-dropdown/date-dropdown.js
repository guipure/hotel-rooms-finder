import 'air-datepicker'


class DateDropdown {
    constructor(element, hasTwoInputs, isRange, isInline) {
        this.box = element.children('.js-date-dropdown__box');
        this.calendar = this.box.datepicker({
            prevHtml: '<span class="material-icons">arrow_back</span>',
            nextHtml: '<span class="material-icons">arrow_forward</span>',
            navTitles: {
                days: 'MM <i>yyyy</i>'
            },
            clearButton: true,
            inline: isInline ? true : false,
            selectOtherYears: false,
            range: isRange ? true : false,
            onSelect: this.onSelect.bind(this),
        }).data('datepicker');
        this.datepicker = this.calendar.$datepicker;
        this.input = this.calendar.$el;
        this.dropdown = this.input.closest('.js-date-dropdown');
        this.buttons = this.datepicker.find('.datepicker--buttons');        
        this.buttons.empty();
        this.addClearBtn();
        this.addSubmitBtn();
        if (hasTwoInputs) {
            this.secondInput = this.addTheSecondInput(element);
        }
       
    }


    clearInputs() {
        if (this.secondInput) this.secondInput.val('');
        this.calendar.clear();
    }


    addClearBtn() {
        const clear = this.dropdown.find('.js-date-dropdown__clear');
        const clearBtn = clear.children('button');
        clearBtn.on('click', () => this.clearInputs());
        this.buttons.append(clear);
    }


    addSubmitBtn() {
        const submit = this.dropdown.find('.js-date-dropdown__submit');
        const submitBtn = submit.children('button');
        submitBtn.on('click', () => this.calendar.hide());
        this.buttons.append(submit);
    }


    addTheSecondInput(input) {
        const secondInputDiv = input.clone();
        const secondInput = secondInputDiv.children('input');
        secondInputDiv.on('click', () => this.calendar.show());
        this.dropdown.append(secondInputDiv);
        return secondInput;
    }


    onSelect() {
        const dates = this.calendar.selectedDates;
        this.input.val(this.formatDate(dates[0]));
        if (dates.length == 2) this.secondInput.val(this.formatDate(dates[1]));
        else this.secondInput.val('');
    }


    formatDate(date) {
        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();

        if (Number(day) < 10) {
            day = '0' + day;
        }

        if (Number(month) < 10) {
            month = '0' + month;
        }

        return day + '.' + month + '.' + year;
    }
}

const dropdowns = $('.js-date-dropdown__input');
dropdowns.each((index, element) => new DateDropdown($(element), true, true));