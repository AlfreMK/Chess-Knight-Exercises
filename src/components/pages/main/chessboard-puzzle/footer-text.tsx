import { type Exercise, isFullRouteExercise } from '@/exercises'

export const FooterText = ({ exercise }: { exercise: Exercise }) => {
  if (!isFullRouteExercise(exercise)) {
    return null
  }
  return (
    <span className="block w-full text-center mt-2 text-sm text-gray-500">
      <span className="font-bold"> {exercise.alfredTime} </span>
      Beat my time! I dare you, I double dare you!
    </span>
  )
}
