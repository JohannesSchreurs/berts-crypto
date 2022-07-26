import styles from './GridRow.module.scss';
import GridCell from '../GridCell/GridCell';

const GridRow = ({ row, rowIndex }) => {

    return (
        row.map(cell => <GridCell key={cell.id} cell={cell} rowIndex={rowIndex} />)
    )
}

export default GridRow;