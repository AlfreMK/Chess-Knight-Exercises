import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InfoIcon } from 'lucide-react'
import { type Exercise, isFullRouteExercise } from '@/exercises'

export const PenalizationSwitch = ({
  exercise,
  illegalAttemptsCount,
  isSwitchDisabled,
  isPenalizationEnabled,
  onPenalizationEnabledChange,
}: {
  exercise: Exercise
  illegalAttemptsCount: number
  isSwitchDisabled: boolean
  isPenalizationEnabled: boolean
  onPenalizationEnabledChange: (isPenalizationEnabled: boolean) => void
}) => {
  if (!isFullRouteExercise(exercise)) {
    return null
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon size="16" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Each time you go to controlled squares (i.e illegal attempt) the
              timer will be penalized with{' '}
              <span className="font-bold">10 seconds</span> added
            </p>
          </TooltipContent>
        </Tooltip>
        <span>Penalization Mode</span>
        <Switch
          checked={isPenalizationEnabled}
          onCheckedChange={onPenalizationEnabledChange}
          disabled={isSwitchDisabled}
        />
      </div>
      <div>
        {illegalAttemptsCount}{' '}
        <span className="font-bold text-red-500">ILLEGAL ATTEMPTS</span>
      </div>
    </div>
  )
}
