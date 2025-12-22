import { useState, useMemo, useEffect, useCallback } from 'react'
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

  const resetFen = useCallback(() => {
    setCurrentFen(initialFen)
  }, [initialFen])

  useEffect(() => {
    setCurrentFen(initialFen)
  }, [initialFen])
  return { currentFen, setCurrentFen, resetFen }
}
