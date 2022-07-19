import styles from './GridRow.module.scss';
import constants from '../../../utils/constants'

const GridRow = ({ row }) => {
    return (
        row.map(cell => (
            <g key={cell.id} className={styles.cell}>
                <rect className={`${styles.cellRect} ${cell.isColoured ? styles.cellRectColoured : ''}`} width={constants.CELL_WIDTH} height={constants.CELL_HEIGHT} x={cell.x} y={cell.y}>
                </rect>
                { cell.hint && (
                    <text className={styles.cellText} x={cell.x + 15} y={cell.y + 18} textAnchor="middle">
                        { cell.letter }
                    </text>
                )}
            </g>
        ))
    )
}

export default GridRow;