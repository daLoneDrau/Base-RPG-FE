/**
 * 
 */
var Hashcode = require("./Hashcode.js");
function InventoryData() {
    Hashcode.call(this);
    /** the IO associated with this {@link InventoryData}. */
    var io = null;
    /** flag indicating the left ring needs to be replaced. */
    var leftRing = false;
    /** the number of inventory slots. */
    var numInventorySlots;
    /** the inventory slots. */
    var slots;
    /**
     * Sets the inventory slots.
     * 
     * @param val
     *            the inventory slots
     */
    function setSlots(val) {
        slots = val;
    }
    /**
     * Sends messages between an item and its owner that it is now in inventory.
     * 
     * @param invOwnerIO
     *            the owner
     * @param itemIO
     *            the item
     * @throws Error
     *             if an error occurs
     */
    this.ARX_INVENTORY_Declare_InventoryIn = function(invOwnerIO, itemIO) {
        if (itemIO !== null) {
            // TODO - handle ignition
            // if (io->ignition > 0) {
            // if (ValidDynLight(io->ignit_light))
            // DynLight[io->ignit_light].exist = 0;

            // io->ignit_light = -1;

            // if (io->ignit_sound != ARX_SOUND_INVALID_RESOURCE) {
            // ARX_SOUND_Stop(io->ignit_sound);
            // io->ignit_sound = ARX_SOUND_INVALID_RESOURCE;
            // }

            // io->ignition = 0;
            // }

            // send event from item to inventory owner
            Script.getInstance().setEventSender(itemIO);
            Script.getInstance().sendIOScriptEvent(invOwnerIO,
                    ScriptConsts.SM_002_INVENTORYIN, new Object[0], null);
            // send event from inventory owner to item
            Script.getInstance().setEventSender(invOwnerIO);
            Script.getInstance().sendIOScriptEvent(itemIO,
                    ScriptConsts.SM_002_INVENTORYIN, new Object[0], null);
            // clear global event sender
            Script.getInstance().setEventSender(null);
        }
    }
    /**
     * Action when a player attempts to identify an item.
     * 
     * @param playerIO
     *            the player's {@link IO}
     * @param itemIO
     *            the itme's {@link IO}
     * @throws Error
     *             if an error occurs
     */
    this.ARX_INVENTORY_IdentifyIO = function(playerIO, itemIO) {
        if (playerIO != null && playerIO.hasIOFlag(IoGlobals.IO_01_PC)
                && playerIO.getPCData() !== null && itemIO !== null
                && itemIO.hasIOFlag(IoGlobals.IO_02_ITEM)
                && itemIO.getItemData() !== null
                && itemIO.getItemData().getEquipitem() !== null) {
            if (playerIO.getPCData().canIdentifyEquipment(
                    itemIO.getItemData().getEquipitem())) {
                Script.getInstance().sendIOScriptEvent(itemIO,
                        ScriptConsts.SM_69_IDENTIFY, null, "");
            }
        }
    }
    /**
     * Determines if an item can be put in inventory.
     * 
     * @param itemIO
     *            the item
     * @return <tt>true</tt> if the item can be put in inventory;
     *         <tt>false</tt> otherwise
     * @throws Error
     *             if an error occurs
     */
    this.CheckForInventoryReplaceMe = function(itemIO) {
        var can = false;
        if (itemIO !== null && !itemIO.hasIOFlag(IoGlobals.IO_15_MOVABLE)) {
            if (itemIO.hasIOFlag(IoGlobals.IO_10_GOLD)
                    && io.hasIOFlag(IoGlobals.IO_01_PC)) {
                io.getPCData().adjustGold(itemIO.getItemData().getPrice());
                if (itemIO.isScriptLoaded()) {
                    Interactive.getInstance().RemoveFromAllInventories(itemIO);
                    Interactive.getInstance().releaseIO(itemIO);
                } else {
                    itemIO.setShow(IoGlobals.SHOW_FLAG_KILLED);
                    itemIO.removeGameFlag(IoGlobals.GFLAG_ISINTREATZONE);
                }
                can = true;
            }
            if (!can) {
                // first try to stack
                for (var i = slots.length - 1; i >= 0; i--) {
                    var slotIO = slots[i].getIo();
                    if (slotIO != null
                            && slotIO.getItemData().getStackSize() > 1
                            && Interactive.getInstance().isSameObject(itemIO,
                                    slotIO)) {
                        // found a matching item - try to stack
                        var slotCount = slotIO.getItemData().getCount();
                        var itemCount = itemIO.getItemData().getCount();
                        var slotMaxStack = slotIO.getItemData().getStackSize();
                        if (slotCount < slotMaxStack) {
                            // there's room to stack more - stack it
                            slotIO.getItemData().adjustCount(itemCount);
                            // check to see if too many are stacked
                            slotCount = slotIO.getItemData().getCount();
                            if (slotCount > slotMaxStack) {
                                // remove excess from stack
                                // and put it back into item io
                                itemIO.getItemData().setCount(
                                        slotCount - slotMaxStack);
                                slotIO.getItemData().setCount(slotMaxStack);
                            } else {
                                // no excess. remove count from item io
                                itemIO.getItemData().setCount(0);
                            }
                            // was item count set to 0? release the IO
                            if (itemIO.getItemData().getCount() === 0) {
                                if (itemIO.isScriptLoaded()) {
                                    var inner = Interactive.getInstance()
                                            .getMaxIORefId();
                                    for (; inner >= 0; inner--) {
                                        if (Interactive.getInstance().hasIO(
                                                inner)) {
                                            var innerIO = Interactive
                                                    .getInstance().getIO(inner);
                                            if (innerIO.equals(itemIO)) {
                                                Interactive.getInstance()
                                                        .releaseIO(innerIO);
                                                innerIO = null;
                                            }
                                        }
                                    }
                                } else {
                                    itemIO.setShow(IoGlobals.SHOW_FLAG_KILLED);
                                }
                            }
                            // declare item in inventory
                            this.ARX_INVENTORY_Declare_InventoryIn(io, slotIO);
                            can = true;
                            break;
                        }
                    }
                }
            }
            // cant stack the item? find an empty slot
            if (!can) {
                // find an empty slot for the item
                for (var i = slots.length - 1; i >= 0; i--) {
                    // got an empty slot - add it
                    if (slots[i].getIo() === null) {
                        slots[i].setIo(itemIO);
                        slots[i].setShow(true);
                        this.ARX_INVENTORY_Declare_InventoryIn(io, itemIO);
                        can = true;
                        break;
                    }
                }
            }
        }
        return can;
    }
    /**
     * UNTESTED DO NOT USE Replaces an item in an IO's inventory.
     * 
     * @param itemIO
     *            the item being added
     * @param old
     *            the item being replaced
     * @throws Error
     *             if an error occurs
     */
    this.CheckForInventoryReplaceMe = function(itemIO, old) {
        if (itemIO !== null && old !== null) {
            var handled = false;
            if (io.hasIOFlag(IoGlobals.IO_01_PC)) {
                if (this.IsInPlayerInventory(old)) {
                    if (this.CanBePutInInventory(itemIO)) {
                        handled = true;
                    } else {
                        this.PutInFrontOfPlayer(itemIO, true);
                        handled = true;
                    }
                }
            }
            if (!handled) {
                var i = Interactive.getInstance().getMaxIORefId();
                for (; i >= 0; i--) {
                    var io = Interactive.getInstance().getIO(i);
                    if (io !== null && io.getInventory() !== null) {
                        var invData = io.getInventory();
                        if (invData.IsInPlayerInventory(old)) {
                            if (this.CanBePutInInventory(itemIO)) {
                                handled = true;
                                break;
                            } else {
                                this.PutInFrontOfPlayer(itemIO, true);
                                handled = true;
                                break;
                            }
                        }
                        id = null;
                    }
                }
            }
        }
    }
    /** Removes all items from inventory. */
    this.CleanInventory = function() {
        for (var i = slots.length - 1; i >= 0; i--) {
            slots[i].setIo(null);
            slots[i].setShow(true);
        }
    }
    /**
     * Forces all items to be set at a specific level.
     * 
     * @param level
     *            the level
     */
    this.ForcePlayerInventoryObjectLevel = function(level) {
        for (var i = slots.length - 1; i >= 0; i--) {
            if (slots[i].getIo() !== null) {
                slots[i].getIo().setLevel(level);
            }
        }
    }
    /**
     * Gets the IO associated with this {@link InventoryData}.
     * 
     * @return {@link IO}
     */
    this.getIo = function() {
        return io;
    }
    /**
     * Gets the inventory slot at the specific index.
     * 
     * @param index
     *            the slot index
     * @return {@link SLOT}
     */
    this.getSlot = function(index) {
        return slots[index];
    }
    /**
     * Determines if an item is in inventory.
     * 
     * @param io
     *            the item
     * @return <tt>true</tt> if the item is in inventory; <tt>false</tt>
     *         otherwise
     */
    this.IsInPlayerInventory = function(io) {
        var is = false;
        for (var i = slots.length - 1; i >= 0; i--) {
            var ioo = slots[i].getIo();
            if (ioo !== null && ioo.getRefId() === io.getRefId()) {
                is = true;
                break;
            }
        }
        return is;
    }
    /**
     * Replaces an item in all inventories.
     * 
     * @param oldItemIO
     *            the old item being replaced
     * @param newItemIO
     *            the new item
     * @throws Error
     *             if an error occurs
     */
    this.ReplaceInAllInventories = function(oldItemIO, newItemIO) {
        if (oldItemIO != null && !oldItemIO.hasIOFlag(IoGlobals.IO_15_MOVABLE)
                && newItemIO != null
                && !newItemIO.hasIOFlag(IoGlobals.IO_15_MOVABLE)) {
            var oldIORefId = Interactive.getInstance().GetInterNum(oldItemIO);
            var newIORefId = Interactive.getInstance().GetInterNum(newItemIO);
            var i = Interactive.getInstance().getMaxIORefId();
            for (; i >= 0; i--) {
                if (i === oldIORefId || i === newIORefId
                        || !Interactive.getInstance().hasIO(i)) {
                    continue;
                }
                var invOwner = Interactive.getInstance().getIO(i);
                if (invOwner.getInventory() !== null) {
                    var inv = invOwner.getInventory();
                    for (var j = inv.slots.length - 1; j >= 0; j--) {
                        if (inv.slots[j].getIo().getRefId() === oldItemIO
                                .getRefId()) {
                            inv.slots[j].setIo(newItemIO);
                            break;
                        }
                    }
                }
            }
        }
    }
    /**
     * Sends a scripted command to an item in inventory.
     * 
     * @param itemName
     *            the item name
     * @param message
     *            the message
     * @throws Error
     *             if an error occurs
     */
    this.SendInventoryObjectCommand = function(itemName, message) {
        if (itemName !== null && itemName.length() > 0 && slots !== null) {
            for (var i = slots.length - 1; i >= 0; i--) {
                var slotIO = slots[i].getIo();
                if (slotIO != null
                        && slotIO.hasGameFlag(IoGlobals.GFLAG_INTERACTIVITY)
                        && slotIO.getItemData() != null) {
                    var ioName = slotIO.getItemData().getItemName();
                    if (itemName === ioName) {
                        Script.getInstance().sendIOScriptEvent(slotIO, message,
                                null, "");
                        slotIO = null;
                        break;
                    }
                    ioName = null;
                }
                slotIO = null;
            }
        }
    }
    /**
     * Sets the IO associated with the inventory.
     * 
     * @param newIO
     *            the IO to set
     */
    this.setIo = function(newIO) {
        this.io = newIO;
    }
    /**
     * Sets the value of the flag indicating whether the left ring is the next
     * one that needs to be switched.
     * 
     * @param flag
     *            the new value to set
     */
    this.setLeftRing = function(flag) {
        this.leftRing = flag;
    }
    /**
     * Gets the flag indicating whether the left ring is the next one that needs
     * to be switched.
     * 
     * @return <tt>true</tt> if the left ring should be switched;
     *         <tt>false</tt> otherwise
     */
    this.isLeftRing = function() {
        return leftRing;
    }
}
module.exports = InventoryData;
