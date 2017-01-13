/**
 * 
 */
function BaseInteractiveObject(id) {
	/** the names of animations associated with the interactive object. */
	this.animationNames = [];
	/** the animation ids associated with the interactive object. */
	this.animations = [];
	/** the {@link BaseInteractiveObject}'s armor material. */
	this.armormaterial = "";
	/** any flags that have been set. */
	this.behaviorFlags = 0;
	this.damageSum = 0;
	/** flags indicating the IO is taking damage of a specific type. */
	this.dmgFlags = 0;
	/** any game flags that have been set. */
	this.gameFlags = 0;
	/** the inventory data. */
	this.inventory = null;
	/** any flags that have been set. */
	this.ioFlags = 0;
	/** the list of groups to which the IO belongs. */
	this.ioGroups = [];
	this.itemData = null;
	this.level = 0;
	this.mainevent = "";
	this.npcData = null;
	/** overriding script associated with the object. */
	this.overscript = null;
	this.pcData = null;
	this.poisonCharges = 0;
	this.poisonLevel = 0;
	/** the object's position. */
	this.position = null;
	/** the object's reference id. */
	this.refId = id;
	/** primary script associated with the object. */
	this.script = null;
	/** is the item loaded by script. */
	this.scriptLoaded = false;
	/** the show status (in scene, in inventory). */
	this.show = 0;
	this.sparkNBlood = 0;
	this.spellcastData = new IOSpellCastData();
	/** the list of spells currently active on the object. */
	this.spellsOn = [];
	this.statCount = 0;
	this.statSent = 0;
	this.summoner = 0;
	this.targetinfo = 0;
	/**
	 * any type flags that have been set (is the object a goblin, weapon,
	 * etc...).
	 */
	this.typeFlags = 0;
	/** the {@link BaseInteractiveObject}'s weapon material. */
	this.weaponmaterial = null;
}
/**
 * Adds an animation by a given name to the interactive object.
 * @param name the animation's name
 * @param id the animation's reference id
 * @throws PooledException if there is an error with the stringbuilder
 * @throws RPGException if the name is null
 */
BaseInteractiveObject.prototype.addAnimation = function(name, id) {
	if (name === null) {
		var s = [];
		s.push("ERROR! InteractiveObject.addAnimation() - ");
		s.push("null value sent in parameters");
		throw new Error(s.join(""));
	}
	var index = -1;
	for (var i = 0; i < this.animationNames.length; i++) {
		if (this.animationNames[i] === null
				|| (this.animationNames[i] !== null
						&& this.animationNames[i] === name)) {
			index = i;
			break;
		}
	}
	if (index === -1) {
		this.animationNames.push(name);
		this.animations.push(id);
	}
}
/**
 * Adds a behavior flag.
 * @param flag the flag
 */
BaseInteractiveObject.prototype.addBehaviorFlag = function(flag) {
	this.behaviorFlags |= flag;
}
/**
 * Adds a game flag.
 * @param flag the flag
 */
BaseInteractiveObject.prototype.addGameFlag = function(flag) {
	this.gameFlags |= flag;
}
/**
 * Adds the IO to a group.
 * @param group the group
 */
BaseInteractiveObject.prototype.addGroup = function(group) {
	var found = false;
	for (var i = 0; i < this.ioGroups.length; i++) {
		if (group === this.ioGroups[i]) {
			found = true;
			break;
		}
	}
	if (!found) {
		this.ioGroups.push(group);
	}
}
/**
 * Adds a flag.
 * @param flag the flag
 */
BaseInteractiveObject.prototype.addIOFlag = function(flag) {
	this.ioFlags |= flag;
}
/**
 * Adds an active spell on the object.
 * @param spellId the spell's id
 */
BaseInteractiveObject.prototype.addSpellOn = function(spellId) {
	if (this.spellsOn === null) {
		this.spellsOn = [];
	}
	this.spellsOn.push(spellId);
}
/**
 * Adds a type flag.
 * @param flag the flag
 * @throws Error if an invalid type is set
 */
