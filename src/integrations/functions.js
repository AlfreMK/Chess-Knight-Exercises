
const getInvalidSquaresByPiece = (square, piece) => {
    switch (piece) {
        case "bP":
            return getPawnSquaresAttacked(square).concat([square]);
        case "bR":
            return getRookSquaresAttacked(square).concat([square]);
        case "bN":
            return getKnightSquaresAttacked(square).concat([square]);
        case "bB":
            return getBishopSquaresAttacked(square).concat([square]);
        case "bQ":
            return getQueenSquaresAttacked(square).concat([square]);
        // case "bK":
            // return getKingSquaresAttacked(square).concat([square]);
        default:
            return [square];
    }
};

const CoordBySquare = (square) => {
    const file = square[0];
    const rank = square[1];
    return [file.charCodeAt(0) - 97, rank - 1];
};

const SquareByCoord = (coord) => {
    const file = String.fromCharCode(coord[0] + 97);
    const rank = coord[1] + 1;
    return file + rank;
};


const getPawnSquaresAttacked = (square) => {
    const squares = [];
    const coord = CoordBySquare(square);
    if (coord[0] > 0){
        squares.push(SquareByCoord([coord[0] - 1, coord[1] - 1]));
    }
    if (coord[0] < 7){
        squares.push(SquareByCoord([coord[0] + 1, coord[1] - 1]));
    }
    return squares;
};

const getRookSquaresAttacked = (square) => {
    const squares = [];
    const coord = CoordBySquare(square);
    for (let i = 0; i < 8; i++) {
        if (i !== coord[0]) {
            squares.push(SquareByCoord([i, coord[1]]));
        }
        if (i !== coord[1]) {
            squares.push(SquareByCoord([coord[0], i]));
        }
    }
    return squares;
};

const getKnightSquaresAttacked = (square) => {
    const squares = [];
    const coord = CoordBySquare(square);
    for (let i = -2; i < 3; i++) {
        for (let j = -2; j < 3; j++) {
            if (Math.abs(i) + Math.abs(j) === 3) {
                if (coord[0] + i >= 0 && coord[0] + i < 8 && coord[1] + j >= 0 && coord[1] + j < 8) {
                    squares.push(SquareByCoord([coord[0] + i, coord[1] + j]));
                }
            }
        }
    }
    return squares;
};

const getBishopSquaresAttacked = (square) => {
    const squares = [];
    const coord = CoordBySquare(square);
    for (let i = 0; i < 8; i++) {
        if (i !== coord[0]) {
            if (i - coord[0] + coord[1] >= 0 && i - coord[0] + coord[1] < 8) {
                squares.push(SquareByCoord([i, i - coord[0] + coord[1]]));
            }
            if (coord[0] - i + coord[1] >= 0 && coord[0] - i + coord[1] < 8) {
                squares.push(SquareByCoord([i, coord[0] - i + coord[1]]));
            }
        }
    }
    return squares;
};

const getQueenSquaresAttacked = (square) => {
    return getRookSquaresAttacked(square).concat(getBishopSquaresAttacked(square));
};

const getKingSquaresAttacked = (square) => {
    const squares = [];
    const coord = CoordBySquare(square);
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i !== 0 || j !== 0) {
                if (coord[0] + i >= 0 && coord[0] + i < 8 && coord[1] + j >= 0 && coord[1] + j < 8) {
                    squares.push(SquareByCoord([coord[0] + i, coord[1] + j]));
                }
            }
        }
    }
    return squares;
};

const getInvalidSquaresByPosition = (position) => {
    const squares = [];
    for (const [square, piece] of Object.entries(position)) {
        if (piece !== "wN") {
            squares.push(...getInvalidSquaresByPiece(square, piece));
        }
    }
    return squares;
};


const getSquarestoGo = (exercise) => {
    if (exercise.squares_to_go === "all") {
        const invalidSquares = getInvalidSquaresByPosition(exercise.position);
        const squares = [];
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                const square = SquareByCoord([i - 1, j - 1]);
                if (!invalidSquares.includes(square)) {
                    squares.push(square);
                }
            }
        }
        // sort squares by file and rank
        // order by a1, b1, c1, d1, ..., h8, a2, ...
        squares.sort((a, b) => {
            if (a[1] === b[1]) {
                return a.charCodeAt(0) - b.charCodeAt(0);
            }
            return a[1] - b[1];
        });
        if (!(!!JSON.parse(exercise.ascendant))) {
            squares.reverse();
        }

        return squares;
    }
    return [getSquareOfKnight(exercise.position), exercise.squares_to_go];
};

const getAllPiecesExceptKnight = (position) => {
	const blackPieces = {};
	for (const [square, piece] of Object.entries(position)) {
		if (piece !== "wN") {
			blackPieces[square] = piece;
		}
	}
	return blackPieces;
};

const getSquareOfKnight = (position) => {
    for (const [square, piece] of Object.entries(position)) {
        if (piece === "wN") {
            return square;
        }
    }
};

const moveLikesKnight = (sourceSquare, targetSquare) => {
    const fileDifference = Math.abs(sourceSquare[0].charCodeAt(0) - targetSquare[0].charCodeAt(0));
    const rankDifference = Math.abs(sourceSquare[1] - targetSquare[1]);
    if ((fileDifference === 1 && rankDifference === 2) || (fileDifference === 2 && rankDifference === 1)) {
        return true;
    }
    return false;
};

const updateKnightInPosition = (originalPosition, square) => {
    const blackPieces = getAllPiecesExceptKnight(originalPosition);
    const position = {...blackPieces, [square]: "wN" };
    return position;
};


export {
    getSquarestoGo,
    getAllPiecesExceptKnight,
    moveLikesKnight,
    updateKnightInPosition,
    getSquareOfKnight,
    getInvalidSquaresByPosition,
};