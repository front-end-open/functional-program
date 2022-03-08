/*
 * @Author: wangshan
 * @Date: 2022-01-26 15:59:31
 * @LastEditors: wangshan
 * @LastEditTime: 2022-01-26 17:23:01
 * @Description: 链式-串行
 */
/**
 * promise.then决议状态过程，取决于resolve, reject的结果。
 */
const p1 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve(1);
    }, 1000);
  });
};

const p2 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve(2);
    }, 2000);
  });
};

function sequence(promises, cb, ...args) {
  const p = Promise.resolve(),
    len = promises.length;
  if (len === 0) {
    return p;
  }

  let i = 0;
  //如果cb不是函数
  if (typeof cb !== "function") {
    cb = null;
    p = 1;
    args = [cb, ...args];
  }

  function callBack(...params) {
    return p
      .then((r) => {
        return promises[i](r, ...params);
      })
      .then((r) => {
        ++i;
        cb && cb(r, i, ...params);
        return i > len - 1 ? Promise.resolve(r) : callBack(...params);
      });
  }

  return callBack(...args);
}

Promise.resolve().then(p1).then(p2);
