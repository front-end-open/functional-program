// Lenses对象方法，管理对象状态
// 及写时复制

class Man extends Person {
  constructor(firstname, lastname, ssn, sex) {
    super(firstname, lastname, ssn, sex);
    this._sex = sex;
  }
  get sex() {
    return this._sex;
  }
  set sex(sx) {
    return new Man(this._firstname, this._lastname, this._ssn, sx);
  }
}
const Log = console.log;
const man = new Man('Haskell', 'Bob', '111-111-1111', 'man');
Log(man.sex); // man
man.sex = 'men'; // --> return men
Log(man.sex); // man

// Ramam实现写时复制机制，访问和不可变的操作有状态的类型(OOP中对象个体)
