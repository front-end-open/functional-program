----- 颗粒化-----

#### 伪代码前篇

```javascript
function showStudent(ssn) {
  var student = db.get(ssn);
  if (student !== null) {
    document.getSelector(
      `${{ elementId }}`
    ).innerHMTL = `${student.ssn}, ${student.firstname},${student.lastname}`;
  } else {
    throw new Error('Student not found!');
  }
}
```

伪代码副作用分析:

- 外部变量 db, elementId 访问
- 学生查找错误，导致堆栈回退

#### 改正

改正规则：

- 柯里化
- 长函数分割为，具有单一职责的短函数
- 显示将完成功能所需的依赖定义为函数减少副作用的数量

code snipt

```javascript
// curry, 柯里化
var find = curry(function (db, id) {
  var obj = db.get(id);
});

var csv = (student) {
    return `${student.ssn}, ${student.firstname}, ${student.lastname}`;
}
// curry, 柯里化， 将函数参数较少一个,减少函数传参数
var append = curry(function(element, info)) {
    document.querySelector(elementId).innerHTML = info;
});

// 如下,
var showStudent = run(
    append('#sdudent-info'),
    csv,
    find(db)
)

```

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
