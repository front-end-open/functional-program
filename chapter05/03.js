// 求数字序列平均值
const {myMap, cloneObj, factorial} = require('../libs/common')
 
const arr = [10, 20, 30, 40]

const average = (arr) => arr.reduce((x, y) => x + y, 0) / arr.length
const average2 = (arr) => arr.reduce((sum, val, idx, arr) => {
    sum += val
    
    return idx === arr.length - 1 ? sum / arr.length : sum;
})

let log = console.log;


log(average(arr)) // 25

log(average2(arr))  // 25



//  扩展原型

Array.prototype.average = function(){
    return this.reduce((x, y) => x + y, 0) / this.length;
}

// 使用方法

log(arr.average()) // 25


// 计算几个值的平均值, 为reduce累加器，提供特定的结构体数据
 
const average3 = (arr) => {
    const sc = arr.reduce((ac, val) => ([ac[0] + val, ac[1]+ 1]), 
        [0, 0])
    
    return sc[0] / sc[1]
}

log(average3(arr), '传入数组结构体')

// 传入数组结构体
const average4 = (arr) => {
    const sc =arr.reduce((ac, val) => ({sum: ac.sum + val, count: ac.count + 1}), {sum: 0, count: 0})
    return sc.sum / sc.count;
}

log(average4(arr), '传入对象结构体')

// 测试reduce运行原理
/**
 * reduce首个参数的参数是累加器，他是根据内部计算逻辑获得，如果传入的函数参数，内部不做任何计算处理，那么该参数将原样返回。并且，如果传入函数不做返回的话，那么累加器默认undefined. 
 *
 *
 *
    * */
arr.reduce((x, y) => {
    console.log(x, y)
    return x;
}, 0)

// reduceRight

// 字符串反转
// 方法一
const reverseString = (str) => {
    return str.split('').reverse().join('')
}
let str = 'HELLO, Mary!';

log(reverseString(str)); // !yraM ,OLLEH

// 方法二

const reverseString2 = (str) => {
    return str.split('').reduceRight((ac, val) => ac + val)
}

log(reverseString2(str))    // !yraM ,OLLEH

// 交换参数位置

const restoreString = (str) => {
    return str.split('').reduceRight((x, y) => y + x, '');
}

log(restoreString(str))// HELLO, Mary!



// 使用reduce, reverse. 实现反转
const reverseString3 = (str) => {
    return str.split('').reverse().reduce((x, y) => x + y, '');
}

log(reverseString3(str))

// 考察reverse
// ! reverse 影响原数组
let arrs = [1, 2, 3, 4]

log('reverse-arrs', arrs.reverse(), 'original-arrs', arrs)


// 计算一个对象序列，部分属性平均值.

const markers = [
 {name: "UY", lat: -34.9, lon: -56.2},
 {name: "AR", lat: -34.6, lon: -58.4},
 {name: "BR", lat: -15.8, lon: -47.9},
 {name: "BO", lat: -16.5, lon: -68.1}
];

// 方法一

Array.prototype.average = function(){

    return this.reduce((x, y) => x + y, 0) / this.length;

}

let averageLat = markers.map(x => x.lat).average();
let averageLon = markers.map(x => x.lon).average();

log(averageLat, averageLon);



// 方法二
let averageLon2 = average(markers.map(x => x.lon));

let averageLat2 = average(markers.map(x => x.lat));

log(averageLat2, averageLon2);


// 数字解析

let strnum = ["123.45", "67.8", "90"]
let strnum2 = [123.45, "67.8", "-90"]
log(strnum.map(parseFloat))
log(strnum2.map(parseInt))




// 辅助函数，范围数组生成
const range = (start, stop) => {
    return new Array(stop - start).fill(0).map((v, i) => start + i)
}

// 测试

log(range(0, 5)) // [1, 2, 3, 4, 5]


// 数字值域的应用
const factorialRange = (n) => range(1, n + 1).reduce((x, y) => x * y, 1);


log(factorialRange(3)) // 6

log(factorialRange(4)) // 24

log(factorialRange(5))  // 120

new Array(0).reduce((x, y) => {console.log(x, y); return x * y}, 1)


// 使用数值范围辅助函数，生成字母表
let letters = range('A'.charCodeAt(), 'Z'.charCodeAt() + 1).map(x => String.fromCharCode(x));

log(letters);

//使用模拟map方法
let narrs = [22, 10, 44, 9, 56];
let dup = (x) => x * 2;

log(narrs.map(dup)); // [44, 20, 88, 18, 112]
log(myMap(narrs, dup)); // [44, 20, 88, 18, 112]
log(arrs);  // [22, 10, 88, 18, 56]



// 对象拷贝方法测试
let obj = {fk: 22, st: 12, desc: "couple"};

let objclone = cloneObj(obj)

objclone.desc = 'third';

log(obj, objclone) // { fk: 22, st: 12, desc: 'couple' } { fk: 22, st: 12, desc: 'third' }

/**
 *
 * 目前只是浅拷贝，而且还没有对对象进行属性冻结
*/

//阶乘
log(factorial(5)) // 120



