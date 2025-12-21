import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'

export const Timer = ({
  timeInMs,
  percentageOfCompletion,
  reset,
}: {
  timeInMs: number
  percentageOfCompletion: number
  reset: () => void
}) => {
  const isButtonDisabled = useMemo(() => timeInMs === 0, [timeInMs])
  return (
    <AnimatedCircularProgressBar value={percentageOfCompletion} size={200}>
      <div className="flex flex-col items-center justify-center gap-2">
        <div>{formatTimeForDisplay(timeInMs)}</div>
        <Button onClick={reset} disabled={isButtonDisabled}>
          Reset
        </Button>
      </div>
    </AnimatedCircularProgressBar>
  )
}

/**
 * Format the time in the format of mm:ss.ms
 * @param time - The time in milliseconds
 * @returns The time in the format of mm:ss.ms
 * @example
 * timeDisplay(123456) // '02:03.45'
 */
const formatTimeForDisplay = (timeInMs: number) => {
  const ms = timeInMs % 1000
  const timeInSecs = (timeInMs - ms) / 1000
  const secs = timeInSecs % 60
  const minutesStr = Math.floor((timeInSecs - secs) / 60).toString()
  const secondsStr = secs.toString().padStart(2, '0')
  const millisecondsStr = Math.floor(ms / 100)
    .toString()
    .padStart(1, '0')
  return `${minutesStr}:${secondsStr}.${millisecondsStr}`
}
