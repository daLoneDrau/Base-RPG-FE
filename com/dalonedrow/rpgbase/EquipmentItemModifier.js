/**
 * 
 */
function EquipmentItemModifier() {
    /** the flag indicating whether the modifier is a percentage modifier. */
    percent = false;
    /** not used. yet. */
    special = 0;
    /** the value of modifier to be applied. */
    value = 0;
    /** Clears all data. */
    this.clearData = function() {
        percent = false;
        special = 0;
        value = 0;
    }
    /**
     * Gets the special.
     * @return int
     */
    this.getSpecial = function() {
        return special;
    }
    /**
     * Gets the value of modifier to be applied.
     * @return float
     */
    this.getValue = function() {
        return value;
    }
    /**
     * Determines if the {@link EquipmentItemModifier} is a percentage modifier.
     * @return <tt>true</tt> if the {@link EquipmentItemModifier} is a
     *         percentage modifier; <tt>false</tt> otherwise
     */
    this.isPercentage = function() {
        return percent;
    }
    /**
     * Sets the modifier values.
     * @param other the values being cloned
     */
    this.set = function(other) {
        if (arguments.length !== 1) {
            var s = [];
            s.push("ERROR! EquipmentItemModifier.set() - ");
            s.push("requires 1 parameters");
            throw new Error(s.join(""));
        }
        if (!(other instanceof EquipmentItemModifier)) {
            var s = [];
            s.push("ERROR! EquipmentItemModifier.set() - ");
            s.push("requires parameter to be other EquipmentItemModifier");
            throw new Error(s.join(""));
        }
        percent = other.isPercentage();
        special = other.getSpecial();
        value = other.getValue();
    }
    /**
     * Sets the flag indicating whether the modifier is a percentage modifier.
     * @param flag the flag
     */
    this.setPercentage = function(flag) {
        percent = flag;
    }
    /**
     * Sets the special.
     * @param val the special to set
     */
    this.setSpecial = function(val) {
        special = val;
    }
    /**
     * Sets the value of modifier to be applied.
     * @param val the value to set
     */
    this.setValue = function(val) {
        value = val;
    }
}
module.exports = EquipmentItemModifier;
