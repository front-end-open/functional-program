// 函数柯厘化
// 较少输入参数，相比一元函数.
// 引用透明的直接结果就是元数与程序复杂性成正比
// 柯理化:表意为在函数所有参数被输入之前，函数会被一直挂起，延迟执行。直到所有参数传入.
// 二元参数
function curry2(fn) {
  return function (firstArg) {
    return function (secondArg) {
      return fn(firstArg, secondArg);
    };
  };
}

// 柯里化是词法作用域的应用,闭包.
// 使用curry2

// 元祖定义name输出类型
const StringPair = Tuple(String, String);

const name = curry2(function (a, b) {
  return new StringPair(a, b);
});
let { _1: first, _2: last } = name('Curry')('Haskell');

console.log(first, last);

// Tuple 中 类型检测函数实现 checkType
const checkTypeCopy = curry2(function (typeDef, actualType) {
  if (R.is(typeDef, actualType)) {
    return actualType;
  } else {
    throw new TypeError(
      `Type mismatch Expected [ + ${typeDef} ] but found [ ${typeof actualType} ]`
    );
  }
});

// right
res = checkTypeCopy(String)('Curry');
console.log(res);
// right
res = checkTypeCopy(Number)(1);
console.log(res);
res;
// right
res = checkTypeCopy(Date)(new Date());
console.log(res);
// wrong
res = checkTypeCopy(Object)(NaN); // TypeError: Type mismatch Expected [ + function Object() { [native code] } ] but found [ number ]

// 柯里化,从上面的demo来看可以理解为多元函数参数分步处理
// 多元函数
// fullname :: (String, String) -> String
const fullname = (firtst, last) => {
  //.....
};

// 基础声明参数数量人工创建嵌套作用域，闭包应用实现柯里化效果
const fullnameCopy = function (fn) {
  return function (first) {
    return function (last) {
      return fn(first, last);
    };
  };
};

// 柯里化应用
// 1. 仿真函数接口
// 2. 实现可重用模块化函数模版
