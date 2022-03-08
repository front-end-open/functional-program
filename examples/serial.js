/*
 * @Author: wangshan
 * @Date: 2022-01-26 10:35:35
 * @LastEditors: wangshan
 * @LastEditTime: 2022-01-26 15:41:54
 * @Description: Promise-串行
 */
// reduce方法
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

// 未捕获错误, 阻塞后续脚本执行
// const excutePromiseQueue = function (queues) {
//   queues.reduce((pre, next) => pre.then(next), Promise.resolve("previous"));
// };

//  捕获错误， 避免阻塞
const excutePromiseQueue = function (queues) {
  queues.reduce(
    (pre, next) => pre.then(next).catch(next),
    Promise.resolve("previous")
  );
};

excutePromiseQueue([f1, f2, f3]);
