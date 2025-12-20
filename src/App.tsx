import { Button } from '@/components/ui/button'
import { Chessboard } from 'react-chessboard';

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <Chessboard />
    </div>
  )
}

export default App
