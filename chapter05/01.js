// reduce，数组求和
const arr = [2, 5, 12, 40, 50, 12];

const sum = (x, y) => {
    
    console.log(x, y)
   return  x + y;
};

const log = console.log;
log(arr.reduce(sum, 0)); // 121

/**
 *关于reduce求和方式，即每次将计算累加结果，作为参数传入到累加函数的第一参数，累加函数的第二个参数是数组的每一个元素。依次传入函数.
 * 
 * */

// 空数组，reduce测试
const arr1 = []
// 空数组，如果不提供初始值，直接reduce运行时报错
//log(arr1.reduce((x, y) => x + y))// TypeError: Reduce of empty array with no initial value


// 提供初始值的话，函数reduce正常运行

log(arr1.reduce((x, y) => x + y, 0))






