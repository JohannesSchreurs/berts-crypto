import constants from '../constants';

const main = (initial = {}) => store => {
	store.on(constants.STORE.INIT, () => ({main: initial}));
	store.on(constants.STORE.MAIN.SET, (state, payload) => ({main: payload}));
};

export default main;
