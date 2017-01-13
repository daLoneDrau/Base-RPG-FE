/**
 * 
 */
console.log("testing BaseInteractiveObject");

var assert = require("assert");
var BaseInteractiveObject = require("../rpgbase/BaseInteractiveObject.js");
var o0 = new BaseInteractiveObject(1);
console.log(o0);
assert.ok(!o0.isInGroup("test"));
o0.addGroup("test");
assert.ok(o0.isInGroup("test"));
try {
o0.getAnimation();
} catch (err) {
    console.error(err);
}