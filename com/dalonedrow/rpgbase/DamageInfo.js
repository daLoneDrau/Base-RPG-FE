/**
 * 
 */
function DamageInfo() {
    this.active = false;
    this.area = 0;                   // damage area type
    this.damages = 0;
    this.duration = 0;               // in milliseconds
    this.except  = [];
    this.exist = false;
    this.flags = 0;                  // damages flags
    // any other customization
    this.lastupd = 0;
    this.pos = null;
    this.radius = 0;
    // -1 for apply once
    // else damage *=framediff
    this.source = 0;                 // io index or -1 for player
    this.special = 0;                // slowdown, paralysis...
    this.special_ID = 0;             // for io localised immunities or
    this.start_time = 0;
    this.type = 0;                   // damages type
}