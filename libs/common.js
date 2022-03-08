let begin = new Date().getTime()

function executeTime(fn) {
    
   // begin = new Date().getTime();    
    console.time('begin')
    fn()
    //let end = new Date().getTime();
    console.timeEnd('begin');
    // return (end - begin) + 'ms';
}


const getRandomLetter = () => {
    const min = "A".charCodeAt();
    const max = "Z".charCodeAt();
    
    return String.fromCharCode(
        Math.floor( Math.random() * (1 + max - min) ) + min
    );
}

const getRandomFileName = (fileExtensions = '.js') => {
    const NAME_LENGTH = 12;
    const res = []    
    
    for(let i = 0; i < NAME_LENGTH; i++) {
       res.push(getRandomLetter())
    }

    return res.join('') + fileExtensions
}



// 使用参数注入内部函数

const getRandomFileName2 = (fileExtensions = '.js', randomLetterFunc) => {
    const NAME_LENGTH = 12;
    const res = []    
    
    for(let i = 0; i < NAME_LENGTH; i++) {
        res.push(randomLetterFunc())   
    }
    return res.join('') + fileExtensions
}

// 模拟map方法
// reduce

const myMap = (arr, fn) => arr.reduce((x, y) => x.concat(fn(y)), [])


// 一级对象拷贝


const cloneObj = (obj) => {
    const copy = Object.create(Object.getPrototypeOf(obj));

    Object.getOwnPropertyNames(obj).forEach((prop) => {
        Object.defineProperty(copy,prop, Object.getOwnPropertyDescriptor(obj, prop));
    })

    return copy;

}

// 数值范围

const range = (start, stop) => {
    return new Array(stop - start).fill(0).map((x, idx) => start + idx)
}

// 阶乘方法


const factorial = (n) => {
    let res = 1;

    range(1, n + 1).forEach(x => res *= x)


    return res
}


// 模拟 filter

const myFilter = (arr, fn) => {
    return arr.reduce((x, y) => (fn(y) ? x.concat(y) : x), [])
}

// find模拟
const myFind = (arr, fn) => {
    return arr.reduce((x, y) => x === undefined && fn(y) ? y : x, undefined);
}

// findIndex
const myFindIndex = (arr, fn) => {

    return arr.reduce((x, y, idx) => x === -1  && fn(y) ? idx : x, -1);

}



// 添加日志记录函数

const addLogging = (fn) => (...args) => {
    console.log(`entering ${fn.name}: ${args}`);
    
    const valueToReturn = fn(...args);
        
    console.log(`exit ${fn.name}: ${valueToReturn}`)
    
    return valueToReturn;
}

// 增强日志记录函数

const addLoggingPlus = (fn) => (...args) => {
    try{
        console.log(`entering ${fn.name}: ${args}`)

        const valueToReturn = fn(...args);

        console.log(`exit ${fn.name}: ${valueToReturn}`)
        
        return valueToReturn;
    }catch(throwError){
        console.log(`exiting ${fn.name}: throw ${throwError}`)
        throw throwError;   
    }
    console.log(`entering ${fn.name}: ${args}`)
}


// 脏函数注入，改进addLogging

const addLoggingIngetion = (fn, logger = console.log) => (...args) => {
    logger(`entering ${fn.name}: ${args}`);

    try{
        const valueToReturn = fn(...args);
        logger(`exiting ${fn.name}: ${valueToReturn}`);

        return valueToReturn;
    }catch(e){
        logger(`exiting ${fn.name}: ${e}`);
        throw e;
    }
}

// 日期记录

const addTiming = (fn, getTime, output) => (...args) => {
    let tStart = getTime();
    
    try{
        const valueToReturn = fn(...args);
        output('normal exit', fn.name, getTime() - tStart);

        return valueToReturn;
    }catch(e){
        output(`expection throw`, fn.name, tStart, getTime());

        throw e;
    }
}

// 尾递归优化,记忆化
const memoize = fn => {
    let cache = {};

    return x => (x in cache) ? cache[x] : (cache[x] = fn(x))
}

// 排除多个参数的记忆化
const memoize2 = fn => {
    if(fn.length === 1) {
        let cache = {}
        return x => (x in cache ? cache[x] : fn(x));
    } else {
        return fn;
    }
}
// 通用缓存函数，包括场景单个参数处理，多个参数且包含复杂结构体参数情况
const commonMemoize = fn => {
    let cache = {}
    let PRIMITIVES = ['number', 'string', 'boolean']

    return (...args) => {
        let strX = args.length === 1 && PRIMITIVES.includes(typeof args[0]) ? args[0] : JSON.stringify(args);

        return cache[strX] ? cache[strX] : (cache[strX] = fn(...args));
    }

}

// 更简单版本，但是会消耗CPU性能
// 主要在于JSON.stringify.比较消耗性能

const SampleMemoize = (fn) => {
    let cache = {}
    
    return (...args) => {
        let strX = JSON.stringify(args);

        return cache[strX] ? cache[strX] : (cache[strX] = fn(...args))
    }


}


module.exports = {
    executeTime,
    getRandomFileName2,
    myMap,
    cloneObj,
    range,
    factorial,
    myFilter,
    myFind,
    myFindIndex,
    addLogging,
    addLoggingPlus,
    addLoggingIngetion,
    addTiming,
    memoize,
    memoize2
}
