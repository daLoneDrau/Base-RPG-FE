/**
 * 
 */
var Hashcode = require("./Hashcode.js");
var IoGlobals = require("./IoGlobals.js");
var IOSpellCastData = require("./IOSpellCastData.js");
var ObjectType = require("./ObjectType.js");
function BaseInteractiveObject(id) {
    Hashcode.call(this);
    /** the animation ids associated with the interactive object. */
    var animations = {};
    /** the {@link BaseInteractiveObject}'s armor material. */
    var armormaterial = "";
    /** any flags that have been set. */
    var behaviorFlags = 0;
    var damageSum = 0;
    /** flags indicating the IO is taking damage of a specific type. */
    var dmgFlags = 0;
    /** any game flags that have been set. */
    var gameFlags = 0;
    /** the inventory data. */
    var inventory = null;
    /** any flags that have been set. */
    var ioFlags = 0;
    /** the list of groups to which the IO belongs. */
    var ioGroups = [];
    var itemData = null;
    var level = 0;
    var mainevent = "";
    var npcData = null;
    /** overriding script associated with the object. */
    var overscript = null;
    var pcData = null;
    var poisonCharges = 0;
    var poisonLevel = 0;
    /** the object's position. */
    var position = null;
    /** the object's reference id. */
    var refId = 0;
    /** primary script associated with the object. */
    var script = null;
    /** is the item loaded by script. */
    var scriptLoaded = false;
    /** the show status (in scene, in inventory). */
    var show = 0;
    var sparkNBlood = 0;
    var spellcastData = new IOSpellCastData();
    /** the list of spells currently active on the object. */
    var spellsOn = [];
    var statCount = 0;
    var statSent = 0;
    var summoner = 0;
    var targetinfo = 0;
    /**
     * any type flags that have been set (is the object a goblin, weapon,
     * etc...).
     */
    var typeFlags = 0;
    /** the {@link BaseInteractiveObject}'s weapon material. */
    var weaponmaterial = null;
    if (arguments.length === 1 && !isNaN(arguments[0])
            && parseInt(Number(arguments[0])) === arguments[0]
            && !isNaN(parseInt(arguments[0], 10))) {
        refId = parseInt(arguments[0], 10);
    } else {
        throw new Error("Cannot create without reference id");
    }
    /**
     * Adds an animation by a given name to the interactive object.
     * 
     * @param name the animation's name
     * @param id the animation's reference id
     * @throws PooledException if there is an error with the stringbuilder
     * @throws RPGException if the name is null
     */
    this.addAnimation = function(name, id) {
        if (arguments.length !== 2) {
            var s = [];
            s.push("ERROR! InteractiveObject.addAnimation() - ");
            s.push("requires 2 parameters");
            throw new Error(s.join(""));
        }
        if (name === null
                || id === null) {
            var s = [];
            s.push("ERROR! InteractiveObject.addAnimation() - ");
            s.push("null value sent in parameters");
            throw new Error(s.join(""));
        }
        if (isNaN(id)
                || parseInt(Number(id)) !== id
                || isNaN(parseInt(id, 10))) {
            var s = [];
            s.push("ERROR! InteractiveObject.addAnimation() - ");
            s.push("animation id must be an integer");
            throw new Error(s.join(""));
        }
        animations[name] = id;
    }
    /**
     * Adds a behavior flag.
     * @param flag the flag
     */
    this.addBehaviorFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.addBehaviorFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        behaviorFlags |= flag;
    }
    /**
     * Adds a game flag.
     * @param flag the flag
     */
    this.addGameFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.addGameFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        gameFlags |= flag;
    }
    /**
     * Adds the IO to a group.
     * @param group the group
     */
    this.addGroup = function(group) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.addGroup() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        var found = false;
        for (var i = 0; i < ioGroups.length; i++) {
            if (group === ioGroups[i]) {
                found = true;
                break;
            }
        }
        if (!found) {
            ioGroups.push(group);
        }
    }
    /**
     * Adds a flag.
     * @param flag the flag
     */
    this.addIOFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.addIOFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        ioFlags |= flag;
    }
    /**
     * Adds an active spell on the object.
     * @param spellId the spell's id
     */
    this.addSpellOn = function(spellId) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.addSpellOn() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        if (spellsOn === null) {
            spellsOn = [];
        }
        spellsOn.push(spellId);
    }
    /**
     * Adds a type flag.
     * @param flag the flag
     * @throws Error if an invalid type is set
     */
    this.addTypeFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.addTypeFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        switch (flag) {
            case ObjectType.OBJECT_TYPE_DAGGER:
            case ObjectType.OBJECT_TYPE_1H:
            case ObjectType.OBJECT_TYPE_2H:
            case ObjectType.OBJECT_TYPE_BOW:
                this.clearTypeFlags();
                typeFlags |= ObjectType.OBJECT_TYPE_WEAPON;
                this.addIOFlag(IoGlobals.IO_02_ITEM);
                break;
            case ObjectType.OBJECT_TYPE_SHIELD:
            case ObjectType.OBJECT_TYPE_ARMOR:
            case ObjectType.OBJECT_TYPE_HELMET:
            case ObjectType.OBJECT_TYPE_LEGGINGS:
            case ObjectType.OBJECT_TYPE_RING:
                this.addIOFlag(IoGlobals.IO_02_ITEM);
            case ObjectType.OBJECT_TYPE_FOOD:
            case ObjectType.OBJECT_TYPE_GOLD:
                this.clearTypeFlags();
                break;
            case EquipmentGlobals.OBJECT_TYPE_WEAPON:
                throw new Error(
                        "Cannot set weapon type, must specify weapon class");
            default:
                throw new Error("Invalid object type " + flag);
        }
        typeFlags |= flag;
    }
    /** Clears all behavior flags that were set. */
    this.clearBehaviorFlags = function() {
        behaviorFlags = 0;
    }
    /** Clears all game flags that were set. */
    this.clearGameFlags = function() {
        gameFlags = 0;
    }
    /** Clears all flags that were set. */
    this.clearIOFlags = function() {
        ioFlags = 0;
    }
    /** Clears all type flags that were set. */
    this.clearTypeFlags = function() {
        typeFlags = 0;
    }
    /**
     * {@inheritDoc}
     */
    this.equals = function(obj) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.equals() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        var equals = false;
        if (obj !== null
                && obj instanceof BaseInteractiveObject
                && refId === obj.getRefId()) {
            equals = true;
        }
        return equals;
    }
    /**
     * Gets the reference id of the animation associated with a specific name.
     * @param name the name of the animation
     * @return var
     * @throws Error if the name is null, or no animation by the given name was
     *             ever set on the interactive object
     */
    this.getAnimation = function(name) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.getAnimation() - ");
            s.push("no value sent in parameters");
            throw new Error(s.join(""));
        }
        if (name === null) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.getAnimation() - ");
            s.push("null value sent in parameters");
            throw new Error(s.join(""));
        }
        if (!animations.hasOwnProperty(name)) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.getAnimation() - ");
            s.push("no animation set for ");
            s.push(name);
            throw new Error(s.join(""));
        }
        return animations[name];
    }
    /**
     * Gets the {@link BaseInteractiveObject}'s armor material. 
     * @return {@link var}
     */
    this.getArmormaterial = function() {
        return armormaterial;
    }
    this.getDamageSum = function() {
        return damageSum;
    }
    /**
     * Gets the IO's inventory.
     * @return {@link INVENTORY}
     */
    this.getInventory = function() {
        return inventory;
    }
    /**
     * Gets a group to which the IO belongs.
     * @param index the index
     * @return {@link var}
     */
    this.getIOGroup = function(index) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.getIOGroup() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        return ioGroups[index];
    }
    /**
     * Gets item data for the {@link BaseInteractiveObject}.
     * @return {@link ITEM}
     */
    this.getItemData = function() {
        return itemData;
    }
    /**
     * Gets the value for the level.
     * @return {@link var}
     */
    this.getLevel = function() {
        return level;
    }
    /**
     * Gets the mainevent.
     * @return {@link var}
     */
    this.getMainevent = function() {
        return mainevent;
    }
    /**
     * Gets NPC data for the {@link BaseInteractiveObject}.
     * @return {@link NPC}
     */
    this.getNPCData = function() {
        return npcData;
    }
    /**
     * Gets the number of spells on the {@link BaseInteractiveObject}.
     * @return <code>var</code>
     */
    this.getNumberOfSpellsOn = function() {
        return numberOfSpellsOn;
    }
    /**
     * Gets the number of IO groups to which the IO belongs.
     * @return {@link var}
     */
    this.getNumIOGroups = function() {
        return ioGroups.length;
    }
    /**
     * Gets the overscript.
     * @return {@link SCRIPT}
     */
    this.getOverscript = function() {
        return overscript;
    }
    /**
     * Gets item data for the {@link BaseInteractiveObject}.
     * @return {@link PC}
     */
    this.getPCData = function() {
        return pcData;
    }
    this.getPoisonCharges = function() {
        return poisonCharges;
    }
    /**
     * Gets the value for the poisonLevel.
     * @return {@link var}
     */
    this.getPoisonLevel = function() {
        return poisonLevel;
    }
    /**
     * Gets the position.
     * @return {@link SimpleVector2}
     */
    this.getPosition = function() {
        return position;
    }
    /**
     * Gets the {@link BaseInteractiveObject}'s reference id.
     * @return var
     */
    this.getRefId = function() {
        return refId;
    }
    /**
     * Gets the script
     * @return {@link SCRIPT}
     */
    this.getScript = function() {
        return script;
    }
    /**
     * Gets the show status.
     * @return <code>var</code>
     */
    this.getShow = function() {
        return show;
    }
    this.getSparkNBlood = function() {
        return sparkNBlood;
    }
    /**
     * Gets the spellcast_data
     * @return {@link IOSpellCastData}
     */
    this.getSpellcastData = function() {
        return spellcastData;
    }
    this.getSpellOn = function(index) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.getSpellOn() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        return spellsOn[index];
    }
    /**
     * Gets the statCount
     * @return {@link var}
     */
    this.getStatCount = function() {
        return statCount;
    }
    /**
     * Gets the statSent
     * @return {@link var}
     */
    this.getStatSent = function() {
        return statSent;
    }
    this.getSummoner = function() {
        return summoner;
    }
    /**
     * Gets the targetinfo
     * @return {@link var}
     */
    this.getTargetinfo = function() {
        return targetinfo;
    }
    /**
     * Gets the {@link BaseInteractiveObject}'s weapon material.
     * @return {@link var}
     */
    this.getWeaponmaterial = function() {
        return weaponmaterial;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific behavior
     * flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    this.hasBehaviorFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.hasBehaviorFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        return (behaviorFlags & flag) === flag;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific game flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    this.hasGameFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.hasGameFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        return (gameFlags & flag) === flag;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    this.hasIOFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.hasIOFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        return (ioFlags & flag) === flag;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific type flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    this.hasTypeFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.hasTypeFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        return (typeFlags & flag) === flag;
    }
    this.isInGroup = function(group) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.isInGroup() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        var found = false;
        for (var i = 0; i < ioGroups.length; i++) {
            if (group === ioGroups[i]) {
                found = true;
                break;
            }
        }
        return found;
    }
    /**
     * Gets the flag indicating if the item is loaded by script.
     * @return <code>var</code>
     */
    this.isScriptLoaded = function() {
        return scriptLoaded;
    }
    /** Removes all active spells. */
    this.removeAllSpells = function() {
        spellsOn = [];
    }
    /**
     * Removes a behavior flag.
     * @param flag the flag
     */
    this.removeBehaviorFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.removeBehaviorFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        behaviorFlags &= ~flag;
    }
    /**
     * Removes a game flag.
     * @param flag the flag
     */
    this.removeGameFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.removeGameFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        gameFlags &= ~flag;
    }
    /**
     * Removes the IO from a group.
     * @param group the group
     */
    this.removeGroup = function(group) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.removeGroup() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        var index = -1;
        if (group !== null) {
            for (var i = 0; i < ioGroups.length; i++) {
                if (group === ioGroups[i]) {
                    index = i;
                    break;
                }
            }
        }
        if (index !== -1) {
            ioGroups.splice(index, 1);
        }
    }
    /**
     * Removes a flag.
     * @param flag the flag
     */
    this.removeIOFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.removeIOFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        ioFlags &= ~flag;
    }
    /**
     * Removes an active spell.
     * @param spellId the spell's id
     */
    this.removeSpellOn = function(spellId) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.removeSpellOn() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        var index = 0;
        for (; index < spellsOn.length; index++) {
            if (spellsOn[index] === spellId) {
                break;
            }
        }
        if (index < spellsOn.length) {
            spellsOn.splice(index, 1);
        } else {
            // spell id was never found
            // nothing to remove
        }
    }
    /**
     * Removes a type flag.
     * @param flag the flag
     */
    this.removeTypeFlag = function(flag) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.removeTypeFlag() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        typeFlags &= ~flag;
    }
    /**
     * Sets the {@link BaseInteractiveObject}'s armor material.
     * @param val the new value
     */
    this.setArmormaterial = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setArmormaterial() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        armormaterial = val;
    }
    /**
     * Sets the value of the damageSum.
     * @param val the new value to set
     */
    this.setDamageSum = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setDamageSum() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        damageSum = val;
    }
    /**
     * Sets the IO's inventory.
     * @param data the inventory to set
     */
    this.setInventory = function(data) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setInventory() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        inventory = val;
        inventory.setIo(this);
    }
    /**
     * Sets {@link ITEM} data for the {@link BaseInteractiveObject}.
     * @param data the new {@link ITEM}
     */
    this.setItemData = function(data) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setItemData() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        itemData = data;
        if (itemData !== null) {
            if (itemData.getIo() === null) {
                itemData.setIo(this);
            } else if (itemData.getIo().refId !== refId) {
                itemData.setIo(this);
            }
        }
    }
    /**
     * Sets the value of the level.
     * @param level the new value to set
     */
    this.setLevel = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setLevel() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        level = val;
    }
    /**
     * Sets the mainevent
     * @param val the mainevent to set
     */
    this.setMainevent = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setMainevent() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        mainevent = val;
    }
    /**
     * Sets NPC data for the {@link BaseInteractiveObject}.
     * @param data the new item data
     */
    this.setNPCData = function(data) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setNPCData() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        npcData = data;
        if (npcData !== null) {
            if (npcData.getIo() === null) {
                npcData.setIo(this);
            } else if (npcData.getIo().refId !== refId) {
                npcData.setIo(this);
            }
        }
    }
    /**
     * Sets the overscript.
     * @param val the overscript to set
     */
    this.setOverscript = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setOverscript() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        overscript = val;
    }
    /**
     * Sets item data for the {@link BaseInteractiveObject}.
     * @param data the new pc data
     */
    this.setPCData = function(data) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setPCData() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        pcData = data;
        if (pcData !== null) {
            if (pcData.getIo() === null) {
                pcData.setIo(this);
            } else if (pcData.getIo().refId !== refId) {
                pcData.setIo(this);
            }
        }
    }
    /**
     * Sets the value of the poisonCharges.
     * @param poisonCharges the new value to set
     */
    this.setPoisonCharges = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setPoisonCharges() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        poisonCharges = poisonCharges;
    }
    /**
     * Sets the value of the poisonLevel.
     * @param val the new value to set
     */
    this.setPoisonLevel = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setPoisonLevel() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        poisonLevel = val;
    }
    /**
     * Sets the position.
     * @param val the position to set
     */
    this.setPosition = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setPosition() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        position = val;
    }
    /**
     * Sets the script.
     * @param script the script to set
     */
    this.setScript = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setScript() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        script = val;
        val.setIO(this);
    }
    /**
     * Sets the flag indicating if the item is loaded by script.
     * @param val the flag to set
     */
    this.setScriptLoaded = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setScriptLoaded() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        scriptLoaded = val;
    }
    /**
     * Sets the show status.
     * @param val the show status to set
     */
    this.setShow = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setShow() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        show = val;
    }
    this.setSparkNBlood = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setSparkNBlood() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        sparkNBlood = val;
    }
    /**
     * Sets the statCount
     * @param val the statCount to set
     */
    this.setStatCount = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setStatCount() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        statCount = val;
    }
    /**
     * Sets the statSent
     * @param val the statSent to set
     */
    this.setStatSent = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setStatSent() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        statSent = val;
    }
    /**
     * Sets the value of the summoner.
     * @param val the new value to set
     */
    this.setSummoner = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setSummoner() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        summoner = val;
    }
    /**
     * Sets the targetinfo.
     * @param val the targetinfo to set
     */
    this.setTargetinfo = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setTargetinfo() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        targetinfo = val;
    }
    /**
     * Sets the {@link BaseInteractiveObject}'s weapon material.
     * @param val the new value
     */
    this.setWeaponmaterial = function(val) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! InteractiveObject.setWeaponmaterial() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        weaponmaterial = val;
    }
}
module.exports = BaseInteractiveObject;
