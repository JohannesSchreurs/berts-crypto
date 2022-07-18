import {storeonDevtools} from 'storeon/devtools';
import main from './main';
import merger from './merger';
import crypto from './crypto';

const isServer = typeof window === 'undefined';
const Empty = () => {};

const reducers = (store = {}) => [
    merger(store),
    main(store.main),
    crypto(store.crypto),
    isServer ? Empty : storeonDevtools
]

export default reducers;