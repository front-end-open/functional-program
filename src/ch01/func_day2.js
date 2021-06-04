// 引用透明
// 计算学生平均成绩
// 学生成绩，输入

const input = [80, 90, 100];
const sum = (total, current) => total + current; // reduce, callback
const total = (arr) => arr.reduce(sum); // 学生总成绩
const size = (arr) => arr.length; // 学生人数
const divide = (a, b) => a / b; // 计算逻辑
const average = (arr) => divide(total(arr), size(arr));
let results = average(input);

console.log(results);

// 预留疑问： 可置换性
