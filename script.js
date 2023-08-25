'use strict';

const appData = {
    title: '',
    screens: '', 
    screenPrice: 0, 
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    additionalService1: '', 
    additionalService2: '',

    asking: function () {
        appData.title = prompt("Как называется ваш проект?");
        appData.screens = prompt("Какие типы экранов нужно разработать?");
        
        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
        } while (!appData.isNumber(appData.screenPrice));
                
        appData.screenPrice = parseFloat(appData.screenPrice);    
        appData.adaptive = (prompt("Нужен ли адаптив на сайте?") == "true" ? true: false);

        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
    },

    isNumber: function (num) {    
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    getAllServicePrices: function () {
        let sum = 0;
        let x;
        
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.additionalService1 = prompt("Какой дополнительный тип услуги нужен?");
            } else if (i === 1) {
                appData.additionalService2 = prompt("Какой дополнительный тип услуги нужен?");
            }
            do {
                x = prompt("Сколько это будет стоить?");
            } while (!appData.isNumber(x));
            sum += parseFloat(x);                
        }
        return sum;
    },

    getFullPrice: function () {
        return (appData.screenPrice + appData.allServicePrices);
    },
    
    getTitle: function () {
        return ((appData.title.trim())[0].toUpperCase() + (appData.title.trim().slice(1).toLowerCase()));
    },
    
    getServicePercentPrices: function () {
        return (Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100))));
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
        console.log(appData.screens);
        console.log(appData.getRollbackMessage(appData.fullPrice));
        console.log(appData.servicePercentPrice);

        for (let key in appData) {
            console.log(key);
        }
    },

    start: function() {
        appData.asking();
        appData.logger();
    },
}

appData.start();