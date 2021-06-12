// 函数式编程异常处理
// 命令式编程中异常处理方式，通常就是try-catch
// 例如

/*
try {
  a + 1;
} catch (e) {
  console.log(e); // RefrenceError: a is not defined
}*/

// 正如使用函数抽象循环和条件分支一样，对于异常也需要进行抽象. 然而对于异常处理使用try-catch 不能与函数式程序结合，并且严重影响程序设计.

// 函数式程序不应该抛出异常，不然很难组合.
// 函数程序抛出异常导致的问题
/*
1. 很难与其他函数组合或连接
2. 违反引用透明规则，如果抛出异常，就导致函数出现另一个出口。函数单一返回值很难预测。
3. 副作用，对函数调用堆栈造成影响.
4. 违反局部性原则。
5. 不能单一处理返回值，还需要在catch块中维护，特定的异常类型。
6. 当有多个异常条件时，还需要使用嵌套的异常处理块.
*/

// 总结:   关于异常处理，异常应该由一个地方抛出，不应该随处可见.

// null 空值检查问题
// 异常解决方案 - Functor， 创建容器处理危险代码，可以时try-catch
// 包裹不安全的值, 函数编程中，函数本身被当做值来看待。而将值包裹起来，并且也保证了值的不可改变的可能。

// Functor
// 包裹不安全的值
class Warpper {
  constructor(value) {
    this._value = value;
    this._arr = [8, 3, 5];
  }

  // map :: (A -> B) -> A -> B
  map(f) {
    return f(this._value);
  }

  sortList(f) {
    return f(this._arr);
  }

  toString() {
    return 'Wrapper (' + this._value + ')';
  }
}

// 使用Warpper包装值
const wrap = (val) => new Warpper(val);

// 由于没用提供get方法，是不能直接通过对象属性操作符直接访问容器(warpper)内的值。理解容器包装不安全值原则
// 通过identity函数式编程中的组合子identity，结合map访问内部的值
let wrappevalue = wrap('get Functional');

// R.identity , a -> a. 输入值原样返回
// 获取值, 而不是直接操作值
let res = wrappevalue.map(R.identity);
console.log(res); //
// 映射值到更多函数类型
// toUpper
// 转换值
res = wrappevalue.map(R.toUpper);
console.log(res); // GET FUNCTIONAL

// 对于引用类型, 上面的包装容器，对于引用类型，则存在副作用
// const sort = (arr) =>
//   arr.sort((a, b) => {
//     return a - b;
//   });
// res = wrappevalue.sortList(sort);
// // 存在副作用
// console.log(res, wrappevalue._arr); // [3, 5, 8], [3, 5, 8]

// 对于不全的映射方法，比如 null, undefined
// 比如
// res = wrappevalue.map(null); // TypeErr: f is not function

// Functor 思路： 首先应用函数到值, 这期间可以进行对输入的不规范值进行处理, 然后将返回值应用到新的同类型包装器
// Functor 实质就是将函数应用到它包裹的值上，然后在将返回值包裹起来的数据结构
Warpper.prototype.fmap = function (fn) {
  if (fn) {
    return wrap(fn(this._value));
  } else {
    throw new TypeError('fn is not Compatible fn[Fucntion]');
  }
};

let wrappevalue_two = wrap(2); // 包裹一个数值2到容器中

// 求两个数值得和， 首先利用Ramda 进行参数柯里化
const plus = R.curry(function (a, b) {
  return a + b;
});
let plus3 = plus(3);

const wrap_five = wrappevalue_two.fmap(plus3); // 包装结果值的，新同类型Wrapper包装器

res = wrap_five.map(R.identity); // 获取结果值
console.log(res); // 5

// Functor 相关约定
/**
 * 无副作用
 * 可以组合, 如上面例子所示
 *
 *
 */

// 总结： Functor（数据结构）, 从程序中的应用特点来看，与函数链式操作别无二致。而不变性的特点，又与原生js map-api类似。数组本身是引用类型值，然而操作结果来看，其实返回里一个新数组，进过一番操作，原来的数组并没有被改变。

// 函数式数据类型：Monad
// Monad旨在为数据提供抽象方法

// 先说为什么会出现这种
// 需求: 求数值number / 2
// 定义映射函数
let half = (val) => val / 2;

wrappevalue = wrap(2);
let newwrap = wrappevalue.fmap(half); // 包装转换值

res = newwrap.map(R.identity);

console.log(res); // 1

// 改变需求:现在只需要处理偶数，而不需要处理奇数，希望能在求 半值能够判断输入类型是否偶数，对于不合法值，这里也就是奇数值.可以在映射函数返回空，但是不太理想
// 现在通过Monad来处理.
// 处理思路，对于不合法输入，返回一个空类型.

// 动手:
const Empty = function () {};
Empty.prototype.map = function () {
  // 对于空类型的map, 直接返回类型本身.
  return this;
};
// 判断是否偶数工具函数
const isEven = (n) => Number.isFinite(n) && n % 2 === 0;

// 改造half
// half :: Number -> [Wrapper | Empty]
half = (val) => (isEven(val) ? wrap(val / 2) : new Empty()); // Wrapper

res = half(4); // Wrapper
console.log(res);
res = half(3); // Empty
console.log(res);

// 当应用奇数时，返回Empty类型。不会破坏链式调用，而引发的错误
// 现在组合使用
res = half(4).fmap(plus3); //   Wrapper(5)
console.log('compose1', res);
res = half(3).map(plus3); // Empty
console.log('compose2:', res);

// Monad 用于创建带有一定规则的容器, 而Functor需要了解容器内的值，Functor可以有效保护数据.当需要组合使用函数时，可以用Monad安全无副作用管理数据流.

// Monad 重要概念:
/**
 * 1. 为Monadic提供抽象接口
 * 2. Monadic类型（类似容器-本节Wrapper）- 接口具体实现
 */

// 不同Monada具有不同功能，需要更具需求确定Monad
// Monadic接口定义规范:
/**
 * 1. 类型构造函数
 * 2. unit函数-指定特定类型的值，放入Monadci接口中。
 * 3. bind函数-可以链式操作, 类似fmap. note: 这里的bind区别函数绑定
 * 4. join函数- 将多层嵌套Monadic合并成一层, 对嵌套的返回Monad的函数有利.
 */

// 将 unit(of)应用到Wrapper
// 声明 Wrapper, 实现Monadic接口规范
class Wrapper {
  constructor(value) {
    this._value = value;
  }

  static of(a) {
    // unit
    return new Wrapper(a);
  }

  map(f) {
    // bind
    return Wrapper.of(f(this._value)); // return new Wrapper
  }

  join() {
    // 压平嵌套的Wrapper
    if (!(this._value instanceof Wrapper)) {
      return this;
    }
    return this._value.join(); // 递归
  }

  toString() {
    return `Wrapper (${this.value})`; // 返回当前结构的描述
  }
}

// 嵌套join压缩, 实例
res = Wrapper.of(Wrapper.of(Wrapper.of('get Functional'))).join();
console.log('nest Wrapper:', res);
