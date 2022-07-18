import constants from '../constants';

const merger = (initial = '') => store => {
	store.on(constants.STORE.INIT, () => ({}));
	store.on(constants.STORE.MERGE, (state, payload) => ({...state, ...payload}));
};

export default merger;
