'use strict';

let title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = parseInt(prompt("Сколько будет стоить данная работа?"));
const rollback = 10;
const adaptive = (prompt("Нужен ли адаптив на сайте?") == "true" ? true: false);

const additionalService1 = prompt("Какой дополнительный тип услуги нужен?");
const additionalServicePrice1 = parseInt(prompt("Сколько это будет стоить?"));
const additionalService2 = prompt("Какой дополнительный тип услуги нужен?");
const additionalServicePrice2 = parseInt(prompt("Сколько это будет стоить?"));

// 1. Объявить функцию getAllServicePrices. 
// Функция возвращает сумму всех дополнительных услуг. 
// Результат сохраняем в переменную allServicePrices. Тип - function expression 
const x = function getAllServicePrices(a, b) {
    return (a + b);
}
const allServicePrices = x(additionalServicePrice1, additionalServicePrice2);

// 2. Объявить функцию getFullPrice. Тип - function declaration
function getFullPrice() {
    return (screenPrice + allServicePrices);
}
const fullPrice = getFullPrice();

// 3. Объявить функцию getTitle
// MY COMMENT -> и вызываю функцию чтобы обновить title
function getTitle() {
    return ((title.trim())[0].toUpperCase() + (title.trim().slice(1).toLowerCase()));
}
title = getTitle();

// 4. Объявить функцию getServicePercentPrices
function getServicePercentPrices() {
    return (Math.ceil(fullPrice - (fullPrice * (rollback/100))));
}
const servicePercentPrice = getServicePercentPrices();

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
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

// 1. вызовы функции showTypeOf
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

// 2. вывод строки с типами экранов для разработки screens
console.log(screens);

// 3.сообщение о скидке пользователю (вызовы функции getRollbackMessage)
console.log(getRollbackMessage(fullPrice));

// 4. стоимость за вычетом процента отката посреднику (вызовы функции getServicePercentPrices)
console.log(servicePercentPrice);