import constants from './constants';

export const createGridFromData = data => {
    const { slug, cryptos } = data.cryptoEntry;
    let maxLeft = 0;
    let maxRight = 0;
    const rows = [];

    cryptos.forEach((crypto) => {
        const leftCol = crypto.colouredCell - 1;
        const rightCol = crypto.cryptoAnswer.length - crypto.colouredCell;

        if (leftCol > maxLeft) maxLeft = leftCol;
        if (rightCol > maxRight) maxRight = rightCol;

    })

    const gridWidth = constants.CELL_WIDTH * (maxLeft + maxRight + 1);

    cryptos.forEach((crypto, cryptoIndex) => {
        const row = [...crypto.cryptoAnswer].map((letter, rowIndex) => ({
                id: `${cryptoIndex}${rowIndex}`,
                x: ( maxLeft * constants.CELL_WIDTH + ((rowIndex + 1) - cryptos[cryptoIndex].colouredCell) * constants.CELL_WIDTH),
                y: cryptoIndex * constants.CELL_HEIGHT,
                isColoured: rowIndex + 1 === cryptos[cryptoIndex].colouredCell,
                hint: Math.random() > 0.5,
                letter
            }
        ))

        rows.push(row);
    })

    const gridData = {
        id: slug,
        gridHeight: constants.CELL_HEIGHT * cryptos.length,
        gridWidth,
        maxLeft,
        maxRight,
        rows
    };

    return gridData;
}