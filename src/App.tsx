import { useMemo, useState } from 'react'
import { Footer } from '@/components/pages/main/footer'
import { ChessboardPuzzle } from '@/components/pages/main/chessboard-puzzle'
import { Header } from '@/components/pages/main/header'
import { Timer } from '@/components/pages/main/timer'
import {
  CHECK_THE_KING_EXERCISES,
  FULL_ROUTE_EXERCISES,
  type Exercise,
} from '@/exercises'
import { RulesText } from '@/components/pages/main/rules-text'
import { PenalizationSwitch } from '@/components/pages/main/penalization-switch'
import { useTimer } from '@/hooks/useTimer'
import { useSquaresToGo } from '@/hooks/useSquaresToGo'
import type { Square } from 'chess.js'
import { getPercentageOfCompletion } from './lib/chessUtils'
import { usePenalization } from '@/hooks/usePenalization'
import { useQueryState } from 'nuqs'

const PENALIZATION_TIME_IN_MS = 10000 // 10 seconds

const EXERCISES = [...CHECK_THE_KING_EXERCISES, ...FULL_ROUTE_EXERCISES]

const EXERCISES_BY_ID = EXERCISES.reduce((acc, exercise) => {
  acc[exercise.id] = exercise
  return acc
}, {} as { [exerciseId: string]: Exercise })

const SELECT_ITEMS = EXERCISES.map((exercise) => ({
  label: exercise.name,
  value: exercise.id as string,
}))

const initialExercise = EXERCISES[0]

function App() {
  const [currentExerciseId, setCurrentExerciseId] = useQueryState(
    'exercise',
    { defaultValue: initialExercise.id },
  )

  const currentExercise = useMemo(
    () => EXERCISES_BY_ID[currentExerciseId],
    [currentExerciseId],
  )

  const [hasResetExercise, setHasResetExercise] = useState(false)

  const {
    isPenalizationEnabled,
    setIsPenalizationEnabled,
    illegalAttemptsCount,
    resetIllegalAttemptsCount,
    incrementIllegalAttemptsCount,
  } = usePenalization()

  const {
    timeInMs,
    isTimerActive,
    startTimer,
    stopTimer,
    resetTimer,
    addTime,
  } = useTimer()

  const onSquaresToGoChange = ({
    newSquaresToGo,
  }: {
    newSquaresToGo: Square[]
  }) => {
    if (newSquaresToGo.length === 0) {
      stopTimer()
    }
  }

  const {
    initialSquaresToGo,
    squaresToGo,
    removeSquareFromSquaresToGo,
    resetSquaresToGo,
  } = useSquaresToGo({
    exercise: currentExercise,
    onSquaresToGoChange,
  })

  const percentageOfCompletion = useMemo(
    () =>
      getPercentageOfCompletion({
        squaresToGo: initialSquaresToGo.length,
        squaresCompleted: initialSquaresToGo.length - squaresToGo.length,
      }),
    [initialSquaresToGo, squaresToGo],
  )

  const onSelectExercise = (exerciseId: string) => {
    setCurrentExerciseId(exerciseId)
    resetTimer()
  }

  const onKnightMove = ({ targetSquare }: { targetSquare: Square }) => {
    removeSquareFromSquaresToGo(targetSquare)
    if (hasResetExercise) {
      setHasResetExercise(false)
    }
    if (!isTimerActive && squaresToGo.length > 0) {
      startTimer()
    }
  }

  const onReset = () => {
    resetTimer()
    resetSquaresToGo()
    resetIllegalAttemptsCount()
    setHasResetExercise(true)
  }

  const onIllegalAttempt = () => {
    if (isPenalizationEnabled && isTimerActive) {
      addTime(PENALIZATION_TIME_IN_MS)
      incrementIllegalAttemptsCount()
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center p-6">
      <Header
        items={SELECT_ITEMS}
        value={currentExerciseId}
        onValueChange={onSelectExercise}
      />
      <div className="w-full flex items-center justify-center gap-6 py-12 flex-wrap sm:flex-nowrap flex-col-reverse sm:flex-row">
        <div className="flex flex-col items-center justify-center gap-8 max-w-[300px]">
          <RulesText exercise={currentExercise} />
          <PenalizationSwitch
            exercise={currentExercise}
            illegalAttemptsCount={illegalAttemptsCount}
            isPenalizationEnabled={isPenalizationEnabled}
            isSwitchDisabled={isTimerActive}
            onPenalizationEnabledChange={setIsPenalizationEnabled}
          />
          <Timer
            timeInMs={timeInMs}
            percentageOfCompletion={percentageOfCompletion}
            reset={onReset}
          />
        </div>
        <ChessboardPuzzle
          hasResetBoard={hasResetExercise}
          exercise={currentExercise}
          squaresToGo={squaresToGo}
          onKnightMove={onKnightMove}
          onIllegalAttempt={onIllegalAttempt}
        />
      </div>
      <Footer />
    </div>
  )
}

export default App
