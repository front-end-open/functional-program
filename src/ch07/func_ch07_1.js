/**
 * 函数式优化
 *
 *
 */
// try-catch处理错误实际，通过下方程序测试，异步抛出的错误直接被抛弃了。
// try {
//   setTimeout(() => {
//     throw new Error('this is async error');
//   }, 2);
//   throw new Error('this is sync error');
// } catch (e) {
//   console.log(e);
// }

// 优化技术： 惰性求值，记忆化，尾递归调用.
// js函数式编程优化，不针对单个函数求值优化，优化的方向在避免重复的函数调用以及延时函数调用代码，把求值延迟到必要的时候，从而达到提升程序整体的性能。

// 优化之前，了解函数调用时发生了什么事情
// 函数执行机制
/**
 * js中函数调用其实都会在函数上下文堆栈中创建记录（帧）
 *
 * js编程模型的上下文堆栈负责管理函数执行以及关闭变量作用域
 *
 * 堆栈上下文创建顺序，首先从全局上下文帧开始，然后到各个函数调用上下文.
 * 其中每个阶段的上下文包含了一系列变量和函数.
 */

// 上下文帧的内存占用情况
/**
 * 全局上下文帧永远驻留在堆栈的底部。
 * 每个函数上下文堆栈都占用一定量的内存（实际取决于局部变量的个数）。如果在函数上下文中，没有包含任何参数变量，则被称之为空帧。一个空帧大约占用内存48字节
 * 每个数字和布尔类型的局部变量和参数会占用8个字节。因此，函数声明越多的局部变量就需要越大的堆栈帧。
 *
 * 上下文帧中的内容信息：
 *  1. scopeChain: 包含当前函数的variableObject 和父执行上下文的variableObject
 *  2. variableObject: 包含当前函数的参数，内部变量以及函数声明
 *  3. this 函数对象的引用（函数一等, 系统中的函数都是对象)
 */

// 总结： 函数上下文堆栈帧的大小取决于variableObject，因为其中包括，类数组类型函数参数对象arguments, 以及所有局部变量。其次函数作用域链还会链接父函数执行上下文。作用域链最终会链接到全局上下文。
// 作用域链
/**
 * 作用域链： 指内部函数能够访问到外部函数的闭包
 *
 */

// 堆栈行文规则：
/**
 * 1. js单线程，意味执行的同步性
 * 2. 共享的全局上下文
 * 3. 函数上下文数量有限
 * 4. 每个函数调用会创建一个新的执行上下文，递归调用也如此
 */

// 柯里化演示，并分析堆栈
// const trim = (str) => str.replace(/^\s*|\s*$/g, ''); // 移除首末空格
// const normallize = (str) => str.replace(/\-/g, ''); // 移除 -
// const validLength = (param, str) => str.length === param; // 检查长度是否合
// const checkLength = _.partial(validLength, 9, _);
// const cleanInput = R.compose(normallize, trim);
// const isValidSsn = R.compose(checkLength, cleanInput);

// 测试

// let res = isValidSsn(' 44-444-4444 ');
// console.log(res);

function GetFullname(first, last) {
  return `my name is ${first} ${last}`;
}
function printFullName(GetFullname) {
  return function firstname(firstname) {
    return function lastname(lastname) {
      return GetFullname(firstname, lastname);
    };
  };
}

// debugger;
printFullName(GetFullname)('Haskell')('curry');

/**
 * 调试总结:
 *  非嵌套函数调用，不包含闭包。此时新函数调用时的创建创建的上下文对象，会链接到全局上下文对象，并且此时的全局上下文对象会被暂停，直到当前函数执行完，被释放。全局上下文对象才被打开。
 * 而如果当前函数内部包含声明函数的外部调用，那么此时内部函数调用时，新创建的上下文对象会被链接到父函数上下文对象，并且上级的上下文对象都被暂停，唯有当前函数上下文对象活跃.
 *
 * 内部函数上下文对象创建总结：
 * 内部函数上下文对象的创建依赖外部函数上下文堆栈内存分配，并经过scopeChain链接。
 */

// 柯里化调用性能分析
const add = function (a, b) {
  return a + b;
};

const c_add = _.curry(add, _, _);
const input = _.range(8000);

function addAll(arr, fn) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      result += fn(arr[i], arr[j]);
    }
  }

  return result;
}

res = addAll(input, add);
console.log('not-curry:', res);
res = addAll(input, c_add);
console.log('curry-output: ', res);
/**
 * 可以看到柯里化调用处理上面的程序，程序从输入数据到输入结果非常慢; 而命令式处理几秒钟就输入结果了。
 */

// 递归
/*
除了大量的柯里化调用导致的性能问题，还有递归也会导致函数式程序性能问题.
函数递归调用也会创建新的函数上下文。
*/

// 测试递归调用阈值
function icreament(i) {
  icreament(i++);
  console.log(i);
}
debugger;
icreament(1); // 堆栈溢出错误.
