const title = "Project_Lesson2";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 100;
const rollback = 1;
const fullPrice = 500;
const adaptive = true;

console.log(typeof(title),typeof(fullPrice),typeof(adaptive));
console.log(screens.length);

console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(''));
console.log(fullPrice * (rollback/100));


