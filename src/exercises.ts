import type { Square, PieceSymbol, Color } from 'chess.js'

export const EXERCISE_TYPES = {
  CHECK_THE_KING: 'check-the-king',
  FULL_ROUTE: 'full-route',
} as const

export type ExerciseType = (typeof EXERCISE_TYPES)[keyof typeof EXERCISE_TYPES]

export const SQUARE_ORDER = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
} as const

export type SquareOrder = (typeof SQUARE_ORDER)[keyof typeof SQUARE_ORDER]

export type PieceType = `${Color}${Uppercase<PieceSymbol>}`

export type Position = Partial<Record<Square, PieceType>>

type BaseExercise = {
  name: string
  position: Position
  userColor: Color
}

type CheckTheKingExercise = BaseExercise & {
  type: typeof EXERCISE_TYPES.CHECK_THE_KING
  squareToGo: Square
}

type FullRouteExercise = BaseExercise & {
  type: typeof EXERCISE_TYPES.FULL_ROUTE
  squareToGo: 'all'
  squareOrder: SquareOrder
  alfredTime: `${number}:${number}`
}

export type Exercise = CheckTheKingExercise | FullRouteExercise

export const isFullRouteExercise = (
  exercise: Exercise,
): exercise is FullRouteExercise => {
  return exercise.type === EXERCISE_TYPES.FULL_ROUTE
}

export const isCheckTheKingExercise = (
  exercise: Exercise,
): exercise is CheckTheKingExercise => {
  return exercise.type === EXERCISE_TYPES.CHECK_THE_KING
}

export const FULL_ROUTE_EXERCISES = [
  {
    type: EXERCISE_TYPES.FULL_ROUTE,
    name: 'Full Route 1',
    userColor: 'w',
    position: {
      a1: 'wN',
      c3: 'bP',
      c6: 'bP',
      f3: 'bP',
      f6: 'bP',
    },
    squareToGo: 'all',
    squareOrder: SQUARE_ORDER.ASCENDING,
    alfredTime: '1:27',
  },
  {
    type: EXERCISE_TYPES.FULL_ROUTE,
    name: 'Full Route 2',
    userColor: 'w',
    position: {
      h8: 'wN',
      d5: 'bQ',
    },
    squareToGo: 'all',
    squareOrder: SQUARE_ORDER.DESCENDING,
    alfredTime: '1:42',
  },
  {
    type: EXERCISE_TYPES.FULL_ROUTE,
    name: 'Full Route 3',
    userColor: 'w',
    position: {
      b1: 'wN',
      a1: 'bN',
      h1: 'bN',
      a8: 'bN',
      h8: 'bN',
      d4: 'bN',
      e5: 'bN',
    },
    squareToGo: 'all',
    squareOrder: SQUARE_ORDER.ASCENDING,
    alfredTime: '2:30',
  },
] as const satisfies FullRouteExercise[]

export const CHECK_THE_KING_EXERCISES = [
  {
    type: EXERCISE_TYPES.CHECK_THE_KING,
    name: 'Check the King 1',
    userColor: 'w',
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
    squareToGo: 'h6',
  },
  {
    type: EXERCISE_TYPES.CHECK_THE_KING,
    name: 'Check the King 2',
    userColor: 'w',
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
    squareToGo: 'c4',
  },
  {
    type: EXERCISE_TYPES.CHECK_THE_KING,
    name: 'Check the King 3',
    userColor: 'w',
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
    squareToGo: 'f4',
  },
] as const satisfies CheckTheKingExercise[]
