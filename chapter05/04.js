const {findIndex} = require('ramda');
const {myFilter, myFind, myFindIndex} = require('../libs/common')
const log = console.log;


let accountsData = [
    {
 id: "F220960K",
 balance: 1024
 },
 {
 id: "S120456T",
 balance: 2260
 },
 {
 id: "J140793A",
 balance: -38
 },
 {
 id: "M120396V",
 balance: -114
 },
 {
 id: "A120289L",
 balance: 55000
 }
]

// 获取余额为负数的id
log(accountsData.filter(x => x.balance < 0).map(v => v.id)); // [ 'J140793A', 'M120396V' ]


// 使用模拟的filter

log(myFilter(accountsData, x => x.balance < 0).map(v => v.id)) // [ 'J140793A', 'M120396V' ]




// 搜索数组，find, findIndex, includes, indexOf
const arr = [1, 2, 3, 4];

// find
log(arr.find(v => v % 2 == 0)) // 2
log(arr.find(v => v % 5 == 0)); // undefined

// findIndex
log(arr.findIndex(v => v % 2 === 0)) // 1
log(arr.findIndex(v => v % 5 === 0))   // -1


// cludes
log(arr.includes(2)) // true
log(arr.includes(5)) // false

// indexOf
log(arr.indexOf(2)) // 1
log(arr.indexOf(5)) // -1



// 特殊查询
// 检查一个数字数组是否存在`undefined`
let arrs = [1, NaN, 3]
log(arrs.findIndex(v => isNaN(v))) // 1



// 测试模拟的find
arrs = [1, 3, 5, 6];
log(myFind(arrs, (v) => v % 2 === 0)) // 6
log(myFind(arr, (v) => v % 7 === 0)) // undefined
// 测试模拟 findIndex
log(myFindIndex(arrs, (v) => v === 5)) // 2
log(myFindIndex(arrs, (v) => v === 10)) // -1








