const { addLoggingIngetion,addLogging, addLoggingPlus } = require('../libs/common')
const log = console.log;
// 函数组合使用日志记录

function subtract(a, b) {
    b = changeSign(b);
    
    return a + b;
}

function changeSign(a) {
    return -a;
}


// 日志包装器包装上面的功能函数
// addLogging
subtract = addLogging(subtract);
changeSign = addLogging(changeSign);

subtract(7, 5);



//增强日志函数使用， 错误测试

function sum(){
    throw new Error('this is a error');

    return 2

}


sum = addLoggingPlus(sum);

sum()

// 使用 addLoggingInjection

//log('------addLoggingInjection-------------');

//sum = addLoggingIngetion(sum);

//sum()




