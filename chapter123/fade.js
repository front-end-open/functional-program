/*
 * @Author: wangshan
 * @Date: 2021-12-04 00:00:55
 * @LastEditors: wangshan
 * @LastEditTime: 2021-12-11 01:07:14
 * @Description: 渐变背景
 */

// function fade(node) {
//   let level = 1;

//   function step() {
//     let hex = level.toString(16);
//     node.style.backgroundColor = "#ffff" + hex + hex;
//     if (level < 15) {
//       level++;

//       setTimeout(step, 100);
//     }
//   }
//   setTimeout(step, 100);
// }

// fade(document.body);

// 阶乘

function fatorial(n) {
  if (typeof n !== "number")
    throw { name: "TypeError", message: "expect n is a number" };

  if (n < 0) {
    throw {
      name: "Error",
      message: "expect n > 0",
    };
  }

  if (n == 0) {
    return 1;
  }
  return n * fatorial(n - 1);
}

// 错误n
// fatorial("1");
// factorial(-1);

console.log(fatorial(4));

// fatorialVersion

function newfatorail(n, start = 1) {
  debugger;
  if ((n === start) === 0) {
    return 1;
  }
  let currentstart = start;
  let current = 0;
  if (A)
    if (start <= n) {
      start++;
      current = start * currentstart;
      newfatorail(n, start);
    }
  return current;
}

console.log(newfatorail(4, 1));
