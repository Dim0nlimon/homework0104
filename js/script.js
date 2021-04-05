let money = 30000;
let income = '500';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 200000;
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
let addExpensesArr = addExpenses.split(', ');
console.log(addExpensesArr);

let budgetDay = money / 30;
console.log(budgetDay);



money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = prompt('Есть ли у вас депозит в банке?');
if (deposit > 0) {
  deposit = true;
} else {
  deposit = false;
}

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ' + budgetMonth);
let monthsToMission = Math.ceil(mission / budgetMonth);
console.log('Месяцев до достижения цели: ' + monthsToMission);


budgetDay = Math.floor(budgetMonth / 30);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что то пошло не так');
}