// 函数式编程应用
/**
 * 函数式编程开发风格操，数据结构结合控制流
 */
// 函数式链式操作
// 使用lodash描述概念
// 函数式编程中将函数视为数值

// 使用lodash 处理数据列表
// 先声明数据
const p1 = new Person('Haskell', 'Curry', '11-111-1111');
p1.address = new Address('US');
p1.birthYear = '1903';

const p2 = new Person('Barley', 'Rosser', '22-222-2222');
p2.address = new Address('Greece');
p2.birthYear = '1907';

const p3 = new Person('John', 'von Neumann', '33-333-3333');
p3.address = new Address('Hungary');
p3.birthYear = '1903';

const p4 = new Person('Alonzo', 'Church', '44-444-4444');
p4.address = new Address('US');
p4.birthYear = '1998';

// 根据上面声明数据，查找人的全名

const persons = [p1, p2, p3, p4];
// 收集名字
// lodash[map]
let res = _.map(persons, (val) =>
  val !== null && val !== undefined ? val.fullname : ''
);
console.log('full-arrys:', res, '\r\npersons:', persons);

// _map实现

function copyMap(arr, fn) {
  let idx = 0;
  let len = arr.length;
  let result = new Array(len);
  while (idx < len) {
    result[idx] = fn(arr[idx], idx, arr);
    idx++;
  }

  return result;
}
res = copyMap(persons, (val) =>
  val !== null && val !== undefined ? val.fullname : ''
);
console.log('copyMap:', res);

// 反向输出全名
res = _.reverse(persons).map((val) =>
  val !== null && val !== undefined ? val.fullname : ''
);

console.log('extend sync: 反转:', res, '\r\npersons:', persons);
// lodash 非侵入式写法
//
res = _(persons)
  .reverse()
  .map((val) => val.fullname);

console.log('非侵入式实现反转:', res); // 输出结果有误

// 容器的映射: 将数据结构映射为转换后的值. 例如上面的persons映射为具有person人名数组.而原数组不变

// _reduce收集结果
// 统计每个国家的人数
res = _.reduce(
  persons,
  (accu, val) => {
    // console.log(val.address.country);
    accu[val.address.country] = _.isUndefined(accu[val.address.country])
      ? 1
      : accu[val.address.country] + 1;

    return accu;
  },
  {}
);
console.log('_.reduce:', res);

// reduce实现
function copyReduce(arr, fn, accu) {
  let idx = -1;
  let len = arr.length;
  console.log(accu);
  //   debugger;
  if (accu && len > 0) {
    accu = arr[idx++];
  }

  while (idx < len) {
    accu = fn(accu, arr[idx], idx, arr);
    idx++;
  }

  return accu;
}

// res = copyReduce(
//   persons,
//   (accu, val) => {
//     // console.log(accu);
//     accu[val.address.country] = _.isUndefined(accu[val.address.country])
//       ? 1
//       : accu[val.address.country] + 1;

//     return accu;
//   },
//   {}
// );
// console.log('copyReduce:', res);

// map-reduce组合
// 连式调用
const getCountry = (person) => person.address.country;

const getherStates = (stat, criteria) => {
  stat[criteria] = _.isUndefined(stat[criteria]) ? 1 : stat[criteria] + 1;

  return stat;
};

res = persons.map(getCountry).reduce(getherStates, {});

console.log('link-callback:', res);

// 短路应用, 判断集合是否存在无效值. 一般正常来说，如果检查到有效值，就不应该继续遍历。但是reduce由于是一个以来累加器的api。因此会访问序列中每个元素.
// 考虑 some用来检测集合中值得有效性.
// 非全真逻辑非(存在假)
const isNotValid = (val) => _.isUndefined(val) || _.isNull(val);
const notAllValid = (args) => args.some(isNotValid);

res = notAllValid(['string', 0, null, undefined]);
console.log('checkValue1:', res); // true
res = notAllValid(['string', 0, {}]); // false
console.log('checkvalue2:', res);

// every, 非全真逻辑非(全真)
const isValid = (val) => !_.isUndefined(val) && !_.isNull(val);
const allValid = (args) => args.every(isValid);

res = allValid(['string', 0, null]); // false
console.log('checkVal3:', res);
res = allValid(['string', 0, {}]); // true
console.log('checkVal4:', res);

// 过滤数据filter

// filter实现
// predicate:称函数谓词
function filter(arr, pre) {
  let idx = -1,
    len = arr.length,
    result = [];
  while (++idx < len) {
    let value = arr[idx];
    if (pre(value, idx, this)) {
      result.push(value);
    }
  }
  return result;
}

// 使用js原生filter
const bornIn1903 = (person) => person.birthYear === '1903';

res = persons
  .filter(bornIn1903)
  .map((val) => (val !== null && val !== undefined ? val.fullname : ''))
  .join(' and ');
console.log(res); // John von Neumann and Haskell Curry

// 数组推导式,是map-filter的组合用法的hack
// 由es7提案中被提出.
// [for (p of persons) if (p.birthYear === 1903) p.fullname].join(' and ')
q