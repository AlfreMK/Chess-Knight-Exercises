import { useEffect, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, type Square } from 'chess.js'
import type { Exercise, PieceType } from '@/exercises'
import {
  buildFenWithKnightMove,
  isKnightMove,
  isThereAnyPieceOnSquare,
  isSquareBeingAttackedByOpponent,
} from '@/lib/chessUtils'
import { useSquareStyles } from './useSquareStyles'
import { PuzzleFooter } from './puzzle-footer'
import { useCurrentFen } from '@/hooks/useCurrentFen'

export const ChessboardPuzzle = ({
  hasResetBoard,
  exercise,
  squaresToGo,
  onKnightMove,
  onIllegalAttempt,
}: {
  hasResetBoard: boolean
  exercise: Exercise
  squaresToGo: Square[]
  onKnightMove: ({
    targetSquare,
  }: {
    targetSquare: Square
  }) => void
  onIllegalAttempt: () => void
}) => {
  const { currentFen, setCurrentFen, resetFen } = useCurrentFen(exercise)

  const currentKnightSourceSquare = useMemo(() => {
    const chess = new Chess(currentFen, { skipValidation: true })
    const squares = chess.findPiece({ color: exercise.userColor, type: 'n' })
    return squares.length ? squares[0] : undefined
  }, [currentFen, exercise.userColor])

  const { allSquareStyles, highlightMove, resetAdditionalSquareStyles } = useSquareStyles({ squaresToGo })

  useEffect(() => {
    if (hasResetBoard) {
      resetAdditionalSquareStyles()
      resetFen()
    }
  }, [hasResetBoard, resetAdditionalSquareStyles, resetFen])

  const onMovingKnight = ({ targetSquare }: { targetSquare: Square }) => {
    if (!currentKnightSourceSquare) {
      return false
    }
    const isThereAnyPieceOnTargetSquare = isThereAnyPieceOnSquare({
      fen: currentFen,
      square: targetSquare,
    })
    const isSquareBeingAttackedByOpponentOnTargetSquare = isSquareBeingAttackedByOpponent({
      fen: currentFen,
      square: targetSquare,
      color: exercise.userColor,
    })
    if (
      isKnightMove({
        sourceSquare: currentKnightSourceSquare,
        targetSquare,
      })
    ) {
      const isIllegalAttempt = isThereAnyPieceOnTargetSquare || isSquareBeingAttackedByOpponentOnTargetSquare
      if (isIllegalAttempt) {
        onIllegalAttempt()
        return false
      }
      const newFen = buildFenWithKnightMove({
        fen: currentFen,
        color: exercise.userColor,
        sourceSquare: currentKnightSourceSquare,
        targetSquare,
      })
      setCurrentFen(newFen)
      highlightMove(targetSquare)
      onKnightMove({ targetSquare })
      return true
    }
    return false
  }

  return (
    <div
      className="p-1 bg-contrast-low flex flex-col"
      style={{
        maxWidth: '570px',
      }}
    >
      <Chessboard
        options={{
          squareStyles: allSquareStyles,
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
      <PuzzleFooter exercise={exercise} className="bg-contrast-low" />
    </div>
  )
}
