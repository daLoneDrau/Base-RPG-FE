/**
 * 
 */
function EquipmentItemModifier() {
    /** the flag indicating whether the modifier is a percentage modifier. */
    this.percent = false;
    /** not used. yet. */
    this.special = 0;
    /** the value of modifier to be applied. */
    this.value = 0;
}
/** Clears all data. */
EquipmentItemModifier.prototype.clearData = function() {
    this.percent = false;
    this.special = 0;
    this.value = 0;
}
/**
 * Gets the special.
 * 
 * @return int
 */
EquipmentItemModifier.prototype.getSpecial = function() {
    return this.special;
}
/**
 * Gets the value of modifier to be applied.
 * 
 * @return float
 */
EquipmentItemModifier.prototype.getValue = function() {
    return this.value;
}
/**
 * Determines if the {@link EquipmentItemModifier} is a percentage modifier.
 * 
 * @return <tt>true</tt> if the {@link EquipmentItemModifier} is a percentage
 *         modifier; <tt>false</tt> otherwise
 */
EquipmentItemModifier.prototype.isPercentage = function() {
    return this.percent;
}
/**
 * Sets the modifier values.
 * 
 * @param other
 *            the values being cloned
 */
EquipmentItemModifier.prototype.set = function(other) {
    this.percent = other.percent;
    this.special = other.special;
    this.value = other.value;
}
/**
 * Sets the flag indicating whether the modifier is a percentage modifier.
 * 
 * @param flag
 *            the flag
 */
EquipmentItemModifier.prototype.setPercentage = function(flag) {
    this.percent = flag;
}
/**
 * Sets the special.
 * 
 * @param val
 *            the special to set
 */
EquipmentItemModifier.prototype.setSpecial = function(val) {
    this.special = val;
}
/**
 * Sets the value of modifier to be applied.
 * 
 * @param val
 *            the value to set
 */
EquipmentItemModifier.prototype.setValue = function(val) {
    this.value = val;
}
