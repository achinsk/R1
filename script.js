'use strict';

const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = parseInt(prompt("Сколько будет стоить данная работа?"));
const rollback = 10;
const adaptive = (prompt("Нужен ли адаптив на сайте?") == "true" ? true: false);

const additionalService1 = prompt("Какой дополнительный тип услуги нужен?");
const additionalServicePrice1 = parseInt(prompt("Сколько это будет стоить?"));
const additionalService2 = prompt("Какой дополнительный тип услуги нужен?");
const additionalServicePrice2 = parseInt(prompt("Сколько это будет стоить?"));

const fullPrice = (screenPrice + additionalServicePrice1 + additionalServicePrice2);
const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)));

console.log(servicePercentPrice);

if (fullPrice >= 30000) {
    console.log("Даем скидку в 10%");
} else if (fullPrice >=15000 && fullPrice < 30000) {
    console.log("Даем скидку в 5%");
} else if (fullPrice >= 0) {
    console.log("Скидка не предусмотрена");
} else {
    console.log("Что то пошло не так");
}

console.log(typeof(title),typeof(fullPrice),typeof(adaptive));
console.log(screens.length);

console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(''));
console.log(fullPrice * (rollback/100));