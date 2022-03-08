const {sequence} = require('../libs/helper')

const createTask = (result, isSuccess) => {
    return () =>  new Promise((resolve, reject)=> {
        setTimeout(() => {
            if(isSuccess) {
                console.log(`success: ${result}`);
                resolve(result)
            }else {
                console.log(`error: ${result}`)
                reject(result)
            }
        }, 1000)
    })
}   

// 创建异步队列
const promises = [createTask('A'), createTask('B'), createTask('C', false), createTask('D')];

// 串行分发异步任务

sequence(promises, (r, i, o) => {
    console.log(r, i, o)

}, 'start')




