/**
 * 
 */
console.log("testing BaseInteractiveObject");

var assert = require("assert");
var BaseInteractiveObject = require("../rpgbase/BaseInteractiveObject.js");
var IoGlobals = require("../rpgbase/IoGlobals.js");
var ObjectType = require("../rpgbase/ObjectType.js");
// *************************************************************************************************
// test creation
// *************************************************************************************************
assert.throws(function() {
    new BaseInteractiveObject()
    }, "should not be able to create with no refid");
var o0 = new BaseInteractiveObject(1);
console.log(o0);
// *************************************************************************************************
// test animations
// *************************************************************************************************
assert.throws(function() {
    o0.addAnimation()
    }, "should not add animation with no args");
assert.throws(function() {
    o0.addAnimation(null, 1)
    }, "should not add animation with null args");
assert.throws(function() {
    o0.addAnimation("1", null) }, "should not add animation with null args");
assert.throws(function() {
    o0.addAnimation("tim", "wendy") }, "anim id must be int ");
o0.addAnimation("testAnim", 1);
assert.throws(function() {
    o0.getAnimation() }, "parameter required");
assert.throws(function() {
    o0.getAnimation("missing") }, "anim must have been added");
assert.equal(1, o0.getAnimation("testAnim"));
o0.addAnimation("testAnim", 2);
assert.equal(2, o0.getAnimation("testAnim"));
//*************************************************************************************************
//test behavior flags
//*************************************************************************************************
o0.addBehaviorFlag(1);
o0.addBehaviorFlag(256);
assert.ok(o0.hasBehaviorFlag(1));
assert.ok(o0.hasBehaviorFlag(256));
assert.ok(!o0.hasBehaviorFlag(2));
o0.removeBehaviorFlag(1);
o0.removeBehaviorFlag(2);
assert.ok(!o0.hasBehaviorFlag(1));
assert.ok(o0.hasBehaviorFlag(256));
assert.ok(!o0.hasBehaviorFlag(2));
o0.clearBehaviorFlags();
assert.ok(!o0.hasBehaviorFlag(1));
assert.ok(!o0.hasBehaviorFlag(256));
assert.ok(!o0.hasBehaviorFlag(2));
//*************************************************************************************************
//test game flags
//*************************************************************************************************
o0.addGameFlag(1);
o0.addGameFlag(256);
assert.ok(o0.hasGameFlag(1));
assert.ok(o0.hasGameFlag(256));
assert.ok(!o0.hasGameFlag(2));
o0.removeGameFlag(1);
o0.removeGameFlag(2);
assert.ok(!o0.hasGameFlag(1));
assert.ok(o0.hasGameFlag(256));
assert.ok(!o0.hasGameFlag(2));
o0.clearGameFlags();
assert.ok(!o0.hasGameFlag(1));
assert.ok(!o0.hasGameFlag(256));
assert.ok(!o0.hasGameFlag(2));
//*************************************************************************************************
//test groups
//*************************************************************************************************
assert.ok(!o0.isInGroup("test"));
o0.addGroup("test");
assert.ok(o0.isInGroup("test"));
o0.removeGroup(null);
assert.ok(o0.isInGroup("test"));
o0.removeGroup("test");
assert.ok(!o0.isInGroup("test"));
//*************************************************************************************************
//test IO flags
//*************************************************************************************************
o0.addIOFlag(1);
o0.addIOFlag(256);
assert.ok(o0.hasIOFlag(1));
assert.ok(o0.hasIOFlag(256));
assert.ok(!o0.hasIOFlag(2));
o0.removeIOFlag(1);
o0.removeIOFlag(2);
assert.ok(!o0.hasIOFlag(1));
assert.ok(o0.hasIOFlag(256));
assert.ok(!o0.hasIOFlag(2));
o0.clearIOFlags();
assert.ok(!o0.hasIOFlag(1));
assert.ok(!o0.hasIOFlag(256));
assert.ok(!o0.hasIOFlag(2));
//*************************************************************************************************
//test type flags
//*************************************************************************************************
o0.addTypeFlag(ObjectType.OBJECT_TYPE_DAGGER);
assert.ok(o0.hasTypeFlag(ObjectType.OBJECT_TYPE_DAGGER));
assert.ok(o0.hasTypeFlag(ObjectType.OBJECT_TYPE_WEAPON));
assert.ok(o0.hasIOFlag(IoGlobals.IO_02_ITEM));
o0.removeTypeFlag(ObjectType.OBJECT_TYPE_DAGGER);
assert.ok(!o0.hasTypeFlag(ObjectType.OBJECT_TYPE_DAGGER));
o0.addTypeFlag(ObjectType.OBJECT_TYPE_DAGGER);
assert.ok(o0.hasTypeFlag(ObjectType.OBJECT_TYPE_DAGGER));
assert.ok(o0.hasTypeFlag(ObjectType.OBJECT_TYPE_WEAPON));
o0.clearTypeFlags();
assert.ok(!o0.hasTypeFlag(ObjectType.OBJECT_TYPE_DAGGER));
assert.ok(!o0.hasTypeFlag(ObjectType.OBJECT_TYPE_WEAPON));
//*************************************************************************************************
//test equals
//*************************************************************************************************
assert.ok(!o0.equals(1));
assert.ok(o0.equals(o0));


try {
    //o0.getAnimation();
} catch (err) {
    console.error(err);
}