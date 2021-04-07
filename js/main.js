'use strict';

let isNumber = function (money) { // true if number
  return !isNaN(parseFloat(money)) && isFinite(money);
};
console.log(isNumber(4)); //true
console.log(!isNumber(4)); //false


let expenses;
let amount = 0;
let spendings = 0;

const getExpensesMonth = function () {

  expenses = prompt('Введите обязательную статью расходов?');
  amount = prompt('Во сколько это обойдется?');
  while (isNaN(parseFloat(amount))) {
    amount = prompt('Во сколько это обойдется?');
  }
}

getExpensesMonth();