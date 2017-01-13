function Watchable() {
    this.watchers = [];
}
/**
 * Adds a watcher for this instance.
 * @param watcher the {@link Watcher}
 */
Watchable.prototype.addWatcher = function(watcher) {
	if (watcher !== null) {
		this.watchers.push(watcher);
	}
};
/** Notifies all {@link Watcher}s of any changes to this instance. */
Watchable.prototype.notifyWatchers = function() {
	for (var i = this.watchers.length - 1; i >= 0; i--) {
		this.watchers[i].watchUpdated(this);
	}
}
/**
 * Removes a watcher for this instance.
 * @param watcher the {@link Watcher}
 */
Watchable.prototype.removeWatcher = function(watcher) {
	var index = -1;
	for (var i = this.watchers.length - 1; i >= 0; i--) {
		if (this.watchers[i].equals(watcher)) {
			index = i;
		}
	}
	if (this.index >= 0) {
		watchers = ArrayUtilities.getInstance().removeIndex(
		        index, watchers);
	}
}
