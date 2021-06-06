// 作用域闭包深入理解

function foo(a) {
  //   b + 2; // RHS 查询作用域内的状态b，未找到直接抛出引用错误.
  //   b = a; // 隐式创建全局变量b, 非严格模式下，LHS查询未找到变量b声明全局变量b。而不是抛出错误. 如果严格模式下，会禁止全局变量申明.
  // 当RHS查找到变量时，如果不合理操作, 包括非函数类型的函数调用，undefined, null的属性访问.
  //RerenceError: 作用域判断失败
  //   b(); // RerenceError: b is not defined
  // TypeError: 作用域判断成功, 对变量操作不合理或非法
  //   b = 2;
  //   b(); // typeError: b is not defined
  b;
}

// 词法欺骗
function efoo(str, a) {
  eval(str); // eval调用，内部的参数，作为脚本执行，var b =3 作为动态插入脚本。修改了efoo内部作用域
  console.log(a, b);
}
var b = 4;
efoo('var b = 3', 2);
