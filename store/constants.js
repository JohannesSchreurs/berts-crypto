const constants = {
    STORE: {
        INIT: '@init',
        GRID: {
            SET: {
                DEFAULT: 'GRID/DEFAULT',
                ACTIVE_TILE: 'GRID/ACTIVE_TILE',
            }
        },
        SETTINGS: {
            SET: {
                TIMED: 'SETTINGS/TIMED',
                HARD_MODE: 'SETTINGS/HARD_MODE',
                DARK_MODE: 'SETTINGS/DARK_MODE'
            },
            SAVE: 'save'
        },
        SOLUTION: {
            SET: {
                DEFAULT: 'SOLUTION/DEFAULT',
                SOLVED: 'SOLUTION/SOLVED',
                SEED: 'SOLUTION/SEED',
                SOLUTION: 'SOLUTION/SOLUTION',
                CELLS: 'SOLUTION/CELLS'
            },
            SAVE: 'save'
        }
    }
};

export default constants;