const constants = {
    STORE: {
        INIT: '@init',
        GRID: {
            SET: {
                DEFAULT: 'GRID/DEFAULT',
                ACTIVE_TILE: 'GRID/ACTIVE_TILE',
                ACTIVE_ROW: 'GRID/ACTIVE_ROW'
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
                HINTS: 'SOLUTION/HINTS',
                SOLUTION: 'SOLUTION/SOLUTION',
                CELLS: 'SOLUTION/CELLS',
                RESET: 'SOLUTIONS/RESET'
            },
            SAVE: 'save'
        }
    }
};

export default constants;