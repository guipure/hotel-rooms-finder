import 'jquery.maskedinput/src/jquery.maskedinput';

$.mask.definitions.y = '[12]';
$.mask.definitions.m = '[01]';
$.mask.definitions.d = '[0-3]';

$('.js-input__box_masked').each((index, element) => $(element).mask('d9.m9.y999'));
