// 记忆化
// 斐波拉契数列的记忆化实践
const { addTiming, memoize } = require('../libs/common')
const log = console.log;
const {performance} = require('perf_hooks')

const process = require('process')

function fib(n) {
    if(n === 0) return 0;
    if(n === 1) return 1;

    if(n > 1) return fib(n - 2) +  fib(n - 1);
}

// 使用
log(fib(10))


fibTime = addTiming(fib, () => performance.now(), log);

fibTime(45)
fibTime(40)
fibTime(35)

// 包装fib

fibTime2 = addTiming((n) => fib(n), () => performance.now(), log)

// 从主进程派生子进程，处理第二处的斐波拉契数列运算

process.on('beforeExit', (code) => {
    log('子进程开启:')
    fibTime2(45) // high long
    fibTime2(40) // too long
    fibTime2(35) // long
})




