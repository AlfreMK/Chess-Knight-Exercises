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

const ITEMS = [...CHECK_THE_KING_EXERCISES, ...FULL_ROUTE_EXERCISES]

const EXERCISES_BY_NAME = ITEMS.reduce((acc, exercise) => {
  acc[exercise.name] = exercise
  return acc
}, {} as Record<string, Exercise>)

const SELECT_ITEMS = ITEMS.map((exercise) => ({
  label: exercise.name,
  value: exercise.name as string,
}))

const initialExercise = ITEMS[0]

function App() {
  const [currentExercise, setCurrentExercise] =
    useState<Exercise>(initialExercise)
  const currentExerciseName = useMemo(
    () => currentExercise.name,
    [currentExercise],
  )

  const onSelectExercise = (exerciseName: string) => {
    setCurrentExercise(EXERCISES_BY_NAME[exerciseName])
  }
  return (
    <div className="flex min-h-svh flex-col items-center p-6">
      <Header
        items={SELECT_ITEMS}
        value={currentExerciseName}
        onValueChange={onSelectExercise}
      />
      <div className="w-full flex items-center justify-center gap-6 py-6 flex-wrap sm:flex-nowrap flex-col-reverse sm:flex-row">
        <div className="flex flex-col items-center justify-center gap-8 max-w-[300px]">
          <RulesText exercise={currentExercise} />
          <Timer
            timeInMs={10000}
            percentageOfCompletion={50}
            resetTimer={() => {}}
          />
        </div>
        <ChessboardPuzzle exercise={currentExercise} onSquaresToGoChange={() => {}} />
      </div>
      <Footer />
    </div>
  )
}

export default App
