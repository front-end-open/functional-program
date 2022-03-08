// 记忆化使用
'use strict';

const log = console.log;
const {performance} = require('perf_hooks')


let fib = (n) => n > 1 ? fib(n - 2) + fib(n - 1) : n

// 记忆封装
fib = memoize(fib)

// 记录时间
let fibmemory = addTiming(fib, () => performance.now(), log);

let r = fibmemory(45);
log(r);
r = fibmemory(40);
log(r);
r = fibmemory(35);
log(r);





/**  未优化
 *   normal exit  11539.11525399983
     1134903170
     
     normal exit  1044.0502449981868
     102334155
     
     normal exit  97.4359889999032
     9227465
 *  
 *   // 优化过后
 *  normal exit  0.07509299740195274
    1134903170
    
    normal exit  0.004772000014781952
    102334155
    
    normal exit  0.0028170011937618256
    9227465 
 *  
 * 
 * 
    * */
// 复杂记忆化

// 数组键

let a = [1, 2, 3, 4];
log(String(a)) // 1, 2, 3, 4

let b = [[1, 2], [3, 4]];
log(String(b)); // 1, 2, 3, 4

let c = [[1, 2], [3], [4]];
log(String(c)); // 1, 2, 3, 4


// 使用对象情况

a = {a: 'fk'}
log(String(a))

b = [{p:1, q:3}, {p: 2, q: 6}];
log(String(b))

