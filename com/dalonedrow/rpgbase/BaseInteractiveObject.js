/**
 * 
 */
var Hashcode = require("./Hashcode.js");
var IOSpellCastData = require("./IOSpellCastData.js");
function BaseInteractiveObject(id) {
    Hashcode.call(this);
    if (arguments.length === 1) {
        abbreviation = arguments[0].code;
        displayName = arguments[0].name;
        description = arguments[0].description;
    }
    /** the names of animations associated with the interactive object. */
    var animationNames = [];
    /** the animation ids associated with the interactive object. */
    var animations = [];
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
    if (arguments.length === 1
            && !isNaN(arguments[0])
            && parseInt(Number(arguments[0])) === arguments[0]
            && !isNaN(parseInt(arguments[0], 10))) {
        refId = parseInt(arguments[0], 10);
    } else {
        throw new Error("Cannot create without reference id");
    }
    /**
     * Adds an animation by a given name to the interactive object.
     * 
     * @param name
     *            the animation's name
     * @param id
     *            the animation's reference id
     * @throws PooledException
     *             if there is an error with the stringbuilder
     * @throws RPGException
     *             if the name is null
     */
    this.addAnimation = function(name, id) {
        if (name === null) {
            var s = [];
            s.push("ERROR! InteractiveObject.addAnimation() - ");
            s.push("null value sent in parameters");
            throw new Error(s.join(""));
        }
        var index = -1;
        for (var i = 0; i < animationNames.length; i++) {
            if (animationNames[i] === null
                    || (animationNames[i] !== null && animationNames[i] === name)) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            animationNames.push(name);
            animations.push(id);
        }
    }
    /**
     * Adds a behavior flag.
     * 
     * @param flag
     *            the flag
     */
    this.addBehaviorFlag = function(flag) {
        behaviorFlags |= flag;
    }
    /**
     * Adds a game flag.
     * 
     * @param flag
     *            the flag
     */
    this.addGameFlag = function(flag) {
        gameFlags |= flag;
    }
    /**
     * Adds the IO to a group.
     * 
     * @param group
     *            the group
     */
    this.addGroup = function(group) {
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
     * 
     * @param flag
     *            the flag
     */
    this.addIOFlag = function(flag) {
        ioFlags |= flag;
    }
    /**
     * Adds an active spell on the object.
     * 
     * @param spellId
     *            the spell's id
     */
    this.addSpellOn = function(spellId) {
        if (spellsOn === null) {
            spellsOn = [];
        }
        spellsOn.push(spellId);
    }
    /**
     * Adds a type flag.
     * 
     * @param flag
     *            the flag
     * @throws Error
     *             if an invalid type is set
     */
    this.addTypeFlag = function(flag) {
        switch (flag) {
            case ObjectType.OBJECT_TYPE_DAGGER:
            case ObjectType.OBJECT_TYPE_1H:
            case ObjectType.OBJECT_TYPE_2H:
            case ObjectType.OBJECT_TYPE_BOW:
                clearTypeFlags();
                typeFlags |= EquipmentGlobals.OBJECT_TYPE_WEAPON;
                addIOFlag(IoGlobals.IO_02_ITEM);
                break;
            case ObjectType.OBJECT_TYPE_SHIELD:
            case ObjectType.OBJECT_TYPE_ARMOR:
            case ObjectType.OBJECT_TYPE_HELMET:
            case ObjectType.OBJECT_TYPE_LEGGINGS:
            case ObjectType.OBJECT_TYPE_RING:
                addIOFlag(IoGlobals.IO_02_ITEM);
            case ObjectType.OBJECT_TYPE_FOOD:
            case ObjectType.OBJECT_TYPE_GOLD:
                clearTypeFlags();
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
        var equals = false;
        if (obj !== null
                && obj instanceof BaseInteractiveObject) {
            if (dmgFlags === obj.dmgFlags
                    && gameFlags === other.gameFlags
                    && ioFlags === other.ioFlags
                    && numberOfSpellsOn === other.numberOfSpellsOn
                    && refId === other.refId) {
                equals = true;
            }
        }
        return equals;
    }
    /**
     * Gets the reference id of the animation associated with a specific name.
     * 
     * @param name
     *            the name of the animation
     * @return var
     * @throws Error
     *             if the name is null, or no animation by the given name was
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
        var index = -1;
        for (var i = 0; i < animationNames.length; i++) {
            if (animationNames[i] !== null && animationNames[i].equals(name)) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.getAnimation() - ");
            s.push("no animation set for ");
            s.push(name);
            throw new Error(s.join(""));
        }
        return animations[index];
    }

    /**
     * Gets the {@link BaseInteractiveObject}'s armor material.
     * 
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
     * 
     * @return {@link INVENTORY}
     */
    this.getInventory = function() {
        return inventory;
    }
    /**
     * Gets a group to which the IO belongs.
     * 
     * @param index
     *            the index
     * @return {@link var}
     */
    this.getIOGroup = function(index) {
        return ioGroups[index];
    }
    /**
     * Gets item data for the {@link BaseInteractiveObject}.
     * 
     * @return {@link ITEM}
     */
    this.getItemData = function() {
        return itemData;
    }
    /**
     * Gets the value for the level.
     * 
     * @return {@link var}
     */
    this.getLevel = function() {
        return level;
    }
    /**
     * Gets the mainevent
     * 
     * @return {@link var}
     */
    this.getMainevent = function() {
        return mainevent;
    }
    /**
     * Gets NPC data for the {@link BaseInteractiveObject}.
     * 
     * @return {@link NPC}
     */
    this.getNPCData = function() {
        return npcData;
    }
    /**
     * Gets the number of spells on the {@link BaseInteractiveObject}.
     * 
     * @return <code>var</code>
     */
    this.getNumberOfSpellsOn = function() {
        return numberOfSpellsOn;
    }
    /**
     * Gets the number of IO groups to which the IO belongs.
     * 
     * @return {@link var}
     */
    this.getNumIOGroups = function() {
        return ioGroups.length;
    }
    /**
     * Gets the overscript.
     * 
     * @return {@link SCRIPT}
     */
    this.getOverscript = function() {
        return overscript;
    }
    /**
     * Gets item data for the {@link BaseInteractiveObject}.
     * 
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
     * 
     * @return {@link var}
     */
    this.getPoisonLevel = function() {
        return poisonLevel;
    }
    /**
     * Gets the position
     * 
     * @return {@link SimpleVector2}
     */
    this.getPosition = function() {
        return position;
    }
    /**
     * Gets the {@link BaseInteractiveObject}'s reference id.
     * 
     * @return var
     */
    this.getRefId = function() {
        return refId;
    }
    /**
     * Gets the script
     * 
     * @return {@link SCRIPT}
     */
    this.getScript = function() {
        return script;
    }
    /**
     * Gets the show status.
     * 
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
     * 
     * @return {@link IOSpellCastData}
     */
    this.getSpellcastData = function() {
        return spellcastData;
    }
    this.getSpellOn = function(index) {
        return spellsOn[index];
    }
    /**
     * Gets the statCount
     * 
     * @return {@link var}
     */
    this.getStatCount = function() {
        return statCount;
    }
    /**
     * Gets the statSent
     * 
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
     * 
     * @return {@link var}
     */
    this.getTargetinfo = function() {
        return targetinfo;
    }
    /**
     * Gets the {@link BaseInteractiveObject}'s weapon material.
     * 
     * @return {@link var}
     */
    this.getWeaponmaterial = function() {
        return weaponmaterial;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific behavior
     * flag.
     * 
     * @param flag
     *            the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    this.hasBehaviorFlag = function(flag) {
        return (behaviorFlags & flag) === flag;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific game flag.
     * 
     * @param flag
     *            the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    this.hasGameFlag = function(flag) {
        return (gameFlags & flag) === flag;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific flag.
     * 
     * @param flag
     *            the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    this.hasIOFlag = function(flag) {
        return (ioFlags & flag) === flag;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific type flag.
     * 
     * @param flag
     *            the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    this.hasTypeFlag = function(flag) {
        return (typeFlags & flag) === flag;
    }
    this.isInGroup = function(group) {
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
     * 
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
     * 
     * @param flag
     *            the flag
     */
    this.removeBehaviorFlag = function(flag) {
        behaviorFlags &= ~flag;
    }
    /**
     * Removes a game flag.
     * 
     * @param flag
     *            the flag
     */
    this.removeGameFlag = function(flag) {
        gameFlags &= ~flag;
    }
    /**
     * Removes the IO from a group.
     * 
     * @param group
     *            the group
     */
    this.removeGroup = function(group) {
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
     * 
     * @param flag
     *            the flag
     */
    this.removeIOFlag = function(flag) {
        ioFlags &= ~flag;
    }
    /**
     * Removes an active spell.
     * 
     * @param spellId
     *            the spell's id
     */
    this.removeSpellOn = function(spellId) {
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
     * 
     * @param flag
     *            the flag
     */
    this.removeTypeFlag = function(flag) {
        typeFlags &= ~flag;
    }
    /**
     * Sets the {@link BaseInteractiveObject}'s armor material.
     * 
     * @param val
     *            the new value
     */
    this.setArmormaterial = function(val) {
        armormaterial = val;
    }
    /**
     * Sets the value of the damageSum.
     * 
     * @param val
     *            the new value to set
     */
    this.setDamageSum = function(val) {
        damageSum = val;
    }
    /**
     * Sets the IO's inventory.
     * 
     * @param data
     *            the inventory to set
     */
    this.setInventory = function(data) {
        inventory = val;
        inventory.setIo(this);
    }
    /**
     * Sets {@link ITEM} data for the {@link BaseInteractiveObject}.
     * 
     * @param data
     *            the new {@link ITEM}
     */
    this.setItemData = function(data) {
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
     * 
     * @param level
     *            the new value to set
     */
    this.setLevel = function(val) {
        level = val;
    }
    /**
     * Sets the mainevent
     * 
     * @param val
     *            the mainevent to set
     */
    this.setMainevent = function(val) {
        mainevent = val;
    }
    /**
     * Sets NPC data for the {@link BaseInteractiveObject}.
     * 
     * @param data
     *            the new item data
     */
    this.setNPCData = function(data) {
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
     * 
     * @param val
     *            the overscript to set
     */
    this.setOverscript = function(val) {
        overscript = val;
    }
    /**
     * Sets item data for the {@link BaseInteractiveObject}.
     * 
     * @param data
     *            the new pc data
     */
    this.setPCData = function(data) {
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
     * 
     * @param poisonCharges
     *            the new value to set
     */
    this.setPoisonCharges = function(val) {
        poisonCharges = poisonCharges;
    }
    /**
     * Sets the value of the poisonLevel.
     * 
     * @param val
     *            the new value to set
     */
    this.setScript = function(val) {
        poisonLevel = val;
    }
    /**
     * Sets the position.
     * 
     * @param val
     *            the position to set
     */
    this.setScript = function(val) {
        position = val;
    }
    /**
     * Sets the script
     * 
     * @param script
     *            the script to set
     */
    this.setScript = function(val) {
        script = val;
        val.setIO(this);
    }
    /**
     * Sets the flag indicating if the item is loaded by script.
     * 
     * @param val
     *            the flag to set
     */
    this.setScriptLoaded = function(val) {
        scriptLoaded = val;
    }
    /**
     * Sets the show status.
     * 
     * @param val
     *            the show status to set
     */
    this.setShow = function(val) {
        show = val;
    }
    this.setSparkNBlood = function(val) {
        sparkNBlood = val;
    }
    /**
     * Sets the statCount
     * 
     * @param val
     *            the statCount to set
     */
    this.setStatCount = function(val) {
        statCount = val;
    }
    /**
     * Sets the statSent
     * 
     * @param val
     *            the statSent to set
     */
    this.setStatSent = function(val) {
        statSent = val;
    }
    /**
     * Sets the value of the summoner.
     * 
     * @param val
     *            the new value to set
     */
    this.setSummoner = function(val) {
        summoner = val;
    }
    /**
     * Sets the targetinfo
     * 
     * @param val
     *            the targetinfo to set
     */
    this.setTargetinfo = function(val) {
        targetinfo = val;
    }
    /**
     * Sets the {@link BaseInteractiveObject}'s weapon material.
     * 
     * @param val
     *            the new value
     */
    this.setWeaponmaterial = function(val) {
        weaponmaterial = val;
    }
}
module.exports = BaseInteractiveObject;
