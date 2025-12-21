import { useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, type Square } from 'chess.js'
import type { Exercise, PieceType } from '@/exercises'
import {
  buildFenWithKnightMove,
  isKnightMove,
  isThereAnyPieceOnSquare,
  isSquareBeingAttackedByOpponent,
} from '@/lib/chessUtils'
import { getSquareStyles } from './utils'

export const ChessboardPuzzle = ({
  exercise,
  currentFen,
  squaresToGo,
  onKnightMove,
}: {
  exercise: Exercise
  currentFen: string
  squaresToGo: Square[]
  onKnightMove: ({
    targetSquare,
    newFen,
  }: {
    targetSquare: Square
    newFen: string
  }) => void
}) => {
  const currentKnightSourceSquare = useMemo(() => {
    const chess = new Chess(currentFen, { skipValidation: true })
    const squares = chess.findPiece({ color: exercise.userColor, type: 'n' })
    return squares.length ? squares[0] : undefined
  }, [currentFen, exercise.userColor])

  const squareStyles = useMemo(
    () => getSquareStyles({ squaresToGo }),
    [squaresToGo],
  )

  const onMovingKnight = ({ targetSquare }: { targetSquare: Square }) => {
    if (!currentKnightSourceSquare) {
      return false
    }
    if (
      isKnightMove({
        sourceSquare: currentKnightSourceSquare,
        targetSquare,
      }) &&
      !isThereAnyPieceOnSquare({
        fen: currentFen,
        square: targetSquare,
      }) &&
      !isSquareBeingAttackedByOpponent({
        fen: currentFen,
        square: targetSquare,
        color: exercise.userColor,
      })
    ) {
      const newFen = buildFenWithKnightMove({
        fen: currentFen,
        color: exercise.userColor,
        sourceSquare: currentKnightSourceSquare,
        targetSquare,
      })
      onKnightMove({ targetSquare, newFen })
      return true
    }
    return false
  }

  return (
    <div
      className="p-1 bg-border"
      style={{
        maxWidth: '570px',
        maxHeight: '570px',
      }}
    >
      <Chessboard
        options={{
          squareStyles,
          position: currentFen,
          canDragPiece: ({ piece }) => {
            const pieceType = piece.pieceType as PieceType
            return pieceType === `${exercise.userColor}N`
          },
          onPieceDrop: ({ targetSquare: tarSquare }) => {
            const targetSquare = tarSquare as Square | null
            // Type narrow targetSquare potentially being null (e.g. if dropped off board)
            if (!targetSquare) {
              return false
            }
            return onMovingKnight({ targetSquare })
          },
          onSquareClick: ({ square: tarSquare }) => {
            const targetSquare = tarSquare as Square
            return onMovingKnight({ targetSquare })
          },
        }}
      />
    </div>
  )
}
