import { useState } from 'react'

export const usePenalization = () => {
  const [isPenalizationEnabled, setIsPenalizationEnabled] = useState(false)
  const [illegalAttemptsCount, setIllegalAttemptsCount] = useState(0)
  const resetIllegalAttemptsCount = () => {
    setIllegalAttemptsCount(0)
  }

  const incrementIllegalAttemptsCount = () => {
    if (isPenalizationEnabled) {
      setIllegalAttemptsCount((prev) => prev + 1)
    }
  }

  return {
    isPenalizationEnabled,
    setIsPenalizationEnabled,
    illegalAttemptsCount,
    resetIllegalAttemptsCount,
    incrementIllegalAttemptsCount,
  }
}
