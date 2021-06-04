// 粗陋函数封装，基于值的模式。
// function printMessage(ele, format, msg) {
//   document.querySelector(`#${ele}`).innerHTML = `<${format}>${msg}</${format}>`;
// }

// 函数式编程风格的优化
function addDom(ele) {
  return function () {
    document.querySelector(`#${ele}`).innerHTML = arguments[0];
  };
}

function h1() {
  return `<h1>${arguments[0] || ''}</h1>`;
}
function h2() {
  return `<h2>${arguments[0]}</h2>`;
}
function echo() {
  return 'hello world';
}

function repeat(num) {
  return function () {
    for (let i = 0; i < num; i++) {
      return (arguments[0] += arguments[0]);
    }
  };
}

//  自己尝试, 此方法需要控制参数
function run(a, f, n, g) {
  return function () {
    a(f(n(g())));
  };
}

// 参考, 此方法，不用控制参数
function run2(...funs) {
  return function (x) {
    funs.reverse().forEach((func) => (x = func(x)));
    return x;
  };
}
// 参考 run3
const run3 = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  );

// let printMessage = run(addDom("msg"), h1, echo);
// printMessage("hello world");

// let printMessage = run2(console.log, repeat(3), h2, echo);
// printMessage("Get functional");

let printMessage = run3(console.log, repeat(3), h2, echo);
console.log(printMessage);
console.log(printMessage('run3: Get functional'));
