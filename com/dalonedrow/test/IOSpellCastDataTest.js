/**
 * 
 */
console.log("testing IOSpellCastData");

var assert = require("assert");
var IOSpellCastData = require("../rpgbase/IOSpellCastData.js");
var h0 = new IOSpellCastData();
console.log(h0.getHashcode());
console.log(h0);
assert.equal(0, h0.getCastingspell());
assert.equal(0, h0.getDuration());
assert.equal(0, h0.getSpellLevel());
assert.equal(0, h0.getTarget());
h0.setCastingspell(3);
h0.setDuration(2000);
h0.setSpellLevel(1);
h0.setTarget(2);
assert.equal(3, h0.getCastingspell());
assert.equal(2000, h0.getDuration());
assert.equal(1, h0.getSpellLevel());
assert.equal(2, h0.getTarget());
h0.addSpellFlag(1);
h0.addSpellFlag(256);
assert.ok(h0.hasSpellFlag(1));
assert.ok(h0.hasSpellFlag(256));
assert.ok(!h0.hasSpellFlag(2));
h0.removeSpellFlag(1);
h0.removeSpellFlag(2);
assert.ok(!h0.hasSpellFlag(1));
assert.ok(h0.hasSpellFlag(256));
assert.ok(!h0.hasSpellFlag(2));
h0.clearSpellFlags();
assert.ok(!h0.hasSpellFlag(1));
assert.ok(!h0.hasSpellFlag(256));
assert.ok(!h0.hasSpellFlag(2));