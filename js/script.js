// Получить заголовок "Калькулятор верстки" через метод getElementsByTagName. 
// (тэг h1, получить именно элемент, а не коллекцию)
const title = document.getElementsByTagName('h1')[0].innerText

// Получить кнопки "Рассчитать" и "Сброс" через метод getElementsByClassName. (класс handler_btn)
const buttons = document.getElementsByClassName('handler_btn');
const buttonCalculate = buttons[0]; 
const buttonReset = buttons[1];

// Получить кнопку "+" под выпадающим списком через метод querySelector. (класс screen-btn)
const buttonPlus = document.querySelector('.screen-btn')

// Получить все элементы с классом other-items в две разные переменные. 
// В первую элементы у которых так же присутствует класс percent, 
// во вторую элементы у которых так же присутствует класс number через метод querySelectorAll.
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

// Получить input type=range через его родителя с классом rollback одним запросом через метод querySelector.
const rbInput = document.querySelector('.rollback > .main-controls__range > input');

// Получить span с классом range-value через его родителя с классом rollback одним запросом через метод querySelector.
const rbSpan = document.querySelector('.rollback > .main-controls__range > span');

// Получить все инпуты с классом total-input справа через метод getElementsByClassName. 
// (класс total-input, получить именно элементы, а не коллекции)
const allInputs = [...document.getElementsByClassName('total-input')];

// Получить все блоки с классом screen в изменяемую переменную ( let ) 
// через метод querySelectorAll (далее мы будем переопределять ее значение)
let screens = document.querySelectorAll('.screen');

console.log(title);
console.log(buttons);
console.log(buttonPlus)
console.log(otherItemsPercent);
console.log(otherItemsNumber); 
console.log(rbInput);
console.log(rbSpan);
console.log(allInputs);
console.log(screens);
