import { useState, useMemo, useEffect, useRef } from 'react'
import { type Square } from 'chess.js'
import type { Exercise } from '@/exercises'
import { getSquaresToGo } from './utils'
import { buildFenFromPosition } from '@/lib/chessUtils'

/**
 * Hook to manage the current FEN of the chessboard
 * @param exercise - The exercise to get the current FEN for
 * @returns The current FEN and a function to set the current FEN
 */
export const useCurrentFen = (exercise: Exercise) => {
  const initialFen = useMemo(
    () => buildFenFromPosition(exercise.position),
    [exercise.position],
  )
  const [currentFen, setCurrentFen] = useState(initialFen)

  useEffect(() => {
    setCurrentFen(initialFen)
  }, [initialFen])
  return { currentFen, setCurrentFen }
}

export type OnSquaresToGoChange = ({
  prevSquaresToGo,
  newSquaresToGo,
}: {
  prevSquaresToGo: Square[]
  newSquaresToGo: Square[]
}) => void

/**
 * Hook to manage the squares to go
 * @param exercise - The exercise to get the squares to go for
 * @param onSquaresToGoChange - The function to call when the squares to go change
 * @returns The squares to go and a function to remove a square from the squares to go
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
    const squareToGo = squaresToGo.length > 0 ? squaresToGo[0] : undefined
    if (squareToGo === square) {
      setSquaresToGo(squaresToGo.slice(1))
    }
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

  return { squaresToGo, removeSquareFromSquaresToGo }
}
