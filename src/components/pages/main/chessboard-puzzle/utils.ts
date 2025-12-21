import { type Square } from 'chess.js'
import {
  type Exercise,
  isCheckTheKingExercise,
  SQUARE_ORDER,
} from '@/exercises'
import {
  buildFenFromPosition,
  isSquareBeingAttackedByOpponent,
  isThereAnyPieceOnSquare,
  getSquareByCoord,
} from '@/lib/chessUtils'

type SquareStyles = Partial<Record<Square, React.CSSProperties>>

const HIGHLIGHTED_SQUARE_STYLE = {
  background: 'rgba(255, 255, 0, 0.4)',
} as const satisfies React.CSSProperties

/**
 * Get the highlighted styles to go
 * @param square - The square to get the styles for
 * @param chessGame - The chess game to get the styles for
 * @returns The styles for the squares in the chessboard
 */
export const getSquareStyles = ({
  squaresToGo,
}: {
  squaresToGo: Square[]
}): SquareStyles => {
  const newSquares: SquareStyles = {}
  if (squaresToGo.length > 0) {
    const firstSquare = squaresToGo[0]
    newSquares[firstSquare] = HIGHLIGHTED_SQUARE_STYLE
  }
  return newSquares
}

export const getSquaresToGo = (exercise: Exercise) => {
  const fen = buildFenFromPosition(exercise.position)
  if (isCheckTheKingExercise(exercise)) {
    return [exercise.squareToGo]
  }
  const squares: Square[] = []
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const square = getSquareByCoord({ file, rank })
      if (
        !isThereAnyPieceOnSquare({ fen, square }) &&
        !isSquareBeingAttackedByOpponent({ fen, square, color: exercise.userColor })
      ) {
        squares.push(square)
      }
    }
  }
  // Sort squares by file and rank
  // Order by a1, b1, c1, d1, ..., h1, a2, ...
  squares.sort((squareA, squareB) => {
    const fileA = squareA[0]
    const fileB = squareB[0]
    const rankA = parseInt(squareA[1])
    const rankB = parseInt(squareB[1])
    if (rankA === rankB) {
      return fileA.charCodeAt(0) - fileB.charCodeAt(0)
    }
    return rankA - rankB
  })
  if (exercise.squareOrder === SQUARE_ORDER.DESCENDING) {
    squares.reverse()
  }
  return squares
}
