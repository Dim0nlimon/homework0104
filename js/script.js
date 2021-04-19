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
     budgetMonthValue.value = this.budgetMonth;
     budgetDayValue.value = this.budgetDay;
     expensesMonthValue.value = this.expensesMonth;
     additionalExpensesValue.value = this.addExpenses.join(', ');
     additionalIncomeValue.value = this.addIncome.join(', ');
     targetMonthValue.value = Math.ceil(this.getTargetMonth());
     periodSelect.addEventListener('input', this.periodSelectChange());
     incomePeriodValue.value = this.calcPeriod();
     //  console.log(this);

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
         this.income[itemIncome] = itemExpenses;
       }
     });
     for (let key in appData.income) {
       this.incomeMonth += +appData.income[key];
     }
   },

   getAddExpenses: function () {
     let addExpenses = additionalExpensesItem.value.split(',');
     addExpenses.forEach(function (item) {
       item = item.trim();
       if (item !== '') {
         this.addExpenses.push(item);
       }
     });
   },

   getAddIncome: function () {
     additionalIncomeItem.forEach(function (item) {
       let itemValue = item.value.trim();
       if (itemValue !== '') {
         this.addIncome.push(itemValue);
       }
     });
   },

   //  asking: function () {
   //    if (confirm('Есть ли у вас дополнительный заработок?')) {
   //      let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Такси');
   //      while (!isNaN(itemIncome)) {
   //        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Такси');
   //      }
   //      let cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 1000);
   //      while (isNaN(cashIncome)) {
   //        cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 1000);
   //      }
   //      appData.income[itemIncome] = cashIncome;
   //    }
   //    appData.deposit = confirm('Есть ли у вас депозит в банке?');    
   //  },

   getExpensesMonth: function () {
     let expensesSum = 0;
     for (let prop in this.expenses) {
       expensesSum += +this.expenses[prop];
     }
     this.expensesMonth = expensesSum;
   },

   getBudget: function () {
     this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
     this.budgetDay = Math.floor(this.budgetMonth / 30);
   },

   getTargetMonth: function () {
     return targetAmount.value / this.budgetMonth;

   },

   getStatusIncome: function () {
     if (this.budgetDay >= 1200) {
       console.log('У вас высокий уровень дохода');
     } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
       console.log('У вас средний уровень дохода');
     } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
       console.log('К сожалению у вас уровень дохода ниже среднего');
     } else if (this.budgetDay < 0) {
       console.log('Что то пошло не так');
     }
   },

   getInfoDeposit: function () {
     if (this.deposit) {
       this.percentDeposit = prompt('Какой годовой процент?', '10');
       while (isNaN(this.percentDeposit)) {
         this.percentDeposit = prompt('Какой годовой процент?', '10');
       }
       this.moneyDeposit = prompt('Какая сумма заложена?', '1000');
       while (isNaN(this.moneyDeposit)) {
         this.moneyDeposit = prompt('Какая сумма заложена?', '1000');
       }
     }
   },

   calcPeriod: function () {
     return this.budgetMonth * periodSelect.value;
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

 let start = appData.start;
 let boundStart = start.bind(appData);



 //  l et j = '';
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