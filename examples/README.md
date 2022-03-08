## Promise 串行 与 并行

> Promise 并行实际是异步编程模式的一种，并行意即是多个异步任务同时执行，没有先后次序之分。Promise 中，由于存在并行编程的 api, Promise.all, Promise.race

### 串行

> Promise 本身不提供串行功能，一旦 Pomise 开始执行，执行上不存在串行一说。

串行实现：

- promise.then 链调实现.
- 构造请求队列, 利用数组 reduce 实现

例子: 计时

```js
// promise.then
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

p1.then(p2);
```
