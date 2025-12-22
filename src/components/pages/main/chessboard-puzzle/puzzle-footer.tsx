import { type Exercise, isFullRouteExercise } from '@/exercises'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export const PuzzleFooter = ({
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
    <div className={cn('flex items-center justify-center gap-1 p-2', className)}>
      <a href="https://github.com/AlfreMK" target="_blank" className="shrink-0">
        <Avatar className="cursor-pointer size-9">
          <AvatarImage src="https://github.com/AlfreMK.png" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
      </a>
      <div className="relative">
        <div className="absolute -left-1 top-3.5 size-3 rotate-45 bg-contrast-minor" />
        <div className="relative rounded-2xl bg-contrast-minor px-3 py-2 text-sm">
          Beat my time{' '}
          <span className="inline-block rounded-md bg-contrast-low px-1.5 py-0.5 font-semibold tabular-nums">
            {exercise.alfredTime}
          </span>
          ! I dare you, I double dare you!
        </div>
      </div>
    </div>
  )
}
