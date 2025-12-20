import { useState } from 'react'
import { Footer } from '@/components/pages/main/footer'
import { Chessboard } from 'react-chessboard'
import { Header } from '@/components/pages/main/header'
import { CHECK_THE_KING_EXERCISES, FULL_ROUTE_EXERCISES } from '@/exercises'

const ITEMS = [...CHECK_THE_KING_EXERCISES, ...FULL_ROUTE_EXERCISES].map((exercise) => ({
  label: exercise.name,
  value: exercise.name,
}))

function App() {
  const [value, setValue] = useState(ITEMS[0].value)
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Header items={ITEMS} value={value} onValueChange={setValue} />
      <Chessboard />
      <Footer />
    </div>
  )
}

export default App
