// 对于层次化数据结构，值对象并不能满足可变需求.
// 为此引入对象浅冻结 Object.freeze。
function zipCode(code, location) {
  let _code = code;
  let _location = location;

  return {
    code: () => _code,
    location: () => _location,
    fromString: (str) => {
      let parts = str.split('-');
      return zipCode(parts[0], parts[1]);
    },
    toString: () => _code + '-' + _location,
  };
}
const person = new Person('Haskell', 'Curry', '444-44-4444');

person.address = new Address(
  'US',
  'NJ',
  'Princeton',
  zipCode('08544', '1234'),
  'Alexander St.'
);
Object.freeze(person);
// 浅冻结不可修改
// person.firstname = 'Bob'; // Cannot assign to read only property '_firstname' of object '[object Object]'
console.log(person.firstname); // Haskell, 深冻结对象状态并不能被改变
let pdesc = Object.getOwnPropertyDescriptor(person, '_firstname'); // {configurable: false, enumerable: true, value: "Haskell", writable: false } --> writable: false, 不可写
console.log(pdesc); // 获取属性描述

// 嵌套属性，冻结状态，可修改
// 再次深入address内部
person.address._country = 'France';

console.log(person.address); // France

// Object 冻结继承属性
// 冻结Student 继承自Person的属性.
const student = Object.freeze(
  new Student('Alan', 'Turing', '111-11-1111', 'Princeton')
);
// student.firstname = 'Haskell'; //  Cannot assign to read only property '_firstname' of object '[object Object]', _proto_
// student.school = 'QingHua'; // Cannot assign to read only property '_shcool' of object '[object Object]'
console.log(student); // Alan，

/**
 * freeze机制：
 *  包魂对象自身成员
 *  保护原型链上，所有成员
 *  只有顶层成员会被冻结，嵌套成员不会被冻结
 */

// 继续上面的person实列. 探讨Object.freeze冻结
// 冻结是浅层次的，比如内部嵌套成员address仍然可以被修改

// 解决浅冻结，嵌套对象仍然可修改情况
