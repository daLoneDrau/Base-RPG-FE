/**
 * 
 */
console.log("testing assert");

var assert = require("assert");
var Hashcode = require("../rpgbase/Hashcode.js");
var h0 = new Hashcode();
var h1 = new Hashcode();
var h2 = new Hashcode();
var h3 = new Hashcode();
console.log(h0);
console.log(h0.getHashcode());
console.log(h1.getHashcode());
console.log(h2.getHashcode());
console.log(h3.getHashcode());
console.log(Hashcode.codes);
assert.notEqual(h0.getHashcode(), h1.getHashcode(), "hashcodes should not match!")