BaseInteractiveObject.prototype.addTypeFlag = function(flag) {
	switch (flag) {
	case ObjectType.OBJECT_TYPE_DAGGER:
	case ObjectType.OBJECT_TYPE_1H:
	case ObjectType.OBJECT_TYPE_2H:
	case ObjectType.OBJECT_TYPE_BOW:
		clearTypeFlags();
		this.typeFlags |= EquipmentGlobals.OBJECT_TYPE_WEAPON;
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
		throw new Error("Cannot set weapon type, must specify weapon class");
	default:
		throw new Error("Invalid object type " + flag);
	}
	this.typeFlags |= flag;
}
/** Clears all behavior flags that were set. */
BaseInteractiveObject.prototype.clearBehaviorFlags = function() {
	this.behaviorFlags = 0;
}
/** Clears all game flags that were set. */
BaseInteractiveObject.prototype.clearGameFlags = function() {
	this.gameFlags = 0;
}
/** Clears all flags that were set. */
BaseInteractiveObject.prototype.clearIOFlags = function() {
	this.ioFlags = 0;
}
/** Clears all type flags that were set. */
BaseInteractiveObject.prototype.clearTypeFlags = function() {
	this.typeFlags = 0;
}
/**
 * {@inheritDoc}
 */
BaseInteractiveObject.prototype.equals = function(obj) {
	var equals = false;
	if (this === obj) {
		equals = true;
	} else if (obj !== null && obj instanceof BaseInteractiveObject) {
		if (this.dmgFlags === obj.dmgFlags
		        && this.gameFlags === other.gameFlags
		        && this.ioFlags === other.ioFlags
		        && this.numberOfSpellsOn === other.numberOfSpellsOn
		        && this.refId === other.refId) {
			equals = true;
		}
	}
	return equals;
}

/**
 * Gets the reference id of the animation associated with a specific name.
 * @param name the name of the animation
 * @return var
 * @throws Error if the name is null, or no animation by the given name
 *             was ever set on the interactive object
 */
BaseInteractiveObject.prototype.getAnimation = function(name) {
	if (name === null) {
		var s = [];
		s.push("ERROR! InteractiveObject.getAnimation() - ");
		s.push("null value sent in parameters");
		throw new Error(s.join(""));
	}
	var index = -1;
	for (var i = 0; i < this.animationNames.length; i++) {
		if (this.animationNames[i] !== null
		        && this.animationNames[i].equals(name)) {
			index = i;
			break;
		}
	}
	if (index === -1) {
		s = [];
		s.push("ERROR! InteractiveObject.getAnimation() - ");
		s.push("no animation set for ");
		s.push(name);
		throw new Error(s.join(""));
	}
	return this.animations[index];
}

/**
 * Gets the {@link BaseInteractiveObject}'s armor material.
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getArmormaterial = function() {
	return this.armormaterial;
}
BaseInteractiveObject.prototype.getDamageSum = function() {
	return this.damageSum;
}
/**
 * Gets the IO's inventory.
 * @return {@link INVENTORY}
 */
BaseInteractiveObject.prototype.getInventory = function() {
	return this.inventory;
}

/**
 * Gets a group to which the IO belongs.
 * @param index the index
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getIOGroup = function(index) {
	return this.ioGroups[index];
}
/**
 * Gets item data for the {@link BaseInteractiveObject}.
 * @return {@link ITEM}
 */
BaseInteractiveObject.prototype.getItemData = function() {
	return this.itemData;
}
/**
 * Gets the value for the level.
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getLevel = function() {
	return this.level;
}
/**
 * Gets the mainevent
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getMainevent = function() {
	return this.mainevent;
}
/**
 * Gets NPC data for the {@link BaseInteractiveObject}.
 * @return {@link NPC}
 */
BaseInteractiveObject.prototype.getNPCData = function() {
	return this.npcData;
}
/**
 * Gets the number of spells on the {@link BaseInteractiveObject}.
 * @return <code>var</code>
 */
BaseInteractiveObject.prototype.getNumberOfSpellsOn = function() {
	return this.numberOfSpellsOn;
}
/**
 * Gets the number of IO groups to which the IO belongs.
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getNumIOGroups = function() {
	return this.ioGroups.length;
}
/**
 * Gets the overscript.
 * @return {@link SCRIPT}
 */
BaseInteractiveObject.prototype.getOverscript = function() {
	return this.overscript;
}
/**
 * Gets item data for the {@link BaseInteractiveObject}.
 * @return {@link PC}
 */
BaseInteractiveObject.prototype.getPCData = function() {
	return this.pcData;
}
BaseInteractiveObject.prototype.getPoisonCharges = function() {
	return this.poisonCharges;
}
/**
 * Gets the value for the poisonLevel.
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getPoisonLevel = function() {
	return this.poisonLevel;
}
/**
 * Gets the position
 * @return {@link SimpleVector2}
 */
BaseInteractiveObject.prototype.getPosition = function() {
	return this.position;
}
/**
 * Gets the {@link BaseInteractiveObject}'s reference id.
 * @return var
 */
BaseInteractiveObject.prototype.getRefId = function() {
	return this.refId;
}
/**
 * Gets the script
 * @return {@link SCRIPT}
 */
