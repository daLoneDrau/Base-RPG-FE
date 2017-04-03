function BehaviorParameters(initParams, bParam) {
    Hashcode.call(this);
    var action;
    var behaviorParam = bParam;
    var flags = 0;
    var movemode = -1;
    var tactics = -1;
    var targetInfo = -1;
    var targetName;
    var split = initParams.split(" ");
    for (var i = split.length - 1; i >= 0; i--) {
        if (split[i] === "STACK") {
            setAction("STACK");
            break;
        }
        if (split[i] === "UNSTACK") {
            setAction("UNSTACK");
            break;
        }
        if (split[i] === "UNSTACKALL") {
            setAction("UNSTACKALL");
            break;
        }
        if (split[i] === "L") {
            addFlag(Behaviour.BEHAVIOUR_LOOK_AROUND.getFlag());
        }
        if (split[i] === "S") {
            addFlag(Behaviour.BEHAVIOUR_SNEAK.getFlag());
        }
        if (split[i] === "D") {
            addFlag(Behaviour.BEHAVIOUR_DISTANT.getFlag());
        }
        if (split[i] === "M") {
            addFlag(Behaviour.BEHAVIOUR_MAGIC.getFlag());
        }
        if (split[i] === "F") {
            addFlag(Behaviour.BEHAVIOUR_FIGHT.getFlag());
        }
        if (split[i] === "A") {
            addFlag(Behaviour.BEHAVIOUR_STARE_AT.getFlag());
        }
        if (split[i] === "0"
                || split[i] === "1"
                || split[i] === "2") {
            tactics = 0;
        }
        if (split[i] === "GO_HOME") {
            clearFlags();
            addFlag(Behaviour.BEHAVIOUR_GO_HOME.getFlag());
        }
        if (split[i] === "FRIENDLY") {
            clearFlags();
            addFlag(Behaviour.BEHAVIOUR_FRIENDLY.getFlag());
            movemode = IoGlobals.NOMOVEMODE;
        }
        if (split[i] === "MOVE_TO") {
            clearFlags();
            addFlag(Behaviour.BEHAVIOUR_MOVE_TO.getFlag());
            movemode = IoGlobals.WALKMODE;
        }
        if (split[i] === "FLEE") {
            clearFlags();
            addFlag(Behaviour.BEHAVIOUR_FLEE.getFlag());
            movemode = IoGlobals.RUNMODE;
        }
        if (split[i] === "LOOK_FOR") {
            clearFlags();
            addFlag(Behaviour.BEHAVIOUR_LOOK_FOR.getFlag());
            movemode = IoGlobals.WALKMODE;
        }
        if (split[i] === "HIDE") {
            clearFlags();
            addFlag(Behaviour.BEHAVIOUR_HIDE.getFlag());
            movemode = IoGlobals.WALKMODE;
        }
        if (split[i] === "WANDER_AROUND") {
            clearFlags();
            addFlag(Behaviour.BEHAVIOUR_WANDER_AROUND.getFlag());
            movemode = IoGlobals.WALKMODE;
        }
        if (split[i] === "GUARD") {
            clearFlags();
            addFlag(Behaviour.BEHAVIOUR_GUARD.getFlag());
            movemode = IoGlobals.NOMOVEMODE;
            targetInfo = -2;
        }
    }
    /**
     * Adds a flag.
     * @param flag the flag
     */
    this.addFlag = function(flag) {
        flags |= flag;
    }
    this.clearFlags = function() {
        flags = 0;
    }
    /**
     * @return the speechName
     */
    this.getAction = function() {
        return action;
    }
    /**
     * @return the behaviorParam
     */
    this.getBehaviorParam = function() {
        return behaviorParam;
    }
    /**
     * @return the flags
     */
    this.getFlags = function() {
        return flags;
    }
    /**
     * @return the movemode
     */
    this.getMovemode = function() {
        return movemode;
    }
    /**
     * @return the tactics
     */
    this.getTactics = function() {
        return tactics;
    }
    /**
     * @return the targetInfo
     */
    this.getTargetInfo = function() {
        return targetInfo;
    }
    /**
     * @return the speechName
     */
    this.getTargetName = function() {
        return targetName;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    this.hasFlag = function(flag) {
        return (flags & flag) === flag;
    }
    /**
     * Removes a flag.
     * @param flag the flag
     */
    this.removeFlag = function(flag) {
        flags &= ~flag;
    }
    /**
     * @param val the value to set
     */
    this.setAction = function(val) {
        action = val;
    }
    /**
     * @param movemode the movemode to set
     */
    this.setMovemode = function(val) {
        movemode = val;
    }
    /**
     * @param tactics the tactics to set
     */
    this.setTactics = function(val) {
        tactics = val;
    }
    /**
     * @param targetInfo the targetInfo to set
     */
    this.setTargetInfo = function(val) {
        targetInfo = val;
    }
    /**
     * @param val the value to set
     */
    this.setTargetName = function(val) {
        targetName = val;
    }
}
