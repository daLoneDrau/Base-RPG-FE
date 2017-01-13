/**
 * 
 */
var Hashcode = require("./Hashcode.js");
var Watchable = require("../util/Watchable.js");
function InventorySlot() {
    Hashcode.call(this);
    Watchable.call(this);
    /** the item occupying the inventory slot. */
    io = null;
    /** a flag indicating the item is showing and should be rendered. */
    show = false;
    /**
     * Gets the item occupying the inventory slot.
     * 
     * @return {@link IO}
     */
    this.getIo = function() {
        return io;
    }
    /**
     * Gets the flag indicating the item is showing and should be rendered.
     * 
     * @return <code>boolean</code>
     */
    this.isShow = function() {
        return show;
    }
    /**
     * Sets the item occupying the inventory slot.
     * 
     * @param val
     *            the val to set
     */
    this.setIo = function(val) {
        io = val;
        this.notifyWatchers();
    }
    /**
     * Sets the flag indicating the item is showing and should be rendered.
     * 
     * @param flag
     *            the show to set
     */
    this.setShow = function(flag) {
        show = flag;
        this.notifyWatchers();
    }
}
module.exports = InventorySlot;
