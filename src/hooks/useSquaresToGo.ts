import { useMemo, useState, useEffect, useRef } from 'react'
import {
  isCheckTheKingExercise,
  SQUARE_ORDER,
  type Exercise,
} from '@/exercises'
import type { Square } from 'chess.js'
import {
  buildFenFromPosition,
  getSquareByCoord,
  isSquareBeingAttackedByOpponent,
  isThereAnyPieceOnSquare,
} from '@/lib/chessUtils'

/**
 * Hook to manage the squares to go
 * @param exercise - The exercise to get the squares to go for
 * @param onSquaresToGoChange - The function to call when the squares to go change
 * @returns an object with:
 * - squaresToGo: the squares to go
 * - removeSquareFromSquaresToGo: a function to remove a square from the squares to go
 * - resetSquaresToGo: a function to reset the squares to go
 */
export const useSquaresToGo = ({
  exercise,
  onSquaresToGoChange,
}: {
  exercise: Exercise
  onSquaresToGoChange: ({
    prevSquaresToGo,
    newSquaresToGo,
  }: {
    prevSquaresToGo: Square[]
    newSquaresToGo: Square[]
  }) => void
}) => {
  const initialSquaresToGo = useMemo(() => getSquaresToGo(exercise), [exercise])
  const [squaresToGo, setSquaresToGo] = useState(initialSquaresToGo)

  const removeSquareFromSquaresToGo = (square: Square) => {
    // We only remove the first square to go if it is the same as the square to remove
    const squareToGo = squaresToGo.length > 0 ? squaresToGo[0] : undefined
    if (squareToGo === square) {
      setSquaresToGo(squaresToGo.slice(1))
    }
  }

  const resetSquaresToGo = () => {
    setSquaresToGo(initialSquaresToGo)
  }

  useEffect(() => {
    setSquaresToGo(initialSquaresToGo)
  }, [initialSquaresToGo])

  // Store previous values using refs (managed manually to control update timing)
  const prevSquaresToGoRef = useRef(squaresToGo)
  const prevExerciseRef = useRef(exercise)

  useEffect(() => {
    const prevSquaresToGo = prevSquaresToGoRef.current
    const prevExercise = prevExerciseRef.current

    // Skip if exercise changed
    if (exercise.name !== prevExercise.name) {
      prevSquaresToGoRef.current = squaresToGo
      prevExerciseRef.current = exercise
      return
    }

    // Check if squaresToGo length changed
    if (squaresToGo.length !== prevSquaresToGo.length) {
      onSquaresToGoChange({
        prevSquaresToGo,
        newSquaresToGo: squaresToGo,
      })
    }

    // Update refs at the END, after comparisons
    prevSquaresToGoRef.current = squaresToGo
    prevExerciseRef.current = exercise
  }, [squaresToGo, exercise, onSquaresToGoChange])

  return {
    initialSquaresToGo,
    squaresToGo,
    removeSquareFromSquaresToGo,
    resetSquaresToGo,
  }
}

const getSquaresToGo = (exercise: Exercise) => {
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
        !isSquareBeingAttackedByOpponent({
          fen,
          square,
          color: exercise.userColor,
        })
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
