import { useState } from 'react'
import { Footer } from '@/components/pages/main/footer'
import { ChessboardWrapper } from '@/components/pages/main/chessboard-wrapper'
import { Header } from '@/components/pages/main/header'
import { Timer } from '@/components/pages/main/timer'
import { CHECK_THE_KING_EXERCISES, FULL_ROUTE_EXERCISES } from '@/exercises'

const ITEMS = [...CHECK_THE_KING_EXERCISES, ...FULL_ROUTE_EXERCISES].map((exercise) => ({
  label: exercise.name,
  value: exercise.name,
}))

function App() {
  const [currentExercise, setCurrentExercise] = useState(ITEMS[0].value)
  return (
    <div className="flex min-h-svh flex-col items-center p-6">
      <Header items={ITEMS} value={currentExercise} onValueChange={setCurrentExercise} />
      <div className="w-full flex items-center justify-center gap-8 py-6">
        <Timer timeInMs={10000} percentageOfCompletion={50} resetTimer={() => {}} />
        <ChessboardWrapper />
      </div>
      <Footer />
    </div>
  )
}

export default App
