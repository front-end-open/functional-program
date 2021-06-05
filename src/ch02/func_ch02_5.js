// Lenses对象方法，管理对象状态
// 及写时复制
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

Log('----ramda.js----');

// Ramam实现写时复制机制，访问和不可变的操作有状态的类型(OOP中对象个体)

// 写时复制
// R[view, set, over]

const person = new Person('Alonozo', 'Church', '44-444-4444');
let lastnameLens = R.lensProp('lastname'); // return lens
Log('ramda[lensProp]----:', lastnameLens);
// view === getter
Log(R.view(lastnameLens, person));

// set === setter
const copyperson = R.set(lastnameLens, 'Hash', person); // return new obj copy from
Log('新的model副本:', copyperson, '\r\n原来的model:', person);
Log(
  'copyperson-lastname:',
  copyperson.lastname,
  '\r\nperson-lastname:',
  person.lastname
);

// Lenses优势在于，化繁为简的操作对象机制.
// 支持嵌套对象写时复制。
person.address = new Address(
  'US',
  'NJ',
  'Princeton',
  zipCode('08544', '1234'),
  'Alexander St.'
);

const zipPath = ['address', 'zip'];
// lens 返回封装了给定 getter 和 setter 方法的 lens 。 getter 和 setter 分别用于 “获取” 和 “设置” 焦点（lens 聚焦的值)
// path 取出给定路径上的值。

var zipLens = R.lens(R.path(zipPath), R.assocPath(zipPath));
Log(R.assocPath(zipPath));
let code = R.view(zipLens, person); // zipCode(..., ...)
Log(code);
