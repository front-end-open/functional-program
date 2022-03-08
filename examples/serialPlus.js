/*
 * @Author: wangshan
 * @Date: 2022-01-26 11:50:44
 * @LastEditors: wangshan
 * @LastEditTime: 2022-01-26 15:10:16
 * @Description: promise-串行
 */

// 构造promise队列, 使用reduce规约队列
const f1 = function (args) {
  console.log(`${f1.name}: ${args}`);

  return Promise.resolve("start-f1");
};

// 一个拒绝的promise，导致后续的promise调用被阻塞。
const f2 = function (args) {
  console.log(`${f2.name}: ${args}`);

  return Promise.reject("middle-f2");
};

// 未执行
const f3 = function (args) {
  console.log(`${f3.name}: ${args}`);

  return Promise.resolve("end-f3");
};

// 上一级的promise版本，由于在reject时，会执行多次。选择改进Promise

const serialPromises = function (promises) {
  const process = function (i, args) {
    const curr = promises[i];
    const next = function (res) {
      process(i + 1, res);
    };
    if (curr) curr(args).then(next).catch(next);
  };

  process(0);
};

serialPromises([f1, f2, f3]);
