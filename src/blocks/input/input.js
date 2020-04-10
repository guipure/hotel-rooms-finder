let inputs = document.querySelectorAll('.input__box_masked');
Array.from(inputs).forEach((input) => input.addEventListener('keydown', (event) => checkKey(event)));


function checkKey(event) {
    const key = event.key;
    let value = event.target.value;
    const regDay = /^\d\d$/;
    const regDayMonth = /^\d\d\.\d\d$/;
    const regDayMonthYear = /^\d{2}\.\d{2}\.\d{4}$/;
    if ((key >= '0' && key <= '9') && !regDayMonthYear.test(value)) {
        if (regDay.test(value + key) || regDayMonth.test(value + key)) {
            event.target.value += key + '.';
            event.preventDefault();
        }
    } else if (key == 'ArrowLeft' 
    || key == 'ArrowRight' 
    || key == 'Delete' 
    || key == 'Backspace') {
        return;
    } else event.preventDefault();
}