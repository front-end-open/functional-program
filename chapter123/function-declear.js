/*
 *
 * @Author: wangshan
 * @Date: 2021-12-18 15:29:28
 * @LastEditors: wangshan
 * @LastEditTime: 2022-01-01 15:49:30
 * @Description: 函数声明
 */

// foo();   // refrenceError: 不能初始化之前访问 'foo'
const tools = require('../libs/common');



let foo = function () {
  console.log(foo.name);
};

foo();
// 箭头函数this问题

// function ShowItself1(identity) {
//   this.identity = identity;
//   setTimeout(function () {
//     console.log(this.identity); // undefined
//   }, 1000);
// }
// let x = new ShowItself1("Functional");
/**
 * showItself1函数内定时器，由于定时器调用时，所在的环境为全局。而callback参数，是在定时器内部调用，此方式调用时，回调函数不会继承定时器的this，而是将this绑定到全局this。
 *
 *
 *
 */

// function ShowItself2(identity) {
//   this.identity = identity;
//   let that = this;
//   setTimeout(function () {
//     console.log(that.identity);
//   }, 1000);
//   setTimeout(
//     function () {
//       console.log(this.identity);
//     }.bind(this),
//     2000
//   );
//   setTimeout(() => {
//     console.log(this.identity);
//   }, 3000);
// }
// let x = new ShowItself2("hello");

// 原地排序算法。原数组已被修改
// let nums = [20, 10, 40, 30, 100, 50, 70, 50];

// nums.sort();
// // Array.prototype.sort.call(nums);
// // Array.prototype.sort.bind(nums)();
// console.log(nums); //  [10, 100, 20, 30, 40, 50, 50, 70]

// // 提供比较函数
// nums = [20, 10, 40, 30, 100, 50, 70, 50];
// console.log(nums);

// nums.sort((a, b) => {
//   console.log(a, b);
//   //   if (a - b > 0) {
//   //     // return 1;
//   //   } else if (a - b < 0) {
//   //     return -1;
//   //   } else {
//   //     return 0;
//   //   }
//   return b - a;
// });
// console.log(nums);

// 执行栈确认

// function printMessage(msg) {
//   debugger;
//   console.log(msg);
// }

// function collectMessage(msg, type) {
//   if (type) {
//     debugger;
//     printMessage("good work," + msg);
//   } else {
//     printMessage("bad, " + msg);
//   }
// }

// collectMessage("fine!!", 1);

// 舍入函数
const roundFix = (function () {
  //   debugger;
  let accum = 0;
  return (n) => {
    // reals get rounded up or down
    // depending on the sign of accum
    // let nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
    let nRounded = Math[accum > 0 ? "ceil" : "floor"](n);
    console.log("accum", accum.toFixed(5), " result", nRounded);
    accum += n - nRounded;
    return nRounded;
  };
})();

let res = roundFix(3.14159); // accum 0.00000 result 3
roundFix(2.71828); // accum 0.14159 result 3
roundFix(2.71828); // accum -0.14013 result 2
roundFix(3.14159); // accum 0.57815 result 4
roundFix(2.71828); // accum -0.28026 result 2
roundFix(2.71828); // accum 0.43802 result 3
roundFix(2.71828); // accum 0.15630 result 3

const maxStr = (a) => a.sort().pop();

let countries = ["Argentina", "Uruguay", "Brasil", "Paraguay"];

console.log("result:", maxStr(countries), "input", countries);

console.log("result:", maxStr(countries))

/*function getRandomLetters(){
     let min = 'A'.charCodeAt()
     let max = 'Z'.charCodeAt()
     return String.fromCharCode(
         Math.floor(Math.random() * max - min + 1) + min
     )
 }

console.log(getRandomLetters())
*/

const getRandomLetter = () => {
 const min = "A".charCodeAt();
 const max = "Z".charCodeAt();
 return String.fromCharCode(
     Math.floor( Math.random() * (1 + max - min) ) + min
 );
};

console.log(getRandomLetter())


// 获取code

console.log('A'.charCodeAt()) // 65
console.log('Z'.charCodeAt()) // 90

// 获取随机数
let log = console.log
log(Math.random())

// 测试随机性

log(Math.random() * 26)
log(Math.random() * 26)
log(Math.random() * 26)
log(Math.random() * 26)
log(Math.random() * 26)

// 使用非纯函数，此函数表现非纯特点
// 获取随机文件名

const getRandomFileName = (fileExtensions = '.js') => {
    const NAME_LENGTH = 12;
    const singleName = undefined
    const res = []    
    
    for(let i = 0; i < NAME_LENGTH; i++) {
       res.push(getRandomLetter())
    }

    return res.join('') + fileExtensions
}
    
log(getRandomFileName())
log(getRandomFileName())
log(getRandomFileName())
log(getRandomFileName())
log(getRandomFileName())

// 计算前n项，斐波拉契数列
const fib = (n) =>  {
    if(n < 0 || typeof n != 'number') return console.warn('n is less than 0, and n must be a number');
      
   if(n === 0) return 0;
 
   if(n === 1)  return 1;
 
   if(n > 1) {
     return fib(n - 2) + fib(n - 1)
   }
}


log(fib(-1)) //output:  error

log(fib(10)) // 55


// 替换方法

const fib2 = (n) => n > 1 ? fib2(n -2) + fib2(n-1) : n;
log(fib2(0)) // 0
log(fib2(1)) // 1
log(fib2(10) // 55





