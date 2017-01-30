/**
 * 
 */
console.log("testing EquipmentItemModifier");

var assert = require("assert");
var EquipmentItemModifier = require("../rpgbase/EquipmentItemModifier.js");
var h0 = new EquipmentItemModifier();
assert.ok(!h0.isPercentage());
h0.setPercentage(true);
h0.setValue(10);
assert.ok(h0.isPercentage());
assert.equal(10, h0.getValue());
var h1 = new EquipmentItemModifier();
h1.setPercentage(false);
h1.setValue(2);
assert.throws(function() {
    h0.set(1)
    }, "should not add animation with no args");
h0.set(h1);
assert.ok(!h0.isPercentage());
assert.equal(2, h0.getValue());