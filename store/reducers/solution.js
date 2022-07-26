import constants from '../constants';

const initialState = {}

const solution = store => {
    store.on(constants.STORE.INIT, () => ({ solution: initialState}));
    store.on(constants.STORE.SOLUTION.SET.DEFAULT, ({ solution }, payload) => {
        if (solution[payload.id] === undefined) {
            return { 
                solution: { 
                    ...solution,
                    [payload.id]: {
                        cells: {},
                        hintLetters: {},
                        solved: false,
                        time: 0,
                        reset: false
                    }
                 }
            }
        }
    }); 
    store.on(constants.STORE.SOLUTION.SET.CELLS, ({ solution }, payload) => {
        if (solution[payload.id] !== undefined && payload.cellId !== undefined) {
            return { 
                solution: { 
                    ...solution,
                    [payload.id]: {
                        hintLetters: {
                            ...solution[payload.id].hintLetters
                        },
                        cells: {
                            ...solution[payload.id].cells,
                            [payload.cellId]: payload.cellValue
                        },
                        solved: false
                    }
                 }
            }
        }
    }); 
    store.on(constants.STORE.SOLUTION.SET.HINTS, ({ solution }, payload) => {
        if (solution[payload.id] !== undefined && payload.cellId !== undefined) {
            return { 
                solution: { 
                    ...solution,
                    [payload.id]: {
                        cells: {
                            ...solution[payload.id].cells,
                        },
                        hintLetters: {
                            ...solution[payload.id].hintLetters,
                            [payload.cellId]: payload.cellValue
                        },
                        solved: false
                    }
                 }
            }
        }
    }); 
    store.on(constants.STORE.SOLUTION.SET.SOLVED, ({ solution }, payload) => {
        if (solution[payload.id] !== undefined) {
            return { 
                solution: { 
                    ...solution,
                    [payload.id]: {
                        ...[payload.id],
                        solved: payload.solved
                    }
                 }
            }
        }
    }); 
    store.on(constants.STORE.SOLUTION.SET.RESET, ({ solution }, payload) => {
        if (solution[payload.id] !== undefined) {
            return { 
                solution: { 
                    ...solution,
                    [payload.id]: {
                        ...[payload.id],
                        solved: false,
                        cells: {},
                        hintLetters: {},
                        reset: true
                    }
                 }
            }
        }
    }); 
	// store.on(constants.STORE.GRID.SAVE, ({ grid }, payload) => ({ grid: { [payload.id]: {...grid, solved: payload }}}));
};

export default solution;
