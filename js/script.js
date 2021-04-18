 'use strict';

 const countBtn = document.querySelector('#start'); //рассчитать
 const incomePlus = document.getElementsByTagName('button')[0]; // первый +
 const expensesPlus = document.getElementsByTagName('button')[1]; //второй +
 const checkBox = document.querySelector('#deposit-check'); // deposit checkbox
 const additionalIncomeItems = document.querySelectorAll('.additional_income-item'); // возможный доход наименование
 const dailyBudget = document.getElementsByClassName('budget_day-value');
 const monthExpenses = document.getElementsByClassName('expenses_month-value');
 const additionalIncomeValue = document.querySelector('.additional_income-value');
 const incomePeriodValue = document.querySelector('.income_period-value');
 let targetMonthValue = document.querySelector('.target_month-value');
 const salaryAmount = document.querySelector('.salary-amount'); //input месячный доход
 const incomeTitle = document.querySelector('[placeholder="Наименование"]');
 const incomeAmount = document.querySelector('.income-amount');
 const potentialIncomeItem = document.querySelector('.additional_income-item');
 const expensesItem = document.querySelector('.expenses-items'); //обязательные расходы оба input
 const expensesTitle = expensesItem.querySelector('.expenses-title'); //обязательные расходы наименование
 //  const expensesAmount = expensesItem.querySelector('.expenses-amount'); //обязательные расходы сумма
 let expensesItems = document.querySelectorAll('.expenses-items');
 const potentialExpenses = document.querySelector('[placeholder="название"]');
 const isDeposit = document.querySelector('.deposit-label');
 const depositCheckbox = isDeposit.querySelector('#deposit-check');
 const depositAmount = document.querySelector('.deposit-amount');
 const budgetDayValue = document.querySelector('.budget_day-value');
 const budgetMonthValue = document.querySelector('.budget_month-value');
 const expensesMonthValue = document.querySelector('.expenses_month-value');
 const depositPercent = document.querySelector('.deposit-percent');
 const targetAmount = document.querySelector('.target-amount');
 const periodSelect = document.querySelector('.period-select'); //бегунок
 let periodAmount = document.querySelector('.period-amount'); //число под бегунком
 let additionalExpensesValue = document.querySelector('.additional_expenses-value');
 const additionalExpensesItem = document.querySelector('.additional_expenses-item');
 const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
 let incomeItems = document.querySelectorAll('.income-items');



 countBtn.setAttribute('disabled', true);


 let isNumber = function (money) {
   return !isNaN(parseFloat(money)) && isFinite(money);
 };

 let appData = {
   amount: [],
   budget: 0,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0, //обязательные траты
   income: {},
   incomeMonth: 0,
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   spendings: 0,
   start: function () {

     appData.budget = +salaryAmount.value;
     appData.getExpenses();
     appData.getIncome();
     appData.getExpensesMonth();
     appData.getAddExpenses();
     appData.getAddIncome();
     appData.getBudget();
     appData.showResult();
   },

   showResult: function () {
     budgetMonthValue.value = appData.budgetMonth;
     budgetDayValue.value = appData.budgetDay;
     expensesMonthValue.value = appData.expensesMonth;
     additionalExpensesValue.value = appData.addExpenses.join(', ');
     additionalIncomeValue.value = appData.addIncome.join(', ');
     targetMonthValue.value = Math.ceil(appData.getTargetMonth());
     periodSelect.addEventListener('input', appData.periodSelectChange());
     incomePeriodValue.value = appData.calcPeriod();
   },

   addExpensesBlock: function () {
     let cloneExpensesItem = expensesItems[0].cloneNode(true);
     expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
     //добавляет узел(cloneExpensesItem)в список дочерних элтов родителя(expensesItem.parentNode)перед узлом(expensesPlus)
     expensesItems = document.querySelectorAll('.expenses-items');
     if (expensesItems.length === 3) {
       expensesPlus.style.display = 'none';
     }
   },
   addIncomeBlock: function () {
     let cloneIncomeItem = incomeItems[0].cloneNode(true);
     incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
     //добавляет узел(cloneExpensesItem)в список дочерних элтов родителя(incomeItems.parentNode)перед узлом(incomePlus)
     incomeItems = document.querySelectorAll('.income-items');
     if (incomeItems.length === 3) {
       incomePlus.style.display = 'none';
     }
   },
   getExpenses: function () {
     expensesItems.forEach(function (item) {
       let itemExpenses = item.querySelector('.expenses-title').value;
       let cashExpenses = item.querySelector('.expenses-amount').value;
       if (itemExpenses !== '' && cashExpenses !== '') {
         appData.expenses[itemExpenses] = cashExpenses;
       }
     });
   },
   getIncome: function () {
     incomeItems.forEach(function (item) {
       let itemIncome = item.querySelector('.income-title').value;
       let itemExpenses = item.querySelector('.income-amount').value;
       if (itemIncome !== '' && itemExpenses !== '') {
         appData.income[itemIncome] = itemExpenses;
       }
     });

     for (let key in appData.income) {
       appData.incomeMonth += +appData.income[key];
     }
   },

   getAddExpenses: function () {
     let addExpenses = additionalExpensesItem.value.split(',');
     addExpenses.forEach(function (item) {
       item = item.trim();
       if (item !== '') {
         appData.addExpenses.push(item);
       }
     });
   },

   getAddIncome: function () {
     additionalIncomeItem.forEach(function (item) {
       let itemValue = item.value.trim();
       if (itemValue !== '') {
         appData.addIncome.push(itemValue);
       }
     });
   },

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
     appData.deposit = confirm('Есть ли у вас депозит в банке?');
   },

   getExpensesMonth: function () {
     let expensesSum = 0;
     for (let prop in appData.expenses) {
       expensesSum += +appData.expenses[prop];
     }
     appData.expensesMonth = expensesSum;
   },

   getBudget: function () {
     appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
     appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },

   getTargetMonth: function () {
     return targetAmount.value / appData.budgetMonth;
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

   calcPeriod: function () {
     return appData.budgetMonth * periodSelect.value;
   },
   periodSelectChange: function () {
     periodAmount.innerHTML = periodSelect.value;
     incomePeriodValue.value = appData.calcPeriod();
   },
   btnEnabled: function () {
     if (+salaryAmount.value > 0 && salaryAmount.value !== '') {
       countBtn.removeAttribute('disabled');
     } else {
       countBtn.setAttribute('disabled', true);
     }

   }
 }; //end appData

 countBtn.addEventListener('click', appData.start); //рассчитать
 expensesPlus.addEventListener('click', appData.addExpensesBlock); // добавление поля обязательных расходов
 incomePlus.addEventListener('click', appData.addIncomeBlock); // добавление поля обязательных расходов
 periodSelect.addEventListener('input', appData.periodSelectChange);
 salaryAmount.addEventListener('input', appData.btnEnabled);



 appData.getStatusIncome();
 appData.getInfoDeposit();


 //  let j = '';
 //  let addExpensesArr = appData.addExpenses.split(',');
 //  for (let i = 0; i < addExpensesArr.length; i++) {
 //    addExpensesArr[i] = addExpensesArr[i].toLowerCase(); //lowered
 //    addExpensesArr[i] = addExpensesArr[i].trim(); //trimmed
 //    addExpensesArr[i] = addExpensesArr[i].charAt(0).toUpperCase() + addExpensesArr[i].substr(1); //uppercased
 //    j = j + addExpensesArr[i] + ', ';
 //  }
 //  j = j.substring(0, j.length - 2);
 //  console.log('Возможные расходы: ' + j);

 // console.log('Расходы за месяц: ' + appData.budgetMonth);
 // if (appData.getTargetMonth() > 0) {
 //   console.log('Cрок достижения цели: ', appData.getTargetMonth());
 // } else {
 //   console.log('Цель не будет достигнута');
 // }