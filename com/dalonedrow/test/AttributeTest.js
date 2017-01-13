/**
 * 
 */
console.log("testing Attribute");

var assert = require("assert");
var Attribute = require("../rpgbase/Attribute.js");
var h0 = new Attribute("STR", "desc");
console.log(h0.getHashcode());
console.log(h0);
assert.equal("STR", h0.getAbbreviation());
assert.equal(0, h0.getBase());
assert.equal("", h0.getDescription());
assert.equal("desc", h0.getDisplayName());
assert.equal(0, h0.getFull());
assert.equal(0, h0.getModifier());
h0.adjustModifier(2);
assert.equal(2, h0.getFull());
assert.equal(2, h0.getModifier());
h0.clearModifier();
assert.equal(0, h0.getFull());
assert.equal(0, h0.getModifier());
h0.setAbbreviation("ABR");
h0.setBase(5);
h0.setDescription("Desc");
h0.setDisplayName("Name");
assert.equal("ABR", h0.getAbbreviation());
assert.equal(5, h0.getBase());
assert.equal("Desc", h0.getDescription());
assert.equal("Name", h0.getDisplayName());