// Monad应用
// Note: Monadic除了包装有效值，还用于建模 null 和 undefined
// 常见应用实列: Maybe, Either, IO

const { extend } = require('lodash');

// Maybe, Either 应用场景
/**
 * 1. 隔离不纯
 * 2. 合并判断非空逻辑
 * 3. 避免异常
 * 4. 支持函数组合
 * 5. 中心化逻辑，提供默认值
 *
 */

// 1.Maybe-Monda
// Maybe 侧重于有效整合null-判断逻辑
// Maybe是包含两个具体字类型的空类型(标记类型)
/**
 * 1. Just(value)-表示值的容器
 * 2. Nothing() - 表示没有值或者没有失败的附加信息。当然，也可以应用函数到Nothing
 */

class Maybe {
  // 父容器
  static just(a) {
    return new this.just(a);
  }

  static nothing() {
    return new Nothing();
  }

  static fromNullable(a) {
    // 由一个可为空的类型创建Maybe
    return a !== null ? just(a) : nothing();
  }

  static of(a) {
    return just(a);
  }

  get isNothing() {
    return false;
  }

  get isJust() {
    return false;
  }
}

class Just extends Maybe {
  // Just 子类型用于处理存在的值
  constructor(value) {
    super();
    this._value = value;
  }

  get value() {
    return this._value;
  }

  map(f) {
    return of(f(this._value));
  }

  getOrElse() {
    return this.value;
  }

  filter(f) {
    Maybe.fromNullable(f(this.value)) ? this.value : null;
  }

  get isJust() {
    return true;
  }

  toString() {
    return `Maybe.Just(${this.value})`;
  }
}
// Nothing 子类型用于处理无值的情况提供保护

class Nothing extends Maybe {
  map(f) {
    return this;
  }

  get value() {
    // 访问Nothing错误表征
    throw new TypeError("Cant' extract the value of Nothing");
  }

  getOrElse(other) {
    return other;
  }

  filter() {
    return this.value;
  }

  get isNothing() {
    return true;
  }

  toString() {
    return `Maybe.Nothing`;
  }
}
