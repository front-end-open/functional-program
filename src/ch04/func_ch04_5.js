// 可重用模块化函数模版
// 已log4js为例子
// 问题场景：日常的后台应用需要为不同状态配置不同日志信息, 可重用的函数模版可以会更具创建时的参数数量来定义一系列相关函数
import _ from 'lodash';
import log4 from 'log4js';

// 伪代码
/** 
 * const logger = function (appender, layout, name, level, message) {
 *   根据参数映射配置,
    const addpenders = {    预设 appender  字典
        'alert': new Log4js.JSAlertAppender(),
        'console': new Log4js.BrowerConsoleAppender()
    }
 *  
    const layouts = {   预设布局 layout 字典
        'basic': new Log4js.BasicLayout(),
        'json': new Log4js.JONSLayout(),
        'xml': new Log4js.XMLLayout()
    };

    根据参数映射对应配置
 * const appender = appenders[appender]
 * appender.setLayout(layouts[layout])
 * const logger = new Log4js.getLogger(name)
 * logger.addAppender(appender)
 * logger.addAppender(appender);
 * logger.log(level, message, null)
 * 
 * */

// 柯里化替代方案
// 部分应用
// 函数绑定

// 部分应用：将函数不可变参数子集初始化固定值创建更小原函数的操作. 以达到控制函数求值方式
// 参考lodash _.partial

var greet = function (greeting, name) {
  return greeting + ' ' + name;
};

var sayHelloTo = _.partial(greet, 'hello');
sayHelloTo('fred'); // 实现greeting
// => 'hello fred'

// 使用了占位符,
var greetFred = _.partial(greet, _, 'fred');
greetFred('hi'); // 实现greeting who
// => 'hi fred'

//总结： 柯里化是一种部分应用的自动化使用方式

// 函数绑定
var greet = function (greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
};

var object = { user: 'fred' };

var bound = _.bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'

// Bound with placeholders.
var bound = _.bind(greet, object, _, '!');
bound('hi');
// => 'hi fred!'

// 部分应用，函数绑定实际应用:
// 核型语言扩展
// 惰性函数绑定

// 核心语言扩展
// 注意： 这会时代码在平台升级时很难迁移.

// substring, 获取头部起的n个字符
String.prototype.first = _.partial(String.prototype.substring, 0);
let res = 'Functonal Programming'.first(9);
console.log(res, 111);

// 在扩展之前，最好进行检查，避免冲突
/*
例子:
    if(!String.prototype.explode){
        String.prototype.first = _.partial(String.prototype.substring, 0);
    }
*/

// 函数绑定应用: 惰性函数绑定
// 如果使用部分应用则会失效, 一些函数依赖特定上下文对象执行。所以需要绑定目标对象

// 延时函数使用函数绑定，自定义扩展
const Scheduler = (function () {
  const delayedFn = _.bind(setTimeout, undefined, _, _);
  return {
    delay5: _.partial(delayedFn, _, 5000),
    delay10: _.partial(delayedFn, _, 10000),
    delay: _.partial(delayedFn, _, _),
  };
})();

// test
Scheduler.delay5(function (params) {
  console.log('hello setTimeout');
});
