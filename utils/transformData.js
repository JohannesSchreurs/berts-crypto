import constants from './constants';

const getSiblingCells = (cryptoIndex, rowIndex, wordLength) => {
    let nextCryptoIndex = null;
    let nextRowIndex = null;
    let previousCryptoIndex = null;
    let previousRowIndex = null;

    // NEXT CELLS
    if ((cryptoIndex === constants.GRID_ROWS - 1) && (rowIndex === (wordLength - 1))) {
        nextCryptoIndex = 0;
        nextRowIndex = 0;
    } else {
        nextCryptoIndex = rowIndex === wordLength - 1 ? cryptoIndex + 1 : nextCryptoIndex = cryptoIndex
        nextRowIndex = rowIndex < wordLength - 1 ? rowIndex + 1 : 0
    }

    // PREVIOUS CELLS
    if (cryptoIndex === 0 && rowIndex === 0) {
        previousCryptoIndex = constants.GRID_ROWS - 1;
        previousRowIndex = wordLength - 1;
    } else {
        previousCryptoIndex = rowIndex === 0 ? cryptoIndex - 1 : cryptoIndex
        previousRowIndex = rowIndex === 0 ? wordLength - 1 : rowIndex - 1 
    }

    return [`${nextCryptoIndex}${nextRowIndex}`, `${previousCryptoIndex}${previousRowIndex}`];
}

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
    });

    const gridWidth = constants.CELL_WIDTH * (maxLeft + maxRight + 1);

    cryptos.forEach((crypto, cryptoIndex) => {
        const previousCellLength = cryptos[cryptoIndex === 0 ? cryptos.length - 1 : cryptoIndex - 1].cryptoAnswer.length
        const row = [...crypto.cryptoAnswer].map((letter, rowIndex) => {
            // const previousWord = cryptoIndex === cryptos.length ? 0 : cryptoIndex - 1;
            return {
                id: `${cryptoIndex}${rowIndex}`,
                rowId: rowIndex,
                x: maxLeft * constants.CELL_WIDTH + ((rowIndex + 1) - cryptos[cryptoIndex].colouredCell) * constants.CELL_WIDTH,
                y: cryptoIndex * constants.CELL_HEIGHT,
                isColoured: rowIndex + 1 === cryptos[cryptoIndex].colouredCell,
                hint: crypto.hints.find(el => el.wordIndex === rowIndex + 1) || false,
                letter,
                cryptoId: slug,
                nextCell: getSiblingCells(cryptoIndex, rowIndex, crypto.cryptoAnswer.length)[0],
                previousCell: getSiblingCells(cryptoIndex, rowIndex, previousCellLength)[1]
            }
    });
        rows.push(row);
    })

    // console.log(cryptos[1])

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