/**
 * 
 */
console.log("testing Script");

var assert = require("assert");
var Script = require("../rpgbase/Script.js");
var TestScriptInstance = require("./TestScriptInstance.js");
assert.throws(function() {
    Script.setInstance()
}, "shoud throw for no args");
assert.throws(function() {
    Script.setInstance(null)
}, "shoud throw for null args");
assert.throws(function() {
    Script.setInstance(1)
}, "shoud throw for invalid args");
assert.equal(null, Script.getInstance());
var ti = new TestScriptInstance();
Script.setInstance(new TestScriptInstance());
assert.notEqual(null, Script.getInstance());