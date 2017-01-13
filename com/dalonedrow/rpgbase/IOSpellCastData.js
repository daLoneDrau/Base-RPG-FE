/**
 * 
 */
var Hashcode = require("./Hashcode.js");
function IOSpellCastData() {
    Hashcode.call(this);
	/** the reference id of the spell being cast. */
	var castingspell = 0;
	/** the spell's duration. */
	var duration = 0;
	/** flags applied to the spell. */
	var spellFlags = 0;
	/** the spell's level. */
	var spellLevel = 0;
	/** the reference id of the target. */
	var target = 0;
	/**
	 * Adds a spell flag.
	 * @param flag the flag
	 */
	this.addSpellFlag = function(flag) {
	    spellFlags |= flag;
	}
	/** Clears all spell flags that were set. */
	this.clearSpellFlags = function() {
	    spellFlags = 0;
	}
	/**
	 * Gets the reference id of the spell being cast.
	 * @return {@link long}
	 */
	this.getCastingspell = function() {
	    return castingspell;
	}
	/**
	 * Gets the spell's duration.
	 * @return {@link long}
	 */
	this.getDuration = function() {
	    return duration;
	}
	/**
	 * Gets the spell's level.
	 * @return {@link short}
	 */
	this.getSpellLevel = function() {
	    return spellLevel;
	}
	/**
	 * Gets the target's reference id.
	 * @return {@link long}
	 */
	this.getTarget = function() {
	    return target;
	}
	/**
	 * Determines if the {@link IOSpellCastData} has a specific flag.
	 * @param flag the flag
	 * @return true if the {@link IOSpellCastData} has the flag; false otherwise
	 */
	this.hasSpellFlag = function(flag) {
	    return (spellFlags & flag) == flag;
	}
	/**
	 * Removes a spell flag.
	 * @param flag the flag
	 */
	this.removeSpellFlag = function(flag) {
	    spellFlags &= ~flag;
	}
	/**
	 * Sets the reference id of the spell being cast.
	 * @param refId the reference id to set
	 */
	this.setCastingspell = function(refId) {
	    castingspell = refId;
	}
	/**
	 * Sets the duration of the spell.
	 * @param val the duration to set
	 */
	this.setDuration = function(val) {
	    duration = val;
	}
	/**
	 * Sets the spell's level.
	 * @param i the spell's level to set
	 */
	this.setSpellLevel = function(i) {
	    spellLevel = i;
	}
	/**
	 * Sets the spell's target IO.
	 * @param refId the target's reference id
	 */
	this.setTarget = function(refId) {
	    target = refId;
	}
}
module.exports = IOSpellCastData;
