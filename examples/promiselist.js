const {execute, executePlus} = require('../libs/helper')
// promise串行
const log = console.log;
// 关于promise.then的返回值问题

Promise.resolve('start').then((r) => {
    // 此onFullfilled为提供返回值，紧接着它的下一个then调用的onFullfied将是undefined
    // 提供返回值
    console.log(r)

    return 'from start: next'

}).then(r => console.log(r))
//  创建一个生成task任务的函数
// createTasks
const createTask = (result, isSuccess = true) => {
  return () => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        console.log(`success: ${result}`);
        resolve(result);
      } else {
        console.log(`error: ${result}`);
        reject(result);
      }
    }, 1000);
  });
}



// 串行任务
execute([
   createTask('A'),
   createTask('B'),
   createTask(`C`,false),
   createTask('D')
]).then(r => {
   log(r)
})

// 使用async/await 实现

executePlus([createTask('H'), createTask('E'), createTask('L', false), createTask('L', false), createTask('O')]).then(r => log(r))





