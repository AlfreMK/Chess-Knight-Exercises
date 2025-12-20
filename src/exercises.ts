import type { Square, PieceSymbol, Color } from 'chess.js'

type BaseExercise = {
  name: string
  position: Partial<Record<Square, `${Color}${Uppercase<PieceSymbol>}`>>
}

type CheckTheKingExercise = BaseExercise & {
  squaresToGo: Square
}

type FullRouteExercise = BaseExercise & {
  squaresToGo: 'all'
  isSquareOrderAscendant: boolean
  alfredTime: `${number}:${number}`
}

export const FULL_ROUTE_EXERCISES = [
  {
    name: 'Full Route 1',
    position: {
      a1: 'wN',
      c3: 'bP',
      c6: 'bP',
      f3: 'bP',
      f6: 'bP',
    },
    squaresToGo: 'all',
    isSquareOrderAscendant: true,
    alfredTime: '1:27',
  },
  {
    name: 'Full Route 2',
    position: {
      h8: 'wN',
      d5: 'bQ',
    },
    squaresToGo: 'all',
    isSquareOrderAscendant: false,
    alfredTime: '1:42',
  },
  {
    name: 'Full Route 3',
    position: {
      b1: 'wN',
      a1: 'bN',
      h1: 'bN',
      a8: 'bN',
      h8: 'bN',
      d4: 'bN',
      e5: 'bN',
    },
    squaresToGo: 'all',
    isSquareOrderAscendant: true,
    alfredTime: '2:30',
  },
] as const satisfies FullRouteExercise[]

export const CHECK_THE_KING_EXERCISES = [
  {
    name: 'Check the King 1',
    position: {
      f3: 'wN',
      b3: 'wP',
      b6: 'wP',
      c7: 'wP',
      d3: 'wP',
      d4: 'wP',
      e2: 'wP',
      e5: 'wP',
      e6: 'wP',
      e7: 'wP',
      g2: 'wP',
      g5: 'wP',
      h4: 'wP',

      a4: 'wP',
      b5: 'wP',
      c6: 'wP',
      d5: 'wP',
      d6: 'wP',
      e4: 'wP',
      f5: 'wP',
      g4: 'wP',
      g7: 'wP',

      b4: 'wP',
      c4: 'wP',
      e3: 'wP',
      f2: 'wP',
      f6: 'wP',
      h2: 'wP',
      h3: 'wP',
      h7: 'wP',
      g8: 'bK',
      h8: 'wB',
    },
    squaresToGo: 'h6',
  },
  {
    name: 'Check the King 2',
    position: {
      f3: 'wN',
      b3: 'wP',
      b6: 'wP',
      c7: 'wP',
      d3: 'wP',
      d4: 'wP',
      e2: 'wP',
      e5: 'wP',
      e6: 'wP',
      e7: 'wP',
      g2: 'wP',
      g5: 'wP',
      h4: 'wP',

      a4: 'wP',
      b5: 'wP',
      c6: 'wP',
      d5: 'wP',
      d6: 'wP',
      e4: 'wP',
      f5: 'wP',
      g4: 'wP',
      g7: 'wP',

      a5: 'wP',
      c2: 'wP',
      d2: 'wP',
      d7: 'wP',
      f4: 'wP',
      e3: 'bK',
      d1: 'wB',
      f1: 'wB',
      e8: 'wB',
      g8: 'wB',
    },
    squaresToGo: 'c4',
  },
  {
    name: 'Check the King 3',
    position: {
      f3: 'wN',
      b3: 'wP',
      b6: 'wP',
      c7: 'wP',
      d3: 'wP',
      d4: 'wP',
      e2: 'wP',
      e5: 'wP',
      e6: 'wP',
      e7: 'wP',
      g2: 'wP',
      g5: 'wP',
      h4: 'wP',

      b4: 'wP',
      c3: 'wP',
      e3: 'wP',
      f2: 'wP',
      f6: 'wP',
      h2: 'wP',
      h3: 'wP',
      h5: 'wP',
      h7: 'wP',
      b8: 'wB',
      h8: 'wB',
      d5: 'bK',
    },
    squaresToGo: 'f4',
  },
] as const satisfies CheckTheKingExercise[]
