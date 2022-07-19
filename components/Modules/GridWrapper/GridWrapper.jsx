import { useStoreon } from 'storeon/react';

import styles from './GridWrapper.module.scss';
import GridRow from '../GridRow/GridRow';

const GridWrapper = ({title, date, gridData }) => {
    const { grid } = useStoreon('grid');
    const formattedDate = new Date(date).toLocaleDateString();

    // console.log(grid)

    // const { grid } = useStoreon('grid')
    // const buttonHandler = e => {
    //     // console.log(grid);
    //     dispatch(constants.STORE.GRID.SET, { title: 'updated' }) 
    // }

    return (
        <div className={styles.wrapper}>
            <time className={styles.date} datatime={formattedDate}>
                { formattedDate }
            </time>
            <h1>{ title }</h1>
            <ul>
                {/* { gridData.map(({ id, cryptoHint, cryptoAnswer }) => (
                    <li key={id}>{ cryptoHint } - { cryptoAnswer }</li>
                )) } */}
            </ul> 
            <svg viewBox={`-1 -1 ${gridData.gridWidth + 2} ${gridData.gridHeight + 2}`}>
                { gridData.rows.map((row, index) => <GridRow key={index} row={row} />) }
            </svg>
        </div>
    )
}

export default GridWrapper;