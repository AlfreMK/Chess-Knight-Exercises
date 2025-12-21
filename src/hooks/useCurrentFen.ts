import { useState, useMemo, useEffect } from 'react'
import { type Square } from 'chess.js'
import type { Exercise } from '@/exercises'
import { buildFenFromPosition } from '@/lib/chessUtils'

/**
 * Hook to manage the current FEN of the chessboard
 * @param exercise - The exercise to get the current FEN for
 * @returns an object with:
 * - currentFen: the current FEN
 * - setCurrentFen: a function to set the current FEN
 * - resetFen: a function to reset the current FEN
 */
export const useCurrentFen = (exercise: Exercise) => {
  const initialFen = useMemo(
    () => buildFenFromPosition(exercise.position),
    [exercise.position],
  )
  const [currentFen, setCurrentFen] = useState(initialFen)

  const resetFen = () => {
    setCurrentFen(initialFen)
  }

  useEffect(() => {
    setCurrentFen(initialFen)
  }, [initialFen])
  return { currentFen, setCurrentFen, resetFen }
}

export type OnSquaresToGoChange = ({
  prevSquaresToGo,
  newSquaresToGo,
}: {
  prevSquaresToGo: Square[]
  newSquaresToGo: Square[]
}) => void
