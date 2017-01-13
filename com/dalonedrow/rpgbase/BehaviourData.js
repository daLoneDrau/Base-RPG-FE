/**
 * 
 */
function BehaviourData() {
    /** the list of animations for each behavior. */
    this.animations = [];
    /** the parameter applied to a behavior. */
    this.behaviorParam = 0;
    /** the behavior flag that has been set. */
    this.behaviour = 0;
    /** flag indicating whether the behavior this.exists. */
    this.exists = false;
    /** the movement mode. */
    this.moveMode = 0;
    /**
     * this.tactics for the behavior; e.g., 0=none, 1=side, 2=side + back,
     * etc...
     */
    this.tactics = 0;
    /** the behavior this.target. */
    this.target = 0;
    // ANIM_USE animlayer[MAX_ANIM_LAYERS];
}
/**
 * Gets the flag indicating whether the behavior this.exists.
 * 
 * @return <code>boolean</code>
 */
BehaviourData.prototype.exists = function() {
    return this.exists;
}
/**
 * Gets the parameter applied to a behavior.
 * 
 * @return {@link float}
 */
BehaviourData.prototype.getBehaviorParam = function() {
    return this.behaviorParam;
}
/**
 * Gets the behavior flag that has been set.
 * 
 * @return {@link int}
 */
BehaviourData.prototype.getBehaviour = function() {
    return this.behaviour;
}
/**
 * Gets the movement mode.
 * 
 * @return {@link int}
 */
BehaviourData.prototype.getMoveMode = function() {
    return this.moveMode;
}
/**
 * Gets the this.tactics for the behavior.
 * 
 * @return {@link int}
 */
BehaviourData.prototype.getTactics = function() {
    return this.tactics;
}
/**
 * Gets the behavior this.target.
 * 
 * @return {@link int}
 */
BehaviourData.prototype.getTarget = function() {
    return this.target;
}
/**
 * Sets the parameter applied to a behavior.
 * 
 * @param val
 *            the parameter to set
 */
BehaviourData.prototype.setBehaviorParam = function(val) {
    this.behaviorParam = val;
}
/**
 * Sets the behavior flag that has been set.
 * 
 * @param val
 *            the new value to set
 */
BehaviourData.prototype.setBehaviour = function(val) {
    this.behaviour = val;
}
/**
 * Sets the flag indicating whether the behavior this.exists.
 * 
 * @param val
 *            the flag to set
 */
BehaviourData.prototype.setExists = function(val) {
    this.exists = val;
}
/**
 * Sets the movement mode.
 * 
 * @param val
 *            the mode to set
 */
BehaviourData.prototype.setMovemode = function(val) {
    this.moveMode = val;
}
/**
 * Sets the this.tactics for the behavior.
 * 
 * @param val
 *            the value to set
 */
BehaviourData.prototype.setTactics = function(val) {
    this.tactics = val;
}
/**
 * Sets the behavior this.target.
 * 
 * @param val
 *            the value to set
 */
BehaviourData.prototype.setTarget = function(val) {
    this.target = val;
}
