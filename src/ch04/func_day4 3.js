/**
 * 链式流处理数据
 *
 * lodash使用:
 * 计算学生选课多门平均成绩
 */

let enrollment = [
  { enrolled: 2, grade: 100 },
  { enrolled: 2, grade: 80 },
  { enrolled: 1, grade: 89 },
];

// 命令式
// 计算多门选课平均成绩

let totalGrades = 0,
  totalStudentsFound = 0;

for (let i = 0; i < enrollment.length; i++) {
  let student = enrollment[i];
  if (student) {
    if (student.enrolled > 1) {
      totalGrades += student.grade;
      totalStudentsFound++;
    }
  }
}
let res = totalGrades / totalStudentsFound;

console.log(res); // 90

/**
 * 函数式编程，分解这个列子实现步骤:
 *  - 查询选课门数大于1的学生
 *  - 获取成绩
 *  - 计算平均成绩
 *
 * 借助lodash实现链式调用
 */
_.chain(enrollment)
  .filter((student) => student.grade > 1)
  .pluck('grade')
  .average()
  .value();
