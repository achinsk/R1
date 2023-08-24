'use strict';

let title, screens, screenPrice, adaptive; 
const rollback = 10;

const isNumber = function (num) {    
    return !isNaN(parseFloat(num)) && isFinite(num);
}
const asking = function () {
    title = prompt("Как называется ваш проект?");
    screens = prompt("Какие типы экранов нужно разработать?");
    
    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(screenPrice));
    
    // Строка добавлена, иначе typeOf(screenPrice) = string
    screenPrice = parseFloat(screenPrice);

    adaptive = (prompt("Нужен ли адаптив на сайте?") == "true" ? true: false);
}

const getAllServicePrices = function () {
    let sum = 0;
    let x;
    
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            const additionalService1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            const additionalService2 = prompt("Какой дополнительный тип услуги нужен?");
        }
        do {
            x = prompt("Сколько это будет стоить?");
        } while (!isNumber(x));
        sum += parseFloat(x);                
    }
    return sum;
}

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

function getFullPrice() {
    return (screenPrice + allServicePrices);
}

function getTitle() {
    return ((title.trim())[0].toUpperCase() + (title.trim().slice(1).toLowerCase()));
}

function getServicePercentPrices() {
    return (Math.ceil(fullPrice - (fullPrice * (rollback/100))));
}

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return ("Даем скидку в 10%");
    } else if (price >=15000 && price < 30000) {
        return ("Даем скидку в 5%");
    } else if (price >= 0) {
        return ("Скидка не предусмотрена");
    } else {
        return ("Что то пошло не так");
    }
}

asking();
const allServicePrices = getAllServicePrices();
const fullPrice = getFullPrice();
const servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);