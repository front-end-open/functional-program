const { addTiming,addLoggingIngetion} = require('../libs/common')
const {performance} = require('perf_hooks')
const log = console.log;


function sum(a, b) {
    b = convert(b);

    return a + b;
}

function convert(a) {
    return -a;
}

sum = addLoggingIngetion(sum, log); // 注入 log
convert = addLoggingIngetion(convert, log)  // 注入 log

sum(7, 5);

/**
 *entering sum: 7,5
 * entering convert: 5
 * exiting convert: -5
 * exiting sum: 2
 *
 *
 *
    * */

// 测试函数调用时间方法

log('--------executeTime--------');

// performance 在Node等价 模块 pref_hook

function postMsg(msg){
    return msg
}


postMsg = addTiming(postMsg, () => performance.now(), log);

postMsg('put msg: hello world') // normal exit postMsg 36.88222400005907 36.90228199958801







