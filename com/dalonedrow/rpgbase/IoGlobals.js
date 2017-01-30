/**
 * 
 */
var IoGlobals = {
        /** flag indicating the interactive object is a PC. */
        IO_01_PC                    : 1,
        /** flag indicating the interactive object is an item. */
        IO_02_ITEM                  : 2,
        /** flag indicating the interactive object is an NPC. */
        IO_03_NPC                   : 4,
        /** flag indicating the interactive object is a horse object. */
        IO_04_HORSE                 : 8,
        /** flag indicating the interactive object is under water. */
        IO_05_UNDERWATER            : 16,
        /** flag indicating the interactive object is a fixable object. */
        IO_06_FREEZESCRIPT          : 32,
        /** flag indicating the interactive object is a fixable object. */
        IO_07_NO_COLLISIONS         : 64,
        /** flag indicating the interactive object is a fixable object. */
        IO_08_INVULNERABILITY       : 128,
        /** flag indicating the interactive object is a dwelling. */
        IO_09_DWELLING              : 256,
        /** flag indicating the interactive object is gold. */
        IO_10_GOLD                  : 512,
        /** flag indicating the interactive object has interactivity. */
        IO_11_INTERACTIVITY         : 1024,
        /** flag indicating the interactive object is a treasure. */
        IO_12_TREASURE              : 2048,
        /** flag indicating the interactive object is unique. */
        IO_13_UNIQUE                : 4096,
        /** flag indicating the interactive object is a party. */
        IO_14_PARTY                 : 8192,
        /** flag indicating the interactive object is a winged mount. */
        IO_15_MOVABLE               : 16384,
};
module.exports = IOGlobals;
