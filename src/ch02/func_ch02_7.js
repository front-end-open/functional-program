// 函数应用
// js函数可以在调用期间指定上下文, 并且可以在期间指定任意上下文. 通过this
// 函数调用类型

// 作为全局函数, window
const Log = console.log;
function doWork() {
  this.myVar = 'Some value'; // this --> window
}
doWork();
// 作为方法
// this 指向了方法执行期间的所有者 obj
const obj = {
  prop: 'obj-prop',
  getprop() {
    return this.prop;
  },
};

Log(obj.getprop()); // this --> obj
// 作为构造函数，与new使用，返回新建对象引用。

function MyType(arg) {
  this.prop = arg;
}
const anyType = new MyType('test');
Log('constructor: ', anyType);

// 函数中this的指向，往往和函数执行时的上下文相关. 从而推断this的引用
