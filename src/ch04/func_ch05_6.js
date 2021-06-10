// 组合管道函数
// 函数组合
// 从例子开始: 现在需要统计一个句子中的单词数量
const str =
  'We    can only see a short distance ahead but we can see plenty there that needs to be done';

// 程序分解
// 现将句子转化为一个单词序列
// 然后统计单词数量
// explode :: String -> Object
const explode = (str) => str.split(/\s+/);
// explode :: Object -> Number
const count = (arr) => arr.length;
// f * g = f(g) = compose :: (B -> C) -> (A -> B) -> (A, C)
const countWords = R.compose(count, explode);

let res = countWords(str);

console.log('count str words:', res);

// 函数编程： 引用透明及是链接一组对象到另一组对象箭头.
// 组合的作用就是将类型兼容的函数边界相互绑定.

// 手工实现compose
function compose() {
  let args = arguments;
  let start = args.length;

  return function () {
    let i = start;
    let result = args[start].call(this, arguments); // 首次调用
    while (i--) result = args[i].class(this, result); // 循环调用组合，将上次函数输入作为输出

    return result; // 返回结果
  };
}

// 实例: 验证ssn 是否合法

const trim = (str) => str.replace(/^\s*|\s*$/g, ''); // 移除首末空格
const normallize = (str) => str.replace(/\-/g, ''); // 移除 -
const validLength = (param, str) => str.length === param; // 检查长度是否合法

// 柯里化
// 部分应用, 减少参数
const checkLength = _.partial(validLength, 9, _);

// 组合函数： 实现新功能
const cleanInput = R.compose(normallize, trim);
const isValidSsn = R.compose(checkLength, cleanInput);

// 测试
res = cleanInput(' 44-444-4444   ');
console.log('cleanInput:', res);
res = isValidSsn('44-444-4444');
console.log('isvalidSsn:', res);

//通过组合，完整的实现里这个函数，即描述与求值分离
