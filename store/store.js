import { createStoreon } from 'storeon';
import { persistState } from '@storeon/localstorage'

import grid from './reducers/grid';
import solution from './reducers/solution';
import settings from './reducers/settings'

export const store = createStoreon([
    grid,
    solution,
    settings,
    persistState(['solution', 'settings'])
]);