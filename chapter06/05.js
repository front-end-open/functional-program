// 斐波拉契数列函数测试性能
const {addTiming} = require('../libs/common')
const {performance} = require('perf_hooks')

const fib = (n) => n > 1 ? fib(n - 2) + fib(n - 1) : n;

const log = console.log;



log(fib(10));
log(fib(5))




log(addTiming(fib, performance.now, log)(5)) // 0.01
log(addTiming((n) => fib(n), performance.now, log)(5)) // 0.02




// 复杂结构体参数缓存







