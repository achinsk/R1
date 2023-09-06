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

let screensNode = document.querySelectorAll('.screen');

const range = document.querySelector('input[type=range]');
const span = document.getElementsByClassName('range-value');

const logger = function (event) {
    span[0].textContent = event.target.value + '%';
    this.rollback = +event.target.value;
    if (this.fullPrice !==0 ) {
        fullPriceIncludRollBack.value = (Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback/100))));
    }
};

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
        this.addTitle();
        buttonCalculate.addEventListener('click', this.start.bind(this));
        buttonPlus.addEventListener('click', this.addScreenBlock);
        range.addEventListener('change', logger.bind(this));

    },

    addTitle: function() {
        document.title = title;
    },

    showResult: function() {
        webLayoutPrice.value = this.screenPrice;
        countScreens.value = this.screensCount;
        addServicePrice.value = (this.servicePricesNumber + this.servicePricesPercent);
        totalPrice.value = this.fullPrice;
        fullPriceIncludRollBack.value = this.servicePercentPrice;
    },

    addScreens: function() {
        this.screens = [];
        screensNode = document.querySelectorAll('.screen');

        screensNode.forEach(((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            
            this.screens.push({
                id: index, 
                name: selectName, 
                price: +select.value * +input.value                
            });

            if (selectName === 'Тип экранов' || input.value === '') {
                this.isCalculateScreensOk = false;
            } 

            this.screensCount += +input.value;
        }),this);

    },

    addScreenBlock: function() {
        const cloneScreen = screensNode[0].cloneNode(true);
        screensNode = document.querySelectorAll('.screen');
        screensNode[screensNode.length - 1].after(cloneScreen);
    },

    addServices: function() {
        otherItemsPercent.forEach(((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.additionalServicesPercent[label.textContent] = +input.value;
            };
            
        }),this);

        otherItemsNumber.forEach(((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.additionalServicesNumber[label.textContent] = +input.value;
            };
            
        }),this);

    },

    addPrices: function() {
        this.screenPrice = this.screens.reduce((total, num) => {return total + num.price}, 0);

        for (let key in this.additionalServicesNumber) {
            this.servicePricesNumber += this.additionalServicesNumber[key];
        };

        for (let key in this.additionalServicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.additionalServicesPercent[key] / 100);
        };

        this.fullPrice = (this.screenPrice + this.servicePricesNumber + this.servicePricesPercent);
        this.servicePercentPrice = (Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback/100))));
    },
      
    start: function() {
        this.isCalculateScreensOk = true;
        this.addScreens();
        if (!this.isCalculateScreensOk) return false;
        this.addServices();
        this.addPrices();
        this.showResult();
    },
};

(() => appData.init())();