import { useState } from 'react'

/**
 * Hook to set a color temporarily
 * @returns an object with:
 * - temporalColor: the temporal color
 * - setColorDuringTime: a function to set a color temporarily
 */
export const useSetColorTemporarily = () => {
  const [temporalColor, setTemporalColor] = useState<string | undefined>(
    undefined,
  )

  const setColorDuringTime = ({
    color,
    timeInMs,
  }: {
    color: string
    timeInMs: number
  }) => {
    setTemporalColor(color)
    setTimeout(() => {
      setTemporalColor(undefined)
    }, timeInMs)
  }

  return { temporalColor, setColorDuringTime }
}
