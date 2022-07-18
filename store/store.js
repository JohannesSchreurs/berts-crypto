import { useMemo } from 'react';
import { createStoreon } from 'storeon';
import reducers from './reducers/reducers';
import constants from './constants';

let store;
const isServer = typeof window === 'undefined';
const initialState = {};

const initStore = (preloadedState = initialState) => {
    return createStoreon(reducers(preloadedState))
}

export const initializeStore = preloadedState => {
    let _store = store ?? initStore(preloadedState);

	if (preloadedState && store) {
		const mergedState = {
			...store.get(),
			...preloadedState,
			event: {
				...store.get().event,
				...preloadedState.event
			}
		};

		store.dispatch(constants.STORE.MERGE, mergedState);

		_store = store;
		store = undefined;
	}

	if (isServer) {
		return _store;
	}

	if (!store) {
		store = _store;
	}

	console.log(_store.get())

	return _store;
}

export const useStore = initialState => {
    return useMemo(() => initializeStore(initialState), [initialState])
}