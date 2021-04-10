'use strict';

let money;

let isNumber = function (money) {
  return !isNaN(parseFloat(money)) && isFinite(money);
};

let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();


let appData = {
  expensesList: [],
  amount: [],
  budget: money,
  deposit: false,
  spendings: 0,
  mission: 200000,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0, //обязательные траты
  addExpenses: prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  asking: function () {
    for (let i = 0; i < 2; i++) {
      appData.expensesList[i] = prompt('Введите обязательную статью расходов?');
      let a = appData.expensesList[i];
      appData.amount[i] = prompt('Во сколько это обойдется?');
      let b = appData.amount[i];
      appData.expenses[a] = +b;
      while (isNaN(parseFloat(appData.amount[i]))) {
        appData.amount[i] = prompt('Во сколько это обойдется?');
      }
      appData.spendings += Number(appData.amount[i]);
    }
  },
  expenses: {},
  getExpensesMonth: function () {
    let expensesSum = 0;
    for (let prop in appData.expenses) {
      expensesSum += appData.expenses[prop];
    }
    appData.expensesMonth = expensesSum;
  },

  getBudget: function () {
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
      console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      console.log('Что то пошло не так');
    }
  },

}; //end app

appData.asking();
appData.getExpensesMonth();
appData.getBudget();


console.log('Расходы за месяц: ' + appData.budgetMonth);
if (appData.getTargetMonth() > 0) {
  console.log('Cрок достижения цели: ', appData.getTargetMonth());
} else {
  console.log('Цель не будет достигнута');
}
appData.getStatusIncome();

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);

}