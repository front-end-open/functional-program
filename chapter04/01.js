//import tools from '../libs/common.js'
const { executeTime } = require('../libs/common');
// 分析fib执行时间
const fib = (n) => {
    if(n < 0 || typeof n != 'number') console.log('n is less than 0, and n must be number');

    if(n === 0) return 0;

    if(n === 1) return 1;
   
    if(n > 1) return fib(n - 1) + fib(n -2);
}

let log = console.log;


log(fib(0))
log(fib(1))


executeTime(() => fib(10))


// 记忆化,缓存结果

let cache = [];

const fib2 = (n) => {
    if(cache[n] === undefined) {
        if(n === 0) cache[n] = 0;
        if(n === 1) cache[n] = 1;
        if(n > 1) cache[n] = fib2(n - 2) + fib2(n - 1);
    }

    return cache[n]
}


executeTime(() => { fib2(10) })

log(cache)


// 继续优化，将全局变量-缓存，使用闭包关闭它。避免副作用



const fib3 = (() => {
    let cache = []
    
    // 复用上面的fib2,这里变动只需要在缓存变量上，递归函数逻辑不变
    return function(n) {
        fib2(n)
    }
})();


executeTime(() => fib3(10))


