// 函数式编程-可重用模块化代码
// 理解函数式编程中，函数: 函数是输入到输出之间的映射. 明确的说函数是输入到输出之间的引用透明映射
// 函数作为映射性质关联函数链接和管道化关键
// 方法级链(紧偶合)
// 函数管道化(松耦合，灵活).类似 unix脚本编程 管道概念

// 从方法链接开始
// 总结: 函数式编程链式调用，使得程序可读性提高。但每层级链方法得到限制。不能得到自由扩展. 不能自由控制每层的级链方法数.这是由于每次级连方法后，所返回数据的限制导致。

// 函数管道化
// 管道实现： 必须是被连接的函数必须在元数上相互兼容

// 管道函数兼容条件：
// 不同程序不同阶段的任务处理，由函数去表征： 函数的输入和输出续满足的兼容条件
// 类型- 函数的返回类型必须函数的接收参数类型相匹配
// 元数(可以理解为，关系模型中属性个数或者表中列的个数；)- 接收函数必须至少存在一个输入参数。

// 明确规范管道操作中，函数的输入输出参数类型的匹配.
// Haskell 标记管道操作中，函数输入于输出类型关系：trim :: String ->  String    normalize :: String(输入) -> String(输出)
// ' 44---444-444 ' 去掉连字符, 去掉首末空格
const trim = (str) => str.replace(/\s*|\s$/g, '');
const normalize = (str) => str.replace(/\-/gi, '');

let res = normalize(trim(' 44-444-444 '));

console.log(res);

// 函数与元数
// 元数:  函数式编程中，元数描述参数数量,及函数的长度. 引用透明必然结果就是元数的个数与其复杂性成正比

// 函数式：元组在函数式编程函数输出中，返回多种类型。据元祖的概念：有限（通常两到3个类型），且有序的元素列表.

// 原生js不支持元祖需要自行构建.

// 使用元组
const Status = Tuple(Boolean, String);
console.log(Status);

// 使用元组完成ssn验证
const isValid = (str) => {
  if (str.length === 0) {
    return new Status(false, 'Invalid. Expected non-empty value!');
  } else {
    return new Status(true, 'Success!');
  }
};

res = isValid(normalize(trim(' 44-444-4444 ')));

console.log(res);

// 元组减少元素参数方法之一

// 测试 工具Tuple

const StringPair = Tuple(String, String);

const { _1: first, _2: last } = new StringPair('Bar', 'Ros');

console.log(first, last);
