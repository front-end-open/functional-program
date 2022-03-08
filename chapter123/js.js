/*
 * @Author: wangshan
 * @Date: 2021-12-02 23:35:10
 * @LastEditors: wangshan
 * @LastEditTime: 2022-01-26 10:33:51
 * @Description:
 */
// 递归解决汉诺塔

// let testobj = (function () {
//   let value = 0;

//   return {
//     increment(inc) {
//       value += typeof inc === "number" ? inc : 1;
//     },
//     getValue() {
//       return value;
//     },
//   };
// })();

// console.log(testobj, testobj.getValue());

// let quo = function (status) {
//   let other = "1";
//   let c = 2;
//   return {
//     get_status() {
//       debugger;
//       c;
//       other;
//       return status;
//     },
//   };
// };

// let myquo = quo("name");

// console.log(myquo.get_status());

Function.prototype.methods = function (name, func) {
  this.prototype[name] = func;
  return this;
};

Function.methods("curry", function () {
  let slice = Array.prototype.slice,
    args = slice.apply(null, arguments),
    that = this;

  return function () {
    return that.apply(null, args.slice(slice.apply(arguments)));
  };
});

let add1 = add;
const a;

