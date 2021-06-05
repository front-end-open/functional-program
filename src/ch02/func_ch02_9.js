'use strict';
// 函数作用域和闭包

const Log = console.log;
function zipCode(code, location) {
  let _code = code;
  let _location = location;

  return {
    code: function () {
      return _code; // 对函数zipCode内部成员引用
    },
    location: function () {
      return _location; // 对函数zipCode内部成员引用;
    },
  };
}

// 结合上面函数执行，返回列子理解闭包
const printcetonZip = zipCode('08544', '3345');
Log(printcetonZip.code()); // 闭包使得仍然能够访问函数内部声明成员

// 闭包定义： 在函数申明过程中将环境信息和所属函数绑定在一起的数据结构
// 基于函数声明位置决定, 也被称之为围绕函数定义的静态作用域和词法作用域。
// 闭包关联作用域： 闭包作用规则和作用域规则关系密切。作用域可用来绑定变量，定义变量定义的代码段。本质讲: 闭包就是函数继承而来的作用域, 类似对象方法访问其继承实例的变量, 他们都具有父类型的引用.
// 应用： 事件处理和回调，模拟私有成员变量

// 结合内嵌函数分析闭包的存在:
// 两个嵌套函数非内部成员exponent, amount均能够在外层函数执行被销毁后，访问外部父函数作用域变量. 产生闭包缘故.
function makeAddFunction(amount) {
  function add(number) {
    return number + amount;
  }
  return add;
}

function makeExponentialFunction(base) {
  function raise(exponent) {
    return Math.pow(base, exponent);
  }
  return raise;
}
const addTento = makeAddFunction(10);
Log(addTento(10));

const raiseThreeTo = makeExponentialFunction(3);
Log(raiseThreeTo(2));

// 闭包例子2
let outerVal = 'Outer'; // 全局变量
function makeInner(params) {
  let Innerval = 'Inner'; // 局部变量
  function inner() {
    // 闭包
    // inner: InnerVal 和 outerVal在inner闭包内
    console.log(
      `I can see: ${outerVal}, ${Innerval}, ${params}, ${addtionalVal}`
    );
  }
  var addtionalVal = 'additionalVal';
  return inner; // 在此处产生闭包
}

const inner = makeInner('Params'); // makeInner 调用返回inner引用, 此时makeInner内部的变量会被垃圾回收处理。而此处的inner仍然能够访问外部变量，是由于闭包产生了内部状态的快照.
inner();

// 作用域类型
Log('----作用域类型----');
// 全局作用域, 所有成员均被全局封装处理. 能够在脚本任意一处读取修改.
// 函数式编程不推荐对全局对象状态处理.应该避免.

// 函数作用域
// js主推的作用域机制. 函数内部维护状态对于外部来说不可见，仅作用函数内部使用. 同时，在函数返回后，任何声明的局部变量都会被垃圾回收处理.
// 作用域工作机制类似原型链访问机制类似, 由内而外.

// 伪块作用域
// 形如 {}中的代码块,在js中不存在所谓的块级作用域. 作用域中所有声明会被提升至变量顶部, 初始复制为undefned
// 声明提升机制,造成的问题
// 循环: 计数器
const arr = [1, 2, 3, 4];

function processArr() {
  //   console.log(i); // undefined，可以印证变量在提升时，会被初始化为undefined.
  //   var i = 0;
  function multipleBy10(val) {
    i = 10;

    return val * i;
  }

  for (var i = 0; i < arr.length; i++) {
    arr[i] = multipleBy10(arr[i]);
  }
}
processArr();
console.log(arr);
