import { Chessboard } from 'react-chessboard'

export const ChessboardWrapper = () => {
  return (
    <div
      className="p-1 bg-border"
      style={{
        maxWidth: '570px',
        maxHeight: '570px',
      }}
    >
      <Chessboard />
    </div>
  )
}
