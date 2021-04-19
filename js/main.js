// // 'use strict';
// //1 привязка по умолчанию foo() - получим global
// //2 неявная привязка obj.foo() - получим obj
// //3 явная привязка
// //3 привязка new
 
// //this всегда ссылается на обьект
// //this всегда существует только внутри фции
// //this определяется внутри фции
// //this зависит от того где и как фция вызывается
// // console.log(this)
// //если фция вызывается без точки, то this будет window 
// // a = 10;

// // function test() {
// //   console.log('hello', this.a);

// //   function text2() {
// //     console.log(this);
// //   }
// //   text2();

// // }

// // test();

// //неявная привязка
// //obj2.testObj.test(); test вызывается из testObj


// // let obj = {
// //     x: 10,
// //     y: 15,
// //     test: newTest,
  
// // };

// // let obj2 = {
// //   x:20,
// //   y:25,
// //   testObj: obj,
// // }

// // function newTest() {
// //   console.log('this: ', this.x);

// // }

// // obj.test();
// // newTest();
// // obj2.testObj.test();

// let obj ={
//   x:10,
//   y:15,
// }; 

// function newTest(){
//   console.log('this: ', this);  
// }

// function hardBind(){
//   newTest.call(obj)
// }

// hardBind(); 
// // newTest.apply(obj);
// // newTest.call(obj);
