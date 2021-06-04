// 累加器
// 副作用
// 但是外部counter由于不可控制，被外部其他引用改变时，导致累加器的值不可追踪
let counter = 0;
function increment() {
  return ++counter;
}

// 理论实现累加效果
increment();
increment();
// console.log(counter); // counter -> 2, 命令式

// 纯函数, 引用透明: 输入和输出同类型，并且输入作为函数参数,而不是依赖外部引用
// 累加器

const compose = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  );
function run2(f, g) {
  return function (x) {
    return f(g(x));
  };
}
const incrent = (counter) => counter + 1;

const plus = run2(incrent, incrent);
console.log(plus(0)); // ==> 2, 初始值，2 可控
