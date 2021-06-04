// 递归 - 深冻结
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

const person2 = new Person('Alan', 'Curry', '333-44-4444');
// 添加嵌套对象
person2.address = new Address(
  'US',
  'NG',
  'Princeton',
  zipCode('08544', '1234'),
  'Alexander St.'
);
// I
function recursiveFreeze(obj) {
  //   debugger;
  if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
    for (let key in obj) {
      recursiveFreeze(obj[key]);
    }
    Object.freeze(obj);
  }
  return obj;
}
// II
const isObject = (val) => val && typeof val === 'object';
Object.isFrozen(person2); // 判读对象是否可扩展.及是否存在getter和setter属性访问器. 默认对象可扩展，换句话说也就是可扩展的。
function deepFreeze(obj) {
  //   debugger;
  if (isObject(obj) && !Object.isFrozen(obj)) {
    Object.keys(obj).forEach((name) => deepFreeze(obj[name]));
    Object.freeze(obj);
  }
  return obj;
}

// const deepFreezeperson1 = deepFreeze(person2);
// deepFreezeperson1.address = 'change address'; // TypeError: Cannot assign to read only property '_address' of object '[object Object]'

// 修改 address 下级属性
// deepFreezeperson1.address._country = 'change country'; // Cannot assign to read only property '_address' of object '[object Object]'
// console.log(deepFreezeperson1.address._country);

// 测试 recursibveFreeze()

const deepFper = recursiveFreeze(person2);
// person2.address = { a: 'new Value' }; // Cannot assign to read only property '_address' of object '[object Object]'
// person2.address._country = 'China'; // Cannot assign to read only property '_address' of object '[object Object]'
// console.log(deepFper);
