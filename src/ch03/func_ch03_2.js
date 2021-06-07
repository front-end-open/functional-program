// 代码推理
/**
 * 分为两个部分： 动态部分和静态部分
 * 动态部分：数据输入和函数输出
 * 静态部分：包含可读性和模型构建的难易程度
 */

// 声明式惰性计算函数链
//现在需要对一组姓名进行读取，规范化，去重，排序

const names = [
  'alonzo church',
  'Haskell curry',
  'stephen_kleene',
  'John Von Neumann',
  'stephen_kleene',
];
// 命令式实现
const result = [];
for (let i = 0; i < names.length; i++) {
  let n = names[i];
  if (n !== undefined && n !== null) {
    let ns = n.replace(/_/, ' ').split(' ');
    for (let j = 0; j < ns.length; j++) {
      let p = ns[j];
      p = p.charAt(0).toUpperCase() + p.slice(1);
      ns[j] = p;
    }

    if (result.indexOf(ns.join(' ')) < 0) {
      result.push(ns.join(' '));
    }
  }
}

console.log('names: ', names);
result.sort();
console.log('nameCovert:', result);

// 函数式实现
// _.chain创建value包装实例，并返回
const isNotValid = (val) => !_.isUndefined(val) && !_.isNull(val);

let res = _.chain(names)
  .filter(isNotValid) // 过滤无效值
  .map((s) => s.replace(/_/, ' ')) // 过滤无效值
  .uniq() // 去重
  .map(_.startCase) // 首字母大写
  .sort() // 排序, unicode
  .value(); // 获取处理后的值

console.log('loadsh_func:', res);

// 增加persons, 扩展person
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

const p5 = new Person('David', 'Hilbert', '55-555-5555');
p5.address = new Address('Germany');
p5.birthYear = 1903;

const p6 = new Person('Alan', 'Turing', '66-666-6666');
p6.address = new Address('England');
p6.birthYear = 1912;

const p7 = new Person('Stephen', 'Kleene', '77-777-7777');
p7.address = new Address('US');
p7.birthYear = 1909;

// 任务：返回人数最多的国家
const isValid = (val) => !_.isUndefined(val) && !_.isNull(val);
const getherStates = (stat, country) => {
  if (!isValid(stat[country])) {
    stat[country] = { name: country, count: 1 };
  }
  stat[country].count++;
  return stat;
};
const persons = [p1, p2, p3, p4, p5, p6, p7];
res = _.chain(persons)
  .filter(isValid)
  .map(_.property('address.country'))
  .reduce(getherStates, {})
  .sortBy('count')
  .reverse()
  .first()
  .value().name;

console.log(res); // US;

// 从SQL查询语言思考：函数式编程
// _.mixin扩展lodash
_.mixin({
  select: _.pluck,
  from: _.chain,
  where: _.filter,
  grounpBy: _.sortBy,
});
res = _.from([p1, p2, p3, p4, p5, p6, p7])
  .where((p) => p.birthYear > 1900 && p.address.country !== 'US')
  .grounpBy(['firstname', 'birtchYear'])
  .select('firstname', 'birtchYear')
  .value();

console.log(res);
