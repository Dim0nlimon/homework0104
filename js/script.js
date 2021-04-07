'use strict';

let isNumber = function (money) {
  return !isNaN(parseFloat(money)) && isFinite(money);
};


let money,
  income = '500';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit;
let mission = 200000;
let period = 6;

const showTypeOf = function (finances) {
  return typeof finances;
};


console.log(showTypeOf(income));


let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
  console.log(money);

};

start();

console.log(showTypeOf(money));



addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = prompt('Есть ли у вас депозит в банке?');

if (deposit > 0) {
  deposit = true;
} else {
  deposit = false;
}
console.log(showTypeOf(deposit));


let expenses = [];
let amount = [];
let spendings = 0;

const getExpensesMonth = function () {

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    amount[i] = prompt('Во сколько это обойдется?');
    while (isNaN(parseFloat(amount[i]))) {
      amount[i] = prompt('Во сколько это обойдется?');
    }

    spendings += Number(amount[i]);
  }
  console.log('Расходы за месяц: ', spendings);
};

getExpensesMonth();


addExpenses = addExpenses.toLowerCase();
let addExpensesArr = addExpenses.split(', ');
console.log('Возможные расходы: ' + addExpensesArr);



const getAccumulatedMonth = function () {
  return money - spendings;
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};

if (getTargetMonth() > 0) {
  console.log('Cрок достижения цели: ', getTargetMonth());
} else {
  console.log('Цель не будет достигнута');
}


let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);


const getStatusIncome = function (budgetDay) {
  if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay <= 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay < 0) {
    console.log('Что то пошло не так');
  }
};

getStatusIncome(budgetDay);