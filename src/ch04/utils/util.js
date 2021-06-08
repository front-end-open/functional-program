const checkType = R.curry(function (typeDef, obj) {
  if (!R.is(typeDef, obj)) {
    let type = typeof obj;
    throw new TypeError(
      `Type mismatch. Expected [${typeDef}] but found [${type}]`
    );
  }
  return obj;
});

// 元祖: Tuple

const Mymodule = (function cusModule(global) {
  global.Tuple = function (/*type*/) {
    const typeinfo = Array.prototype.slice.call(arguments, 0);
    const _T = function (/*values*/) {
      const values = Array.prototype.slice.call(arguments, 0);

      if (values.some((val) => val === undefined || val === null)) {
        throw new Error('Tuple may not have any null values');
      }

      if (values.length !== typeinfo.length) {
        // 检测类型是否匹配
        throw new TypeError('Tuple arity does not match its prototype');
      }

      values.map((val, index) => {
        this['_' + (index + 1)] = checkType(typeinfo[index])(val);
      }, this);
      Object.freeze(this);
    };
    _T.prototype.values = () => {
      return Object.keys(this).map(function (k) {
        return this[k];
      });
    };

    return _T;
  };
})(this);
