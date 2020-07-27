const inputs = document.querySelectorAll('.input__box_masked');
Array.from(inputs).forEach((input) => input.addEventListener('keydown', (event) => checkKey(event)));

function checkKey(event) {
  const { key } = event;
  const { value } = event.target;
  const regDay = /^\d\d$/;
  const regDayMonth = /^\d\d\.\d\d$/;
  const regDayMonthYear = /^\d{2}\.\d{2}\.\d{4}$/;
  const keyIsDigit = key >= '0' && key <= '9';
  const keyIsControl = (
    key === 'ArrowLeft'
    || key === 'ArrowRight'
    || key === 'Delete'
    || key === 'Backspace'
  );
  if (keyIsDigit && !regDayMonthYear.test(value)) {
    if (regDay.test(value + key) || regDayMonth.test(value + key)) {
      event.target.value += `${key}.`;
      event.preventDefault();
    }
  } else if (keyIsControl) {
  } else event.preventDefault();
}
