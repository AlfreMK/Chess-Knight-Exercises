import type { Position } from '@/exercises'
import { Chess, type Square, type Color, type PieceSymbol, type Piece } from 'chess.js'

/**
 * Get the percentage of completion of a chess exercise
 * @param squaresToGo - The number of squares to go
 * @param squaresCompleted - The number of squares completed
 * @returns The percentage of completion
 * @example
 * getPercentageOfCompletion({ squaresToGo: 10, squaresCompleted: 5 }) // 50
 */
export const getPercentageOfCompletion = ({
  squaresToGo,
  squaresCompleted,
}: {
  squaresToGo: number
  squaresCompleted: number
}) => {
  return Math.floor((squaresCompleted / squaresToGo) * 100)
}

/**
 * Builds the position for the chessboard component.
 * @param position - The position to build the position for the chessboard
 * @returns The position for the chessboard component.
 * @example
 * buildFenFromPosition({ a1: 'wN', b2: 'bP' }) // 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
 */
export const buildFenFromPosition = (position: Position) => {
  // We start with an empty chess board FEN
  const chess = new Chess('8/8/8/8/8/8/8/8 w - - 0 1', {
    skipValidation: true,
  })
  for (const [square, piece] of Object.entries(position)) {
    const [color, type] = piece.split('')
    chess.put(
      {
        color: color as Color,
        type: type.toLowerCase() as PieceSymbol,
      },
      square as Square,
    )
  }
  return chess.fen()
}

/**
 * Checks if a move is a knight move
 * @param sourceSquare - The source square
 * @param targetSquare - The target square
 * @returns True if the move is a knight move, false otherwise
 * @example
 * isKnightMove({ sourceSquare: 'a1', targetSquare: 'b3' }) // true
 */
export const isKnightMove = ({
  sourceSquare,
  targetSquare,
}: {
  sourceSquare: Square
  targetSquare: Square
}) => {
  const fileDifference = Math.abs(
    sourceSquare[0].charCodeAt(0) - targetSquare[0].charCodeAt(0),
  )
  const rankDifference = Math.abs(
    Number(sourceSquare[1]) - Number(targetSquare[1]),
  )
  return (
    (fileDifference === 1 && rankDifference === 2) ||
    (fileDifference === 2 && rankDifference === 1)
  )
}

export const buildFenWithKnightMove = ({
  fen,
  color,
  sourceSquare,
  targetSquare,
}: {
  fen: string
  color: Color
  sourceSquare: Square
  targetSquare: Square
}) => {
  const chess = new Chess(fen, { skipValidation: true })
  chess.remove(sourceSquare)
  chess.put(
    {
      color,
      type: 'n',
    },
    targetSquare,
  )
  return chess.fen()
}

export const isThereAnyPieceOnSquare = ({
  fen,
  square,
}: {
  fen: string
  square: Square
}) => {
  const chess = new Chess(fen, { skipValidation: true })
  return !!chess.get(square)
}

/**
 * Checks if a square is being attacked by the opponent pieces
 * @param fen - The FEN of the chessboard
 * @param square - The square to check
 * @param color - The color of the user
 * @param excludePieces - The pieces to exclude from the check
 * @returns True if the square is being attacked by the opponent, false otherwise
 */
export const isSquareBeingAttackedByOpponent = ({
  fen,
  square,
  color,
  excludePieces = [{ type: 'k' }],
}: {
  fen: string
  square: Square
  color: Color
  excludePieces?: Pick<Piece, 'type'>[]
}) => {
  const chess = new Chess(fen, { skipValidation: true })
  const opponentColor = color === 'w' ? 'b' : 'w'
  for (const piece of excludePieces) {
    const pieceSquares = chess.findPiece({ color: opponentColor, type: piece.type })
    for (const pieceSquare of pieceSquares) {
      chess.remove(pieceSquare)
    }
  }
  return chess.isAttacked(square, opponentColor)
}

/**
 * Get the square by the file and rank
 * @param file - The file of the square (0-7)
 * @param rank - The rank of the square (0-7)
 * @returns The square
 * @example
 * getSquareByCoord({ file: 0, rank: 0 }) // 'a1'
 */
export const getSquareByCoord = ({
  file,
  rank,
}: {
  file: number
  rank: number
}): Square => {
  return `${String.fromCharCode(file + 97)}${rank + 1}` as Square
}
