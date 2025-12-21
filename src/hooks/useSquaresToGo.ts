import { useMemo, useState, useEffect, useRef } from 'react'
import type { Exercise } from '@/exercises'
import type { Square } from 'chess.js'
import { getSquaresToGo } from '@/components/pages/main/chessboard-puzzle/utils'

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

  return { squaresToGo, removeSquareFromSquaresToGo, resetSquaresToGo }
}
