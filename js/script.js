'use strict';

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

// console.log(title);
// console.log(buttons);
// console.log(buttonPlus)
// console.log(otherItemsPercent);
// console.log(otherItemsNumber); 
// console.log(rbInput);
// console.log(rbSpan);
// console.log(allInputs);
// console.log(screens);

const appData = {
    title: '',
    screens: [], 
    screenPrice: 0, 
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    additionalServices: {},

    asking: function () {
        do {          
            appData.title = prompt("Как называется ваш проект?");
        } while (!appData.isProperString(appData.title));
              
        for (let i = 0; i < 2; i++) {
            let name = '';
            let x = 0;

            do {          
                name = prompt("Какие типы экранов нужно разработать?");
            } while (!appData.isProperString(name));           
           
            do {
                x = prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNumber(x));
            appData.screens.push({id: i, name: name, price: parseFloat(x)});
        }

        for (let i = 0; i < 2; i++) {
            let name = '';
            let x = 0;

            do {          
                name = prompt("Какой дополнительный тип услуги нужен?");
            } while (!appData.isProperString(name));            

            do {
                x = prompt("Сколько это будет стоить?");
            } while (!appData.isNumber(x));

            // done by simply concat name to id. Dash is needed to make it unique, otherwise for example:
            // "name1" + 1  is equal to "name" + 11
            // could also be done like Object of Objects {{},{}....} or Object of keys with Array {1: [name, key], ...} 
            appData.additionalServices[(name + "-" + i)] = parseFloat(x);                          
        }
            
        appData.adaptive = (prompt("Нужен ли адаптив на сайте?") == "true" ? true: false);       
    },

    addPrices: function() {
        appData.screenPrice = appData.screens.reduce((total, num) => {return total + num.price}, 0);

        for (let key in appData.additionalServices) {
            appData.allServicePrices += appData.additionalServices[key];
        }
    },

    // Answer prompt string is also checked for null, empty and all spaces as invalid
    isProperString: function(prompt_string) {
        if (prompt_string == null || prompt_string == "" || prompt_string.trim().length == 0) {
            return false;
        } else {            
            return !(!isNaN(parseFloat(prompt_string)) && isFinite(prompt_string));
        }
    },

    isNumber: function (num) {    
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    getFullPrice: function () {
        appData.fullPrice = (appData.screenPrice + appData.allServicePrices);
    },
    
    getTitle: function () {
        appData.title = ((appData.title.trim())[0].toUpperCase() + (appData.title.trim().slice(1).toLowerCase()));
    },
    
    getServicePercentPrices: function () {
        appData.servicePercentPrice = (Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100))));
    },
    
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return ("Даем скидку в 10%");
        } else if (price >=15000 && price < 30000) {
            return ("Даем скидку в 5%");
        } else if (price >= 0) {
            return ("Скидка не предусмотрена");
        } else {
            return ("Что то пошло не так");
        }
    },

    logger: function() {
        console.log(appData.allServicePrices);
        console.log(appData.screenPrice);
        console.log(appData.screens);
        console.log(appData.getRollbackMessage(appData.fullPrice));
        console.log(appData.servicePercentPrice);
    },

    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    }

}

appData.start();