/**
 * 
 */
console.log("testing BehaviourData");

var assert = require("assert");
var BehaviourData = require("../rpgbase/BehaviourData.js");
var h0 = new BehaviourData();
assert.ok(!h0.exists());
h0.setExists(true);
assert.ok(h0.exists());
h0.setExists(false);
assert.ok(!h0.exists());