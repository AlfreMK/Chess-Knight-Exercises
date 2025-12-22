import { type Square, SQUARES } from 'chess.js'
import { useCallback, useMemo, useState } from 'react'
import { cloneDeep, merge } from 'lodash-es'

export type SquareStyles = Partial<Record<Square, React.CSSProperties>>

const HIGHLIGHTED_SQUARE_STYLE = {
  background: 'rgba(255, 255, 0, 0.4)',
} as const satisfies React.CSSProperties

const MOVE_SQUARE_STYLE = {
  border: '1px solid black',
} as const satisfies React.CSSProperties

/**
 * Get the highlighted styles to go
 * @param square - The square to get the styles for
 * @param chessGame - The chess game to get the styles for
 * @returns The styles for the squares in the chessboard
 */
const getSquareStyles = ({
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

export const useSquareStyles = ({ squaresToGo }: { squaresToGo: Square[] }) => {
  const [additionalSquareStyles, setAdditionalSquareStyles] =
    useState<SquareStyles>({})
  const highlightedSquareStyles = useMemo(
    () => getSquareStyles({ squaresToGo }),
    [squaresToGo],
  )
  const allSquareStyles = useMemo(() => {
    return SQUARES.reduce((acc, square) => {
      acc[square] = merge(
        cloneDeep(highlightedSquareStyles[square]),
        cloneDeep(additionalSquareStyles[square]),
      )
      return acc
    }, {} as SquareStyles)
  }, [highlightedSquareStyles, additionalSquareStyles])

  const resetAdditionalSquareStyles = useCallback(() => {
    setAdditionalSquareStyles(cloneDeep({}))
  }, [])

  const highlightMove = useCallback((square: Square) => {
    setAdditionalSquareStyles(
      cloneDeep({
        [square]: MOVE_SQUARE_STYLE,
      }),
    )
  }, [])

  return {
    allSquareStyles,
    highlightMove,
    resetAdditionalSquareStyles,
  }
}
