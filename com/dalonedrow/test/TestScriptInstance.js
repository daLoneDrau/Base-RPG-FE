/**
 * 
 */
var Script = require("../rpgbase/Script.js");
function TestScriptInstance() {
    Script.call(this);;
}// SubClass Inherits the SuperClass
TestScriptInstance.prototype = new Script();

// correct the constructor pointer
TestScriptInstance.prototype.constructor = TestScriptInstance;
module.exports = TestScriptInstance;