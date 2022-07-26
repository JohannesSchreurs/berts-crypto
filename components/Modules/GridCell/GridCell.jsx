import { useEffect, useRef, useState } from 'react';
import { useStoreon } from 'storeon/react';
import { useRouter } from 'next/router'
import styles from './GridCell.module.scss';
import gridConstants from '../../../utils/constants';
import constants from '../../../store/constants';

const GridCell = ({ cell, rowIndex }) => {
    const { grid, solution, dispatch } = useStoreon('grid', 'solution');
    const { query } = useRouter();
    const inputRef = useRef();
    const [letter, setLetter] = useState(solution[query.slug]?.hintLetters[cell.hint.wordIndexValue] || solution[query.slug]?.cells[cell.id] || inputRef.current?.value || '')
    const inputRegex = '^[a-zA-Z]$';
    const firstRender = useRef(true);
    
    const inputChangeHandler = e => {
        const lastLetter = e.target.value.slice(-1);

        if (lastLetter.match(inputRegex)) {
            setLetter(lastLetter);
            dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.nextCell);

            dispatch(constants.STORE.SOLUTION.SET.CELLS, {
                id: query.slug,
                cellId: cell.id,
                cellValue: lastLetter
            });

            if (!!cell.hint) {
                dispatch(constants.STORE.SOLUTION.SET.HINTS, {
                    id: query.slug,
                    cellId: cell.hint.wordIndexValue,
                    cellValue: lastLetter
                });
            }
        }
    }

    const inputKeyHandler = e => {
        // Manually do the clearing of a cell, as backspace isn't really that convient to use in onChange
        if (e.key === 'Backspace' || e.key === 'Delete') {
            setLetter('');
            dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.previousCell);
            dispatch(constants.STORE.SOLUTION.SET.CELLS, {
                id: query.slug,
                cellId: cell.id,
                cellValue: ''
            });

            if (!!cell.hint) {
                dispatch(constants.STORE.SOLUTION.SET.HINTS, {
                    id: query.slug,
                    cellId: cell.hint.wordIndexValue,
                    cellValue: ''
                });
            }
        }

        if(e.key === 'ArrowLeft') {
            dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.previousCell);
        }
        
        if (e.key === 'ArrowRight') {
            dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, cell.nextCell);
        }

        if(e.key === 'ArrowUp') {
            dispatch(constants.STORE.GRID.SET.ACTIVE_ROW, rowIndex === 0 ? 18 : rowIndex - 1);
            dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, rowIndex === 0 ? `180` : `${rowIndex-1}-0`);
        }

        if(e.key === 'ArrowDown' || e.key === 'Enter') {
            dispatch(constants.STORE.GRID.SET.ACTIVE_ROW, rowIndex === 18 ? 0 : rowIndex + 1);
            dispatch(constants.STORE.GRID.SET.ACTIVE_TILE, rowIndex === 18 ? `0-0` : `${rowIndex+1}-0`);
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
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (grid.activeTile === cell.id) {            
            inputRef.current.focus();
        }
    }, [grid.activeTile === cell.id]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (!!cell.hint) {
            setLetter(solution[query.slug]?.hintLetters[cell.hint.wordIndexValue] || '')
            dispatch(constants.STORE.SOLUTION.SET.CELLS, {
                id: query.slug,
                cellId: cell.id,
                cellValue: solution[query.slug]?.hintLetters[cell.hint.wordIndexValue]
            });
        }
    }, [solution[query.slug]?.hintLetters[cell.hint.wordIndexValue]]);

    useEffect(() => {
        if (solution[query.slug]?.reset) {
            setLetter('')
        }
    }, [solution[query.slug]?.reset]);

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
                    onKeyDown={inputKeyHandler}
                    onBlur={blurHandler}
                    onChange={inputChangeHandler}
                    value={letter}
                    type="text"
                    onSelect={selectHandler}
                    autoComplete="off"
                    maxLength="2"
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