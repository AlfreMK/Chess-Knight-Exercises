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
import {
  useCurrentFen,
  useSquaresToGo,
  type OnSquaresToGoChange,
} from './hooks'

export const ChessboardPuzzle = ({
  exercise,
  onSquaresToGoChange,
}: {
  exercise: Exercise
  onSquaresToGoChange: OnSquaresToGoChange
}) => {
  const { currentFen, setCurrentFen } = useCurrentFen(exercise)

  const { squaresToGo, removeSquareFromSquaresToGo } = useSquaresToGo({
    exercise,
    onSquaresToGoChange,
  })

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
      setCurrentFen(newFen)
      removeSquareFromSquaresToGo(targetSquare)
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
