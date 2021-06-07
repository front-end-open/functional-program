// 递归思考: 循环的另一种解决方案, 常用于处理自相似问题

// 现在解决一个数组求和问题

// 命令式
// 循环数组元素，拿到每个值。还需要一个累加器。通过此方式求和
const arr = [1, 2, 3, 4, 5, 6];
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log('link:', sum); // 21

// 函数式
// 抽离循环，抽象出内部操作
// 代码更精简，程序流程也更清楚
let res = _(arr).reduce((accu, val) => accu + val, 0);
console.log('FP: ', res); // 21

// 递归处理
/**
 * 分析思考流程:
 * 递归自相似特点，求数组和其实分解为更小的问题，依次两个数字的和
 * sum(arr) = 1 + [2, 3, 4, 5, 6, 7]
 *          = 1 + 2 + [3, 4, 5, 6, 7]
 *          = 1 + 2 + 3 + [4, 5, 6, 7]
 *          = 1 + 2 + 3 + 4 + [5, 6, 7]
 *          = 1 + 2 + 3 + 4 + 5 + [6, 7]
 *          = 1 + 2 + 3 + 4 + 5 + 6 + [7]
 *          = 1 + 2 + 3 + 4 + 5 + 6 + 7
 *
 *
 */

// 操作
function sumc(arr) {
  if (_.isEmpty(arr)) {
    return false;
  }

  return (
    _.head(arr) +
    sumc(
      _.rest((a, b) => {
        return b;
      })(...arr)
    )
  );
}
res = sumc(arr);
console.log(res); // 21

// 尾调用优化

function sumcPlus(arr, accu = 0) {
  debugger;
  if (_.isEmpty(arr)) {
    return 0;
  }

  return sumcPlus(
    _.rest((a, b) => {
      return b;
    })(...arr),
    accu + _.head(arr)
  );
}

res = sumcPlus(arr);
console.log('sumcPlus:', res);
