import constants from '../constants';

const initialState = {}

const solution = store => {
    store.on(constants.STORE.INIT, () => ({ solution: initialState}))
	// store.on(constants.STORE.GRID.SAVE, ({ grid }, payload) => ({ grid: { [payload.id]: {...grid, solved: payload }}}));
};

export default solution;
