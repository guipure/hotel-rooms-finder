const boxes = document.querySelectorAll('.dropdown__box');
const pluses = document.querySelectorAll('.dropdown__operator_plus');
const minuses = document.querySelectorAll('.dropdown__operator_minus');
const clearBtns = document.querySelectorAll('.dropdown__clear');

for (let box of boxes) {
    box.addEventListener('click', show);
}

for (let plus of pluses) {
    plus.addEventListener('click', () => operator('plus'));
}

for (let minus of minuses) {
    minus.addEventListener('click', () => operator('minus'));
}

for (let btn of clearBtns) {
    const dropdown = btn.closest('.dropdown');
    const result = dropdown.querySelector('.dropdown__result');
    btn.firstElementChild.addEventListener('click', () => clear(dropdown, result));
}

function show() {
    const content = event.currentTarget.nextElementSibling;
    content.classList.toggle('dropdown__content_hidden');
}

function operator(sign) {
    let valueDiv;
    let minusDiv;
    if (sign == 'plus') {
        valueDiv = event.target.previousElementSibling;
        minusDiv = valueDiv.previousElementSibling;
    } else {
        valueDiv = event.target.nextElementSibling;
        minusDiv = event.target;
    }
    let value = Number(valueDiv.innerHTML);
    sign == 'plus' ? value++ : value--;;
    if (value < 0) return;
    if (value == 0) {
        minusDiv.classList.add('dropdown__operator_disabled');
    }
    if (value > 0 && minusDiv.classList.contains('dropdown__operator_disabled')) {
        minusDiv.classList.remove('dropdown__operator_disabled');
    }
    valueDiv.innerHTML = value.toString();
    guestsSum(event.target.closest('.dropdown__content'));
}


function guestsSum(content) {
    const values = content.querySelectorAll('.dropdown__value');
    const result = content.previousElementSibling.querySelector('.dropdown__result');
    let sum = 0;
    let ending;

    for (let v of values) {
        sum += Number(v.innerHTML);
    }

    if (sum > 4 && sum < 21) {
        ending = ' гостей';
    } else if (sum % 10 == 1) {
        ending = ' гость';
    } else if (sum % 10 > 1 && sum % 10 < 5) {
        ending = ' гостя';
    } else ending = ' гостей';

    result.innerHTML = sum.toString() + ending;
}


function clear(dropdown, result) {
    const values = [...dropdown.querySelectorAll('.dropdown__value')];
    values.map((value) => {
        value.innerHTML = '0';
        value.previousElementSibling.classList.add('dropdown__operator_disabled');
    });
    result.innerHTML = 'Сколько гостей';
}