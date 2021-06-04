// javascript 状态管理
// 值对象，保证引用类型不可变。通过值来作为标识符，而不是以特殊标识符

// 邮编码实现
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

const princetonZip = zipCode('08544', '3345');
let code = princetonZip.toString();

const codeojb = princetonZip.fromString(code);
console.log(codeojb);

// coordinate 坐标
function coordinate(lat, long) {
  let _lat = lat;
  let _long = long;

  // 返回对象(技巧：值对象)，维护内部状态。而不是面向对像方式，所有状态均通过实例维护。其内部状态能够在任意时刻动态修改
  return {
    lat: () => _lat,
    longitude: () => long,
    translate: (dx, dy) => coordinate(_lat + dx, _long + dy),
    toString: () => '(' + _lat + ',' + _long + ')',
  };
}

const greenwich = coordinate(51.4778, 0.0015);
code = greenwich.toString();
console.log(code);

code = greenwich.translate(10, 10).toString();
console.log(code);
