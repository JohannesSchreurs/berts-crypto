import constants from '../constants';

const initialState = {
    timed: false,
    hardMode: false,
    darkMode: false,
}

const settings = store => {
    store.on(constants.STORE.INIT, () => ({ settings: initialState}))
	store.on(constants.STORE.SETTINGS.SET.TIMED, ({ settings }, payload) => ({ settings: {...settings, timed: payload} }));
	store.on(constants.STORE.SETTINGS.SET.HARD_MODE, ({ settings }, payload) => ({ settings: {...settings, hardMode: payload} }));
	store.on(constants.STORE.SETTINGS.SET.DARK_MODE, ({ settings }, payload) => ({ settings: {...settings, darkMode: payload} }));
};

export default settings;
