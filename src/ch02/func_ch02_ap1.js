// 闭包的应用
// - 模拟私有变量
// - 异步服务端调用
// - 创建人工块作用域变量

// IIFE 模块模式
var MyModule = (function MyModule(expor) {
  let _myPrivatevar;
  expor.method1 = () => {};
  expor.method2 = () => {};

  return expor;
})(MyModule || {});

console.log(MyModule);

// 异步服务端调用
// 回调地狱
