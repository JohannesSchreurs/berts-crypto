import constants from '../constants';

const crypto = (initial = {}) => store => {
	store.on(constants.STORE.INIT, () => ({crypto: initial}));
	store.on(constants.STORE.CRYPTO.SET, (state, payload) => ({crypto: payload}));
};

export default crypto;
