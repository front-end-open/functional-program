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
res = _.chain(names)
  .filter(isNotValid) // 过滤无效值
  .map((s) => s.replace(/_/, ' ')) // 过滤无效值
  .uniq() // 去重
  .map(_.startCase) // 首字母大写
  .sort() // 排序, unicode
  .value(); // 获取处理后的值

console.log('loadsh_func:', res);

