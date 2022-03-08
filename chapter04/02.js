// 重构isOldEnough, roundFix


// isOldEnough
const R = require('ramda');

const isOldEnough = (currentYear, birthYear) => {
    return birthYear <= currentYear - 18
}
// 如果需要使用isOldEnough函数，每次都需要初始化currentYear
// 柯里化,重构
// 使用isOldEnough
let log = console.log;
const currentOldFunc = R.curry(isOldEnough)
const oldYear = currentOldFunc(new Date().getFullYear());

log(oldYear(1988)) // true

/**
 * 借助Ramda实现函数柯里化，不用每次调用重复初始化limitYear
 * 
 *
 *
    * */

// 现在使用Partial,重构isOldEnough

const initLimitYear = R.partial(isOldEnough, [new Date().getFullYear()])

log(initLimitYear(1998)) // true

log(initLimitYear(2005)) // false

log(initLimitYear(2004)) // true


// 重构roundFix
// 重构思路：分离舍入与accu条件部分的逻辑. 将局部状态accu作为参数传入函数
//

let accumulator = 0;


const roundFix = (a, n) => {
    let r = a > 0 ? Math.ceil(n) : Math.floor(n)
    a += n - r;

    return {a, r}
}

// test
var {a, r} = roundFix(accumulator, 3.142);
accumulator = a;

console.log(accumulator, r)

var {a, r} = roundFix(accumulator, 2.12);

accumulator = a;

log(accumulator, r)


var {a, r} = roundFix(accumulator, 2.12);

accumulator = a;

log(accumulator, r)


