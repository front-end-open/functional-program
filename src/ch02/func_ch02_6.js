// 函数式编程程序驱动单元之-函数
// js 术语 一等：语言层面将函数视于对象
// 函数可以通过内置类型实列化
// Function
// @parm1 [string] par1,[parm{n}]

// @parm2 func body
const sum = new Function('a', 'b', 'return a + b');
const Log = console.log;

Log(sum(2, 2));

// 匿名函数，作为表达式或者参数
const printName = function (name) {
  return name;
};
Log(printName.name); // printName, 变量名作为匿名函数名字, 而匿名函数右侧的函数表达式返回的则是一个返回空name的对象

// 作为参数的函数
// Array.sort
// parm {Function} callback
/**
 * 总结:
 * 像sort这一类api已接收函数作为形参的方法，均被归类为一种函数类型----高阶函数
 * 目的在于扩展函数行为
 *
 */

// 高阶函数: 1. 形参传递 2. 引用返回
// 函数作为参数传入: 求积
function applyOperation(a, b, opt) {
  return opt(a, b);
}
const multiplier = (a, b) => a * b;
let res = applyOperation(2, 3, multiplier);
Log('aaplyOperation:', res); // 2

// 函数作为引用返回: 求和
function add(a) {
  return (b) => a + b;
}
res = add(4)(4);
Log('add: ', res);

// 高阶函数结合函数式编程应用实例
// 打印us people
// 命令式编程: 分析如下
// 1. 便利people集合
// 2. 通过流程控制分支,判断出对应国家的人，执行指定操作
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

function regisAddr(people, countrys) {
  countrys.forEach(
    (coutry, idx) =>
      (people[idx].address = new Address(
        coutry,
        'Foluo',
        'Newyork',
        zipCode(
          `${Math.floor(Math.random() + 10000)}`,
          `${Math.floor(Math.random() + 10000)}`
        )
      ))
  );
}

function regisPeople(peos, countrys) {
  const peoples = [];
  peos.forEach((name, idx) => {
    const person = new Person(
      name,
      `${name}-opther`,
      `11-222-${Math.floor(Math.random() + 10000)}`
    );

    peoples.push(person);
  });

  regisAddr(peoples, countrys);

  return peoples;
}
// 注册people
const persons = regisPeople(
  ['Haskell', 'Unix', 'Linux'],
  ['US', 'China', 'US']
);

console.log(persons);

function printPeopleInUS(peoples) {
  for (let i = 0; i < peoples.length; i++) {
    // 1,
    let thisPerson = peoples[i];
    if (thisPerson.address.country === 'US') {
      // 2
      console.log(thisPerson);
    }
  }
}

printPeopleInUS(persons);

/**
 * 上面的命令式输出国家是 US方法， 其状态和行文高度耦合.
 *
 * 想想如果想输出其他国家的人怎么办
 * 高阶函数，定制化每个people的行文，及函数作为参数传入
 */
function printPeople(people, action) {
  for (let i = 0; i < people.length; i++) {
    action(people[i]);
  }
}
// US
const actionUS = (people) => {
  if (people.address.country === 'US') {
    console.log('US:', people);
  }
};
// China
const actionChina = (people) => {
  if (people.address.country === 'China') {
    console.log('China:', people);
  }
};
printPeople(persons, actionUS);
printPeople(persons, actionChina);

// 重构 printPeople。体现高阶函数特性
function printPeoplePlus(people, selector, printer) {
  people.forEach((person) => {
    if (selector(person)) {
      printer(`${person.address.country}:`, person);
    }
  });
}

const InUs = (people) => people.address.country === 'US';
const InChina = (people) => people.address.country === 'China';
Log('----printPlus--');

// 声明式特点, 利用函数高阶特性，将函数作为特定的授事行为,申明式传入
printPeoplePlus(persons, InUs, Log);    // 
printPeoplePlus(persons, InChina, Log);
