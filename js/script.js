'use strict';


const book = document.querySelectorAll('.book');
book[0].before(book[1]);
book[2].before(book[4]);
book[2].before(book[3]);
book[2].before(book[5]);



document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

document.querySelector('.adv').remove();

const titleSecond = document.getElementsByTagName('h2');
titleSecond[2].innerHTML = '<a>Книга 3. this и Прототипы Объектов</a>';


const bookTwoList = book[0].querySelector('ul');
const liBookTwo = bookTwoList.querySelectorAll('li');
liBookTwo[3].after(liBookTwo[6]);
liBookTwo[6].after(liBookTwo[8]);
liBookTwo[9].after(liBookTwo[2]);
const bookFiveList = book[5].querySelector('ul');
const liBookFive = bookFiveList.querySelectorAll('li');
liBookFive[1].after(liBookFive[9]);
liBookFive[3].after(liBookFive[2]);
liBookFive[4].after(liBookFive[2]);
liBookFive[7].after(liBookFive[5]);


const bookSixList = book[2].querySelector('ul');
const newLi = document.createElement('li');
bookSixList.append(newLi);
newLi.textContent = "Глава 8: За пределами ES6";
const liBookSix = bookSixList.querySelectorAll('li');
liBookSix[9].before(liBookSix[10]);