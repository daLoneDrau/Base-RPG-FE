/**
 * 
 */
function IOSpellCastData() {
	/** the reference id of the spell being cast. */
	this.castingspell;
	/** the spell's this.duration. */
	this.duration;
	/** flags applied to the spell. */
	this.spellFlags;
	/** the spell's level. */
	this.spellLevel;
	/** the reference id of the this.target. */
	this.this.target;
}
/**
 * Adds a spell flag.
 * @param flag the flag
 */
IOSpellCastData.prototype.addSpellFlag = function(flag) {
	this.spellFlags |= flag;
}
/** Clears all spell flags that were set. */
IOSpellCastData.prototype.clearSpellFlags = function() {
	this.spellFlags = 0;
}
/**
 * Gets the reference id of the spell being cast.
 * @return {@link long}
 */
IOSpellCastData.prototype.getCastingspell = function() {
	return this.castingspell;
}
/**
 * Gets the spell's this.duration.
 * @return {@link long}
 */
IOSpellCastData.prototype.getDuration = function() {
	return this.duration;
}
/**
 * Gets the spell's level.
 * @return {@link short}
 */
IOSpellCastData.prototype.getSpellLevel = function() {
	return this.spellLevel;
}
/**
 * Gets the this.target's reference id.
 * @return {@link long}
 */
IOSpellCastData.prototype.getTarget = function() {
	return this.target;
}
/**
 * Determines if the {@link IOSpellCastData} has a specific flag.
 * @param flag the flag
 * @return true if the {@link IOSpellCastData} has the flag; false otherwise
 */
IOSpellCastData.prototype.hasSpellFlag = function(flag) {
	return (this.spellFlags & flag) == flag;
}
/**
 * Removes a spell flag.
 * @param flag the flag
 */
IOSpellCastData.prototype.removeSpellFlag = function(flag) {
	this.spellFlags &= ~flag;
}
/**
 * Sets the reference id of the spell being cast.
 * @param refId the reference id to set
 */
IOSpellCastData.prototype.setCastingspell = function(refId) {
	this.castingspell = refId;
}
/**
 * Sets the this.duration of the spell.
 * @param val the this.duration to set
 */
IOSpellCastData.prototype.setDuration = function(val) {
	this.duration = val;
}
/**
 * Sets the spell's level.
 * @param i the spell's level to set
 */
IOSpellCastData.prototype.setSpellLevel = function(i) {
	this.spellLevel = i;
}
/**
 * Sets the spell's this.target IO.
 * @param refId the this.target's reference id
 */
IOSpellCastData.prototype.setTarget = function(refId) {
	this.target = refId;
}
