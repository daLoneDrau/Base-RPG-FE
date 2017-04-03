/**
 * 
 */
function Watchable() {
    /**
     * the list of {@link Watcher}s associated with this {@link IoPcData}.
     */
    var watchers = [];
    this.addWatcher = function(watcher) {
        watchers.push(watcher);
    }
    this.notifyWatchers = function() {
        for (var i = 0; i < watchers.length; i++) {
            watchers[i].watchUpdated(this);
        }
    }
    this.removeWatcher = function(watcher) {
        var index = watchers.findIndex(this.findHashcode);
        watchers.splice(index, 1);
    }    
}