// promise 链式调用函数封装
// reduce版本
function execute(tasks) {
    // let resultList = [];
   
    return tasks.reduce((previousPromise, currentPromise) => previousPromise.then((resultList) => {
        return new Promise(resolve => {
            currentPromise().then(result => { 
                resolve(resultList.concat(result))
            }).catch(() => {
                resolve(resultList.concat(null))
            })
        })
    }),
    Promise.resolve([]))
}

// async/await 版本
async function executePlus(tasks = []) {
    const resultList = []
    
    for(task of tasks) {
        try{
            resultList.push(await task());    
            console.log(resultList)
        }catch(e) {
            resultList.push(null);
        }
    }
    
    return resultList;
}

// 顺序执行的递归版本
function sequence(promises, cb, ...args) {
    const p = Promise.resolve(),
        len = promises.length
    if (len <= 0) {
        return p
    }
    let i = 0
    //如果cb不是函数
    if (typeof cb !== 'function') {
        cb = null
        args = [cb, ...args]
    }

    function callBack(...params) {
        return p.then(r => {
            return promises[i](r, ...params)
        }).then(r => {
            ++i
            cb && cb(r, i, ...params)
            return i > len - 1 ? Promise.resolve(r) : callBack(...params)
        }).catch((e) => {
            ++i;
            cb && cb(e)
            
            return i > len - 1 ? cb(e) : callBack(...params)
        })
    }

    return callBack(...args)
}

// reduce简洁版
const runPromisesInSeries = ps =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());


module.exports = {
    execute,
    executePlus,
    sequence,
    runPromisesInSeries
}











