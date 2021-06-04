/**
 * 存储数据，不可变性
 */
// 排序
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const sortDesc = (arr) => {
  return arr.sort((a, b) => b - a);
};

let res = sortDesc(arr);

// 原数组arr 被改变. 违背不变性
console.log(arr); // sourc可e: [9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(res); // convert target: [9, 8, 7, 6, 5, 4, 3, 2, 1]

const a = [2, 3];

console.log();
