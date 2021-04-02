let money = 30000;
let income = '500';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 200000;
let period = 6;

console.log(typeof money);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
let addExpensesArr = addExpenses.split(', ');
console.log(addExpensesArr);

let budgetDay = money/30;
console.log(budgetDay);
