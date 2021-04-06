'use strict';

let money = 30000;
let income = '500';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit;
let mission = 200000;
let period = 6;

const showTypeOf = function (finances) {
  return typeof finances;
};

console.log(showTypeOf(money));
console.log(showTypeOf(income));




money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = prompt('Есть ли у вас депозит в банке?');

if (deposit > 0) {
  deposit = true;
} else {
  deposit = false;
}
console.log(showTypeOf(deposit));


let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');


const getExpensesMonth = function () {
  return (Number(amount1) + Number(amount2));
};
console.log('Расходы за месяц: ', getExpensesMonth());

addExpenses = addExpenses.toLowerCase();
let addExpensesArr = addExpenses.split(', ');
console.log('Возможные расходы: ' + addExpensesArr);



const getAccumulatedMonth = function () {
  return money - getExpensesMonth();
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
  return mission / accumulatedMonth;
};
console.log('Cрок достижения цели: ', getTargetMonth());


let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);


const getStatusIncome = function (budgetDay) {
  if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay <= 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay < 0) {
    console.log('Что то пошло не так');
  }
};

getStatusIncome(budgetDay);