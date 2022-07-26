import { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { useRouter } from 'next/router'
import styles from './GridWrapper.module.scss';
import GridRow from '../GridRow/GridRow';
import constants from '../../../utils/constants';
import storeConstants from '../../../store/constants';


const GridWrapper = ({ gridData, hints }) => {
    const { grid, dispatch } = useStoreon('grid', 'solution');
    const { query } = useRouter();

    const rowClickHandler = (index) => {
        dispatch(storeConstants.STORE.GRID.SET.ACTIVE_ROW, index );
        dispatch(storeConstants.STORE.GRID.SET.ACTIVE_TILE, `${index}-0` );
    }

    const buttonResetHandler = e => {
        dispatch(storeConstants.STORE.SOLUTION.SET.RESET, {
            id: query.slug,
        } );
        dispatch(storeConstants.STORE.GRID.SET.ACTIVE_ROW, 0 );
        dispatch(storeConstants.STORE.GRID.SET.ACTIVE_TILE, '0-0' );
    }

    useEffect(() => {
        dispatch(storeConstants.STORE.SOLUTION.SET.DEFAULT, {id: gridData.id});

        return () => {
            dispatch(storeConstants.STORE.GRID.SET.ACTIVE_ROW, '');
            dispatch(storeConstants.STORE.GRID.SET.ACTIVE_TILE, '');
        };
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                <ol className={styles.hintsList}>
                    { hints.map(({ id, cryptoHint }, index) => (
                        <li className={`${styles.hint} ${grid.activeRow === index ? styles.hintHighlight : ''} `} key={id} onClick={() => rowClickHandler(index)}>{index + 1 }. { cryptoHint }</li>
                    )) }
                </ol> 
                <svg className={styles.crypto} viewBox={`-1 -1 ${gridData.gridWidth + 22} ${gridData.gridHeight + 2}`} xmlns="http://www.w3.org/1999/xhtml">
                    { gridData.rows.map((row, index) => {
                        return (
                            <g key={index}>
                                <text className={styles.index} x={9} y={(index * constants.CELL_HEIGHT) + 13} textAnchor="middle">
                                    { index + 1 }.
                                </text>
                                <GridRow row={row} rowIndex={index} />
                            </g>
                        )
                    }) }
                </svg>
            </div>
            <div className={styles.actions}>
                <button className={styles.reset} onClick={buttonResetHandler}>Opnieuw beginnen</button>
            </div>
        </>
    )
}

export default GridWrapper;