// 函数方法
// 元函数, apply, call
// 说明： 元函数apply, call 第一个参数指定null, 表示作为全局对象成员方法调用; 严格模式下，null会作为参数传入

// 通过使用函数方法，基于已有的API，构建新方法。
// 现在实现一个取反其结果的函数
const Log = console.log;
function negate(func) {
  return function () {
    return !func.apply(null, arguments);
  };
}

// 功能函数: 判断数值是否为空
const isNull = (val) => val === null;

// 改造
const isNotNull = negate(isNull);

Log('val: null', isNotNull(null));
Log('\r\nval: {}', isNotNull({}));

// 上面的例子中，将新方法作为全局对象方法调用。这在函数式子编程中不过多涉及。函数式编程中强调将状态作为参数传入，而不是依赖上下文对象。
