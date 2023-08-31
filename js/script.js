'use strict';

// 1. Восстановить порядок книг
const books =  document.querySelectorAll('div.book');
books[0].before(books[1]);
books[2].before(books[4]);
books[5].after(books[2]);

// 2. Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

// 3. Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
const textChapters = document.querySelectorAll('div.book > h2 > a');
textChapters.forEach(function (node) {
    if ((node.innerText).includes('Книга 3')) {
        node.innerText = 'Книга 3. this и Прототипы Объектов';  
    };
}
);

// 4. Удалить рекламу со страницы
const advBanner = document.querySelector(".adv");
advBanner.style.display = 'none';

// 5. Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const listChapter2 = books[0].querySelectorAll('li')
const listChapter5 = books[5].querySelectorAll('li')
listChapter2[10].before(listChapter2[2])
listChapter2[4].before(listChapter2[6])
listChapter2[4].before(listChapter2[8])

listChapter5[2].before(listChapter5[9])
listChapter5[8].before(listChapter5[5])
listChapter5[4].after(listChapter5[2])

// 6. в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const listChapter6 = books[2].querySelector('ul')
let newItem = document.createElement('li');
newItem.textContent = 'Глава 8: За пределами ES6';
listChapter6.insertBefore(newItem,listChapter6.lastElementChild)