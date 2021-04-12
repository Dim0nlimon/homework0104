'use strict';

let money;
let isNumber = function (money) {
  return !isNaN(parseFloat(money)) && isFinite(money);
};

let start = function () {
  do {
    money = prompt('Ваш месячный доход?', '50000');
  } while (!isNumber(money));
};
start();


let appData = {
  expensesList: [],
  amount: [],
  income: {},
  addIncome: [],
  budget: money,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  spendings: 0,
  mission: 200000,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0, //обязательные траты
  period: 3,
  addExpenses: prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет,кафе'),
  asking: function () {

    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Такси');
      while (!isNaN(itemIncome)) {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Такси');
      }
      let cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 1000);
      while (isNaN(cashIncome)) {
        cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 1000);
      }
      appData.income[itemIncome] = cashIncome;
    }

    for (let i = 0; i < 2; i++) {
      appData.expensesList[i] = prompt('Введите обязательную статью расходов?');
      while (!isNaN(appData.expensesList[i])) {
        appData.expensesList[i] = prompt('Введите обязательную статью расходов?');
      }
      let a = appData.expensesList[i];
      appData.amount[i] = prompt('Во сколько это обойдется?');
      let b = appData.amount[i];
      appData.expenses[a] = +b;
      while (isNaN(appData.amount[i])) {
        appData.amount[i] = prompt('Во сколько это обойдется?');
      }
      appData.spendings += Number(appData.amount[i]);
    }
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
    appData.budgetMonth = appData.budget - appData.expensesMonth;
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = prompt('Какой годовой процент?', '10');
      while (isNaN(appData.percentDeposit)) {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      appData.moneyDeposit = prompt('Какая сумма заложена?', '1000');
      while (isNaN(appData.moneyDeposit)) {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '1000');
      }
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
}; //end appData

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

let addExpensesArr = appData.addExpenses.split(',');
for (let i = 0; i < addExpensesArr.length; i++) {
  addExpensesArr[i] = addExpensesArr[i].charAt(0).toUpperCase() + addExpensesArr[i].slice(1);
  if (i > 0) {
    addExpensesArr[i] = ' ' + addExpensesArr[i];
  }
}
let x = addExpensesArr.toString();
console.log('Возможные расходы: ' + x);

appData.getInfoDeposit();

// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//   console.log(key + ': ' + appData[key]);
// }



let countBtn = document.querySelector('#start');

let plusBtnAddIncome = document.getElementsByTagName('button')[0];
let plusBtnAddExpenses = document.getElementsByTagName('button')[1];

let checkBox = document.querySelector('#deposit-check');

let additionalIncomeItems = document.querySelectorAll('.additional_income-item');

let dailyBudget = document.getElementsByClassName('budget_day-value');
let monthExpenses = document.getElementsByClassName('expenses_month-value');
let addIncomeValue = document.getElementsByClassName('additional_income-value');
let addExpensesValue = document.getElementsByClassName('additional_expenses-value');
let incomePeriodValue = document.getElementsByClassName('income_period-value');
let targetMonthValue = document.getElementsByClassName('target_month-value');

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('[placeholder="Наименование"]');
let incomeAmount = document.querySelector('.income-amount');


let potentialIncomeItem = document.querySelector('.additional_income-item');

let expensesItem = document.querySelector('.expenses-items');
let expensesTitle = expensesItem.querySelector('.expenses-title');
let expensesAmount = expensesItem.querySelector('.expenses-amount');

let potentialExpenses = document.querySelector('[placeholder="название"]');

let isDeposit = document.querySelector('.deposit-label');
let depositCheckbox = isDeposit.querySelector('#deposit-check');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');


