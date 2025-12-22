import { type Exercise, isFullRouteExercise } from '@/exercises'
import { cn } from '@/lib/utils'

export const FooterText = ({
  exercise,
  className,
}: {
  exercise: Exercise
  className?: string
}) => {
  if (!isFullRouteExercise(exercise)) {
    return null
  }
  return (
    <span className={cn('block w-full text-center text-sm', className)}>
      <span className="bg-contrast-none rounded-md p-1 mr-1">
        {exercise.alfredTime}
      </span>
      Beat my time! I dare you, I double dare you!
    </span>
  )
}
