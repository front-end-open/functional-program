/*
 * @Author: wangshan
 * @Date: 2021-12-11 23:20:12
 * @LastEditors: wangshan
 * @LastEditTime: 2021-12-13 00:27:19
 * @Description:  高阶函数-once
 */
let once = (fn) => {
  let done = false; //  本地标量，控制原始函数执行
  let count = 0; // 原始函数执行次数.
  let res = "";
  return function (...args) {
    if (done) return { count, res };
    count++;
    res = fn(...args);
    done = true;
    return {
      res,
    };
  };
};

// 测试，计算两个数字的和
function sum(a, b) {
  //   debugger;
  return a + b;
}

let initialize = once(sum);

let sumbtn = document.querySelector("button");

sumbtn.addEventListener("click", () => {
  console.log(initialize(4, 4));
});

// 优化once，提供第二个参数
function onceAndAfter(fn, g) {
  //   debugger;
  let done = false;

  return (...args) => {
    if (!done) {
      done = true;
      return fn(...args);
    } else {
      return g(...args);
    }
  };
}

// 测试
let print = (tips) => tips;
initialize = onceAndAfter(sum, print);

console.log(initialize(4, 4)); // 8
console.log(initialize("no output")); // no output
console.log(initialize("no output")); // no output
console.log(initialize()); // undeinfed

// 函数执行指定次数

let thisManyTimes = (fn, n = 1) => {
  let start = 1;

  return function (...args) {
    if (start <= n) {
      //   debu gger;
      start++;
      return fn(...args);
    } else {
      return "excuted complete";
    }
  };
};

// 测试

function message(msg) {
  return msg;
}

let manyTime = thisManyTimes(message, 5);
// 设置函数执行5
console.log(manyTime("hello")); // hello
console.log(manyTime("hello")); // hello
console.log(manyTime("hello")); // hello
console.log(manyTime("hello")); // hello
console.log(manyTime("hello")); // hello

console.log(manyTime("hello")); // excuted complete

// 交替函数

function alternating(foo, fun) {
  let foocalled = false;
  return () => {
    if (!foocalled) {
      foocalled = true;
      foo();
    } else {
      foocalled = false;
      fun();
    }
  };
}

// 测试
let sayA = () => console.log("A");
let sayB = () => console.log("B");

initialize = alternating(sayA, sayB);

initialize(); // A
initialize(); // B
initialize(); // A
initialize(); // B
initialize(); // A
initialize(); // B
initialize(); // A
