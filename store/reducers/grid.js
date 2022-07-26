import constants from '../constants';

const initialState = {
    activeTile: '00'
}

const crypto = store => {
    store.on(constants.STORE.INIT, () => ({ grid: initialState}))
	store.on(constants.STORE.GRID.SET.DEFAULT, ({ grid }, payload) => {
        return {
            grid: {
                ...payload
            }
        }
    });
	store.on(constants.STORE.GRID.SET.ACTIVE_TILE, ({ grid }, payload) => { 
        return {
            grid: {
                ...grid,
                activeTile: payload,
            }
        }
    });
	store.on(constants.STORE.GRID.SET.ACTIVE_ROW, ({ grid }, payload) => { 
        return {
            grid: {
                ...grid,
                activeRow: payload,
            }
        }
    });

	// store.on(constants.STORE.GRID.SAVE, ({ grid }, payload) => ({ grid: { [payload.id]: {...grid, solved: payload }}}));
};

export default crypto;
