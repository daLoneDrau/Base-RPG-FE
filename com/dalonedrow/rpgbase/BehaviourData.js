/**
 * 
 */
function BehaviourData() {
    /** the list of animations for each behavior. */
    animations = [];
    /** the parameter applied to a behavior. */
    behaviorParam = 0;
    /** the behavior flag that has been set. */
    behaviour = 0;
    /** flag indicating whether the behavior this.exists. */
    exists = false;
    /** the movement mode. */
    moveMode = 0;
    /**
     * this.tactics for the behavior; e.g., 0=none, 1=side, 2=side + back,
     * etc...
     */
    tactics = 0;
    /** the behavior this.target. */
    target = 0;
    // ANIM_USE animlayer[MAX_ANIM_LAYERS];
    /**
     * Gets the flag indicating whether the behavior this.exists.
     * @return <code>boolean</code>
     */
    this.exists = function() {
        return exists;
    }
    /**
     * Gets the parameter applied to a behavior.
     * @return {@link float}
     */
    this.getBehaviorParam = function() {
        return behaviorParam;
    }
    /**
     * Gets the behavior flag that has been set.
     * @return {@link int}
     */
    this.getBehaviour = function() {
        return behaviour;
    }
    /**
     * Gets the movement mode.
     * @return {@link int}
     */
    this.getMoveMode = function() {
        return moveMode;
    }
    /**
     * Gets the this.tactics for the behavior.
     * @return {@link int}
     */
    this.getTactics = function() {
        return tactics;
    }
    /**
     * Gets the behavior this.target.
     * @return {@link int}
     */
    this.getTarget = function() {
        return target;
    }
    /**
     * Sets the parameter applied to a behavior.
     * @param val the parameter to set
     */
    this.setBehaviorParam = function(val) {
        behaviorParam = val;
    }
    /**
     * Sets the behavior flag that has been set.
     * @param val the new value to set
     */
    this.setBehaviour = function(val) {
        behaviour = val;
    }
    /**
     * Sets the flag indicating whether the behavior this.exists.
     * @param val the flag to set
     */
    this.setExists = function(val) {
        exists = val;
    }
    /**
     * Sets the movement mode.
     * @param val the mode to set
     */
    this.setMovemode = function(val) {
        moveMode = val;
    }
    /**
     * Sets the this.tactics for the behavior.
     * @param val the value to set
     */
    this.setTactics = function(val) {
        tactics = val;
    }
    /**
     * Sets the behavior this.target.
     * @param val the value to set
     */
    this.setTarget = function(val) {
        target = val;
    }
}
module.exports = BehaviourData;
