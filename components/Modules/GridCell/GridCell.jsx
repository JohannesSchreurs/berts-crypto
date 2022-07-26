import { useEffect, useRef, useReducer } from 'react';
import { useStoreon } from 'storeon/react';

import styles from './GridCell.module.scss';
import gridConstants from '../../../utils/constants';
import constants from '../../../store/constants';

const initialState = {
    text: ''
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'reset':
            return initialState;

        case 'setText':
            return { 
                ...state,
                text: action.text
            }
    
        default:
            throw new Error('Something went wrong with the state');
    }
};

const GridCell = ({ cell, rowIndex }) => {
    const [state, _dispatch] = useReducer(reducer, initialState);
    const { grid, dispatch } = useStoreon('grid');
    const inputRef = useRef();
    const inputRegex = '^[a-zA-Z]$';

    const inputChangeHandler = e => {
        if (state.text.length === 0) {
            if (e.target.value.match(inputRegex)) {
                _dispatch({ type: 'setText', text: e.target.value })
                dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.nextCell);
            }
        } else {
            if (e.target.value.length === 0) {
            } else if (e.target.value.length === 2) { 
                dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.nextCell);
            } else {
                dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.id);
            }
            _dispatch({ type: 'setText', text: e.target.value.slice(-1) });
        }
    }

    const inputKeyHandler = e => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (state.text.length !== 1) {
                dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.previousCell);
            }
        }

        if(e.key === 'ArrowLeft') {
            console.log('trigger')
            dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.previousCell);
        }
        
        if (e.key === 'ArrowRight') {
            dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.nextCell);
        }
    }

    const focusHandler = () => {
        dispatch(constants.STORE.GRID.SET.ACTIVE_ROW, rowIndex);
        dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.id);
        inputRef.current.focus();
    }
     
    const blurHandler = () => {
        dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, '');
        dispatch(constants.STORE.GRID.SET.ACTIVE_ROW, '');
    }

    const selectHandler = () => {
        inputRef.current.setSelectionRange(-1, -1);
    }

    useEffect(() => {
        if (grid.activeTile === cell.id) {            
            inputRef.current.focus();
        }
    }, [grid.activeTile === cell.id])


    return (
        <g className={`${styles.cell} ${grid.activeTile === cell.id ? styles.cellHighlight : ''}`}>
            <rect className={`${styles.cellRect} ${cell.isColoured ? styles.cellRectColoured : ''} ${grid.activeRow === rowIndex ? styles.cellRectActive : ''}`} width={gridConstants.CELL_WIDTH} height={gridConstants.CELL_HEIGHT} x={cell.x + 20} y={cell.y}>
            </rect>
            <foreignObject width={gridConstants.CELL_WIDTH} height={gridConstants.CELL_HEIGHT} x={cell.x + 20} y={cell.y}>
                <label htmlFor={cell.id} className={styles.label}>Crypto input</label>
                <input 
                    id={cell.id}
                    ref={inputRef}
                    onFocus={focusHandler}
                    onKeyDownCapture={inputKeyHandler}
                    onBlur={blurHandler}
                    onChange={inputChangeHandler}
                    value={state.text}
                    type="text"
                    onSelect={selectHandler}
                    autoComplete="off"
                    name="cell" />
            </foreignObject>
            { !!cell.hint && (
                <text className={styles.cellText} x={cell.x + 35} y={cell.y + 18} textAnchor="middle">
                    { cell.hint.wordIndexValue }
                </text>
            )}
        </g>
    )
}

export default GridCell;