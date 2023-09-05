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

const range = document.querySelector('input[type=range]');
const span = document.getElementsByClassName('range-value');

const logger = function (event) {
    span[0].textContent = event.target.value + '%';
    appData.rollback = +event.target.value;
}

const appData = {
    title: '',
    screens: [], 
    screenPrice: 0, 
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    additionalServicesPercent: {},
    additionalServicesNumber: {},
    isCalculateScreensOk: true,
    screensCount: 0,

    init: function() {
        appData.addTitle();
        buttonCalculate.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        range.addEventListener('change', logger);

    },

    addTitle: function() {
        document.title = title;
    },

    showResult: function() {
        webLayoutPrice.value = appData.screenPrice;
        countScreens.value = appData.screensCount;
        addServicePrice.value = (appData.servicePricesNumber + appData.servicePricesPercent);
        totalPrice.value = appData.fullPrice;
        fullPriceIncludRollBack.value = appData.servicePercentPrice;
    },

    addScreens: function() {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function(screen, index) {            
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            
            appData.screens.push({
                id: index, 
                name: selectName, 
                price: +select.value * +input.value                
            });

            if (selectName === 'Тип экранов' || input.value === '') {
                appData.isCalculateScreensOk = false;
            }

            appData.screensCount += +input.value;
        });

    },

    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);
        screens = document.querySelectorAll('.screen');
        screens[screens.length - 1].after(cloneScreen);
    },

    addServices: function() {
        otherItemsPercent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.additionalServicesPercent[label.textContent] = +input.value;
            };
            
        });

        otherItemsNumber.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.additionalServicesNumber[label.textContent] = +input.value;
            };
            
        });

    },

    addPrices: function() {
        appData.screenPrice = appData.screens.reduce((total, num) => {return total + num.price}, 0);

        for (let key in appData.additionalServicesNumber) {
            appData.servicePricesNumber += appData.additionalServicesNumber[key];
        };

        for (let key in appData.additionalServicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.additionalServicesPercent[key] / 100);
        };

        appData.fullPrice = (appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent);
        appData.servicePercentPrice = (Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100))));
    },
      
    logger: function() {
        console.log(appData.allServicePrices);
        console.log(appData.screenPrice);
        console.log(appData.screens);
        console.log(appData.getRollbackMessage(appData.fullPrice));
        console.log(appData.servicePercentPrice);
    },

    start: function() {
        appData.isCalculateScreensOk = true;
        appData.addScreens();
        if (!appData.isCalculateScreensOk) return false;
        
        appData.addServices();
        appData.addPrices();

        // appData.logger();
        appData.showResult();
    },
}

appData.init();