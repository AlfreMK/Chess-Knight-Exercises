import { useEffect, useState } from 'react'

const INTERVAL_TIME = 100

export const useTimer = () => {
  const [timeInMs, setTimeInMs] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)

  const resetTimer = () => {
    setTimeInMs(0)
    setIsTimerActive(false)
  }

  const addTime = (timeToAddInMs: number) => {
    setTimeInMs((prev) => prev + timeToAddInMs)
  }

  const startTimer = () => {
    setIsTimerActive(true)
  }

  const stopTimer = () => {
    setIsTimerActive(false)
  }

  useEffect(() => {
    let interval: number | null = null
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimeInMs((prev) => prev + INTERVAL_TIME)
      }, INTERVAL_TIME)
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval)
      }
    }
  }, [isTimerActive])

  return {
    timeInMs,
    isTimerActive,
    resetTimer,
    startTimer,
    stopTimer,
    addTime,
  }
}