BaseInteractiveObject.prototype.getScript = function() {
	return this.script;
}
/**
 * Gets the show status.
 * @return <code>var</code>
 */
BaseInteractiveObject.prototype.getShow = function() {
	return this.show;
}
BaseInteractiveObject.prototype.getSparkNBlood = function() {
	return this.sparkNBlood;
}
/**
 * Gets the spellcast_data
 * @return {@link IOSpellCastData}
 */
BaseInteractiveObject.prototype.getSpellcastData = function() {
	return this.spellcastData;
}
BaseInteractiveObject.prototype.getSpellOn = function(index) {
	return this.spellsOn[index];
}
/**
 * Gets the statCount
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getStatCount = function() {
	return this.statCount;
}
/**
 * Gets the statSent
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getStatSent = function() {
	return this.statSent;
}
BaseInteractiveObject.prototype.getSummoner = function() {
	return this.summoner;
}
/**
 * Gets the targetinfo
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getTargetinfo = function() {
	return this.targetinfo;
}
/**
 * Gets the {@link BaseInteractiveObject}'s weapon material.
 * @return {@link var}
 */
BaseInteractiveObject.prototype.getWeaponmaterial = function() {
	return this.weaponmaterial;
}
/**
 * Determines if the {@link BaseInteractiveObject} has a specific behavior
 * flag.
 * @param flag the flag
 * @return true if the {@link BaseInteractiveObject} has the flag; false
 *         otherwise
 */
BaseInteractiveObject.prototype.hasBehaviorFlag = function(flag) {
	return (this.behaviorFlags & flag) === flag;
}
/**
 * Determines if the {@link BaseInteractiveObject} has a specific game flag.
 * @param flag the flag
 * @return true if the {@link BaseInteractiveObject} has the flag; false
 *         otherwise
 */
BaseInteractiveObject.prototype.hasGameFlag = function(flag) {
	return (this.gameFlags & flag) === flag;
}
/**
 * Determines if the {@link BaseInteractiveObject} has a specific flag.
 * @param flag the flag
 * @return true if the {@link BaseInteractiveObject} has the flag; false
 *         otherwise
 */
BaseInteractiveObject.prototype.hasIOFlag = function(flag) {
	return (this.ioFlags & flag) === flag;
}
/**
 * Determines if the {@link BaseInteractiveObject} has a specific type flag.
 * @param flag the flag
 * @return true if the {@link BaseInteractiveObject} has the flag; false
 *         otherwise
 */
