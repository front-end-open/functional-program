// 可重用模块化函数模版
// 已log4js为例子
// 问题场景：日常的后台应用需要为不同状态配置不同日志信息, 可重用的函数模版可以会更具创建时的参数数量来定义一系列相关函数
import log4 from 'log4js';

// 伪代码
/** 
 * const logger = function (appender, layout, name, level, message) {
 *   根据参数映射配置,
    const addpenders = {    预设 appender  字典
        'alert': new Log4js.JSAlertAppender(),
        'console': new Log4js.BrowerConsoleAppender()
    }
 *  
    const layouts = {   预设布局 layout 字典
        'basic': new Log4js.BasicLayout(),
        'json': new Log4js.JONSLayout(),
        'xml': new Log4js.XMLLayout()
    };

    根据参数映射对应配置
 * const appender = appenders[appender]
 * appender.setLayout(layouts[layout])
 * const logger = new Log4js.getLogger(name)
 * logger.addAppender(appender)
 * logger.addAppender(appender);
 * logger.log(level, message, null)
 * 
 * */
