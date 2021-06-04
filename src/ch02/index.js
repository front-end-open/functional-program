let curry = new Student('Haskell', 'Curry', '111-11-1111', 'Penn State');
curry.address = new Address('US');

let turing = new Student('Alan', 'Turing', '222-22-2222', 'Princeton');
turing.address = new Address('England');

let church = new Student('Alonzo', 'Church', '333-33-3333', 'Princeton');
church.address = new Address('US');

let kleene = new Student('Stephen', 'Kleene', '444-44-4444', 'Princeton');
kleene.address = new Address('US');

const log = console.log;

// 查找同国家同学校
let res = church.studentSameAndSchool([turing, kleene, curry]);

log(res);

// 函数式测试
function selector(country, school) {
  return function (student) {
    return student.address.country === country && student.school === school;
  };
}
let findStudentBy = function (friends, selector) {
  return friends.filter(selector);
};

res = findStudentBy(
  [curry, turing, church, kleene],
  selector('US', 'Princeton')
);

res = findStudentBy(
  [curry, turing, church, kleene],
  selector('England', 'Princeton')
);
console.log(res);