BaseInteractiveObject.prototype.hasTypeFlag = function(flag) {
	return (this.typeFlags & flag) === flag;
}
BaseInteractiveObject.prototype.isInGroup = function(group) {
	var found = false;
	for (var i = 0; i < this.ioGroups.length; i++) {
		if (group === this.ioGroups[i]) {
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
BaseInteractiveObject.prototype.isScriptLoaded = function() {
	return this.scriptLoaded;
}
/** Removes all active spells. */
BaseInteractiveObject.prototype.removeAllSpells = function() {
    this.spellsOn = [];
}
/**
 * Removes a behavior flag.
 * @param flag the flag
 */
BaseInteractiveObject.prototype.removeBehaviorFlag = function(flag) {
    this.behaviorFlags &= ~flag;
}
/**
 * Removes a game flag.
 * @param flag the flag
 */
BaseInteractiveObject.prototype.removeGameFlag = function(flag) {
    this.gameFlags &= ~flag;
}
/**
 * Removes the IO from a group.
 * @param group the group
 */
BaseInteractiveObject.prototype.removeGroup = function(group) {
	var index = -1;
	if (group !== null) {
		for (var i = 0; i < this.ioGroups.length; i++) {
			if (group === this.ioGroups[i]) {
				index = i;
				break;
			}
		}
	}
	if (index !== -1) {
	    this.ioGroups.splice(index, 1);
	}
}
/**
 * Removes a flag.
 * @param flag the flag
 */
BaseInteractiveObject.prototype.removeIOFlag = function(flag) {
	this.ioFlags &= ~flag;
}
/**
 * Removes an active spell.
 * @param spellId the spell's id
 */
BaseInteractiveObject.prototype.removeSpellOn = function(spellId) {
	var index = 0;
	for (; index < this.spellsOn.length; index++) {
		if (this.spellsOn[index] === spellId) {
			break;
		}
	}
	if (index < this.spellsOn.length) {
	    this.spellsOn.splice(index, 1);
	} else {
		// spell id was never found
		// nothing to remove
	}
}
/**
 * Removes a type flag.
 * @param flag the flag
 */
BaseInteractiveObject.prototype.removeTypeFlag = function(flag) {
	this.typeFlags &= ~flag;
}
/**
 * Sets the {@link BaseInteractiveObject}'s armor material.
 * @param val the new value
 */
BaseInteractiveObject.prototype.setArmormaterial = function(val) {
	this.armormaterial = val;
}
/**
 * Sets the value of the damageSum.
 * @param val the new value to set
 */
BaseInteractiveObject.prototype.setDamageSum = function(val) {
	this.damageSum = val;
}
/**
 * Sets the IO's inventory.
 * @param data the inventory to set
 */
BaseInteractiveObject.prototype.setInventory = function(data) {
	this.inventory = val;
	this.inventory.setIo(this);
}
/**
 * Sets {@link ITEM} data for the {@link BaseInteractiveObject}.
 * @param data the new {@link ITEM}
 */
BaseInteractiveObject.prototype.setItemData = function(data) {
	this.itemData = data;
	if (this.itemData !== null) {
		if (this.itemData.getIo() === null) {
			this.itemData.setIo(this);
		} else if (this.itemData.getIo().refId !== this.refId) {
			this.itemData.setIo(this);
		}
	}
}
/**
 * Sets the value of the level.
 * @param level the new value to set
 */
BaseInteractiveObject.prototype.setLevel = function(val) {
	this.level = val;
}
/**
 * Sets the mainevent
 * @param val the mainevent to set
 */
BaseInteractiveObject.prototype.setMainevent = function(val) {
	this.mainevent = val;
}
/**
 * Sets NPC data for the {@link BaseInteractiveObject}.
 * @param data the new item data
 */
BaseInteractiveObject.prototype.setNPCData = function(data) {
	this.npcData = data;
	if (this.npcData !== null) {
		if (this.npcData.getIo() === null) {
			this.npcData.setIo(this);
		} else if (this.npcData.getIo().refId !== this.refId) {
			this.npcData.setIo(this);
		}
	}
}
/**
 * Sets the overscript.
 * @param val the overscript to set
 */
BaseInteractiveObject.prototype.setOverscript = function(val) {
	this.overscript = val;
}
/**
 * Sets item data for the {@link BaseInteractiveObject}.
 * @param data the new pc data
 */
BaseInteractiveObject.prototype.setPCData = function(data) {
	this.pcData = data;
	if (this.pcData !== null) {
		if (this.pcData.getIo() === null) {
			this.pcData.setIo(this);
		} else if (this.pcData.getIo().refId !== this.refId) {
			this.pcData.setIo(this);
		}
	}
}
/**
 * Sets the value of the poisonCharges.
 * @param poisonCharges the new value to set
 */
BaseInteractiveObject.prototype.setPoisonCharges = function(val) {
	this.poisonCharges = poisonCharges;
}
/**
 * Sets the value of the poisonLevel.
 * @param val the new value to set
 */
BaseInteractiveObject.prototype.setScript = function(val) {
	this.poisonLevel = val;
}
/**
 * Sets the position.
 * @param val the position to set
 */
BaseInteractiveObject.prototype.setScript = function(val) {
	this.position = val;
}
/**
 * Sets the script
 * @param script the script to set
 */
BaseInteractiveObject.prototype.setScript = function(val) {
	this.script = val;
	val.setIO(this);
}
/**
 * Sets the flag indicating if the item is loaded by script.
 * @param val the flag to set
 */
BaseInteractiveObject.prototype.setScriptLoaded = function(val) {
	this.scriptLoaded = val;
}
/**
 * Sets the show status.
 * @param val the show status to set
 */
BaseInteractiveObject.prototype.setShow = function(val) {
	this.show = val;
}
BaseInteractiveObject.prototype.setSparkNBlood = function(val) {
	this.sparkNBlood = val;
}
/**
 * Sets the statCount
 * @param val the statCount to set
 */
BaseInteractiveObject.prototype.setStatCount = function(val) {
	this.statCount = val;
}
/**
 * Sets the statSent
 * @param val the statSent to set
 */
BaseInteractiveObject.prototype.setStatSent = function(val) {
	this.statSent = val;
}
/**
 * Sets the value of the summoner.
 * @param val the new value to set
 */
BaseInteractiveObject.prototype.setSummoner = function(val) {
	this.summoner = val;
}
/**
 * Sets the targetinfo
 * @param val the targetinfo to set
 */
BaseInteractiveObject.prototype.setTargetinfo = function(val) {
	this.targetinfo = val;
}
/**
 * Sets the {@link BaseInteractiveObject}'s weapon material.
 * @param val the new value
 */
BaseInteractiveObject.prototype.setWeaponmaterial = function(val) {
	this.weaponmaterial = val;
}
