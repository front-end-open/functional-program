// addLoggin 单元测试
const {addLoggingPlus} = require('../../libs/common')
const chai = require('chai');
const sinon = require('sinon');
const {expect} = require('chai');

describe('a logging function', function(){
    it('should log twice with well behaved function', () => {
        let something = (a, b) => `result=${a}:${b}`;
        something = addLoggingPlus(something);
        sinon.spy(window.console, "log");
        something(22, 19);
        chai.expect(window.console.log).to.have.been.call(2)
        chai.expect(window.console.log).to.have.been.with(
            "entering something: 22, 19"
        );

        chai.expect(window.console.log).toHaveBeenCalledWith("exiting something: 22, 19");
    });

    it("should report a thrown exception", () => {
            let thrower = (a, b, c) => {
            throw "CRASH!";
        };
        
        sinon.spy(window.console, "log");
        chai.expect(thrower).toThrow();
        thrower = addLoggingPlus(thrower);
        
        try {
            thrower(1, 2, 3);
        } catch (e) {
            chai.expect(window.console.log).toHaveBeenCalledTimes(2);
            chai.expect(window.console.log).toHaveBeenCalledWith(
                "entering thrower: 1,2,3"
            );
            chai.expect(window.console.log).toHaveBeenCalledWith(
                "exiting thrower: threw CRASH!"
            );
        }
     });
});






