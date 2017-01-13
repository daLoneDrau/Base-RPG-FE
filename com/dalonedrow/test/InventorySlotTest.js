/**
 * 
 */
console.log("testing InventorySlot");

var assert = require("assert");
var InventorySlot = require("../rpgbase/InventorySlot.js");
var h0 = new InventorySlot();
var h1 = new InventorySlot();
console.log(h0.getHashcode());
console.log(h0);
assert.equal(null, h0.getIo());
assert.ok(!h0.isShow());
var io = {};
h0.setIo(io);
h0.setShow(true);
assert.equal(io, h0.getIo());
assert.ok(h0.isShow());
var watcher = {
    getHashcode : function() {
        return "hashhash";
    },
    watchUpdated : function(watchable) {
        console.log("watching " + watchable.getHashcode());
    }
};
h0.addWatcher(watcher);
h1.addWatcher(watcher);
console.log("should see 2 watch messages");
h0.notifyWatchers();
h1.notifyWatchers();
h0.removeWatcher(watcher);
console.log("should see 1 watch messages");
h0.notifyWatchers();
h1.notifyWatchers();
