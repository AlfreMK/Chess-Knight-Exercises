import {
  SQUARE_ORDER,
  isCheckTheKingExercise,
  isFullRouteExercise,
  type Exercise,
  type SquareOrder,
} from '@/exercises'

const ORDER_TEXT_BY_ORDER = {
  [SQUARE_ORDER.ASCENDING]: 'left to right, bottom to up',
  [SQUARE_ORDER.DESCENDING]: 'right to left, up to bottom',
} as const satisfies Record<SquareOrder, string>

export const RulesText = ({ exercise }: { exercise: Exercise }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <h3 className="text-lg font-bold">
        Reroute the knight to the{' '}
        <span className="text-primary">highlighted square</span>
      </h3>

      {isFullRouteExercise(exercise) && (
        <span>
          The goal is to move the knight in order{' '}
          {ORDER_TEXT_BY_ORDER[exercise.squareOrder]}, with the restriction that
          you can't move it to controlled squares by the black pieces.
        </span>
      )}

      {isCheckTheKingExercise(exercise) && (
        <span>Go check that king with your horsy!</span>
      )}
    </div>
  )
}
