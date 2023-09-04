'use strict';

const title = document.getElementsByTagName('h1')[0].innerText
const buttons = document.getElementsByClassName('handler_btn');
const buttonCalculate = buttons[0]; 
const buttonReset = buttons[1];
const buttonPlus = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const rbInput = document.querySelector('.rollback > .main-controls__range > input');
const rbSpan = document.querySelector('.rollback > .main-controls__range > span');
const [webLayoutPrice, countScreens, addServicePrice, totalPrice, fullPriceIncludRollBack] = [...document.getElementsByClassName('total-input')];

let screens = document.querySelectorAll('.screen');

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