import { useState, useMemo, useEffect, useRef } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, type Square } from 'chess.js'
import type { Exercise, PieceType } from '@/exercises'
import {
  buildFenFromPosition,
  buildFenWithKnightMove,
  isKnightMove,
  isThereAnyPieceOnSquare,
  isSquareBeingAttackedByOpponent,
} from '@/lib/chessUtils'
import { getSquareStyles, getSquaresToGo } from './utils'

export const ChessboardPuzzle = ({
  exercise,
  onSquaresToGoChange,
}: {
  exercise: Exercise
  onSquaresToGoChange: (params: {
    prevSquaresToGo: Square[]
    newSquaresToGo: Square[]
  }) => void
}) => {
  const { currentFen, setCurrentFen } = useCurrentFen(exercise)

  const { squaresToGo, removeSquareFromSquaresToGo } = useSquaresToGo({ exercise, onSquaresToGoChange })

  const currentKnightSourceSquare = useMemo(() => {
    const chess = new Chess(currentFen, { skipValidation: true })
    const squares = chess.findPiece({ color: exercise.userColor, type: 'n' })
    return squares.length ? squares[0] : undefined
  }, [currentFen, exercise.userColor])

  const squareStyles = useMemo(
    () => getSquareStyles({ squaresToGo }),
    [squaresToGo],
  )

  const onMovingKnight = ({ targetSquare }: { targetSquare: Square }) => {
    if (!currentKnightSourceSquare) {
      return false
    }
    if (
      isKnightMove({
        sourceSquare: currentKnightSourceSquare,
        targetSquare,
      }) &&
      !isThereAnyPieceOnSquare({
        fen: currentFen,
        square: targetSquare,
      }) &&
      !isSquareBeingAttackedByOpponent({
        fen: currentFen,
        square: targetSquare,
        color: exercise.userColor,
      })
    ) {
      const newFen = buildFenWithKnightMove({
        fen: currentFen,
        color: exercise.userColor,
        sourceSquare: currentKnightSourceSquare,
        targetSquare,
      })
      setCurrentFen(newFen)
      removeSquareFromSquaresToGo(targetSquare)
      return true
    }
    return false
  }

  return (
    <div
      className="p-1 bg-border"
      style={{
        maxWidth: '570px',
        maxHeight: '570px',
      }}
    >
      <Chessboard
        options={{
          squareStyles,
          position: currentFen,
          canDragPiece: ({ piece }) => {
            const pieceType = piece.pieceType as PieceType
            return pieceType === `${exercise.userColor}N`
          },
          onPieceDrop: ({ targetSquare: tarSquare }) => {
            const targetSquare = tarSquare as Square | null
            // Type narrow targetSquare potentially being null (e.g. if dropped off board)
            if (!targetSquare) {
              return false
            }
            return onMovingKnight({ targetSquare })
          },
          onSquareClick: ({ square: tarSquare }) => {
            const targetSquare = tarSquare as Square
            return onMovingKnight({ targetSquare })
          },
        }}
      />
    </div>
  )
}

const useCurrentFen = (exercise: Exercise) => {
  const initialFen = useMemo(
    () => buildFenFromPosition(exercise.position),
    [exercise.position],
  )
  const [currentFen, setCurrentFen] = useState(initialFen)

  useEffect(() => {
    setCurrentFen(initialFen)
  }, [initialFen])
  return { currentFen, setCurrentFen }
}

const useSquaresToGo = ({
  exercise,
  onSquaresToGoChange,
}: {
  exercise: Exercise
  onSquaresToGoChange: ({
    prevSquaresToGo,
    newSquaresToGo,
  }: {
    prevSquaresToGo: Square[]
    newSquaresToGo: Square[]
  }) => void
}) => {
  const initialSquaresToGo = useMemo(() => getSquaresToGo(exercise), [exercise])
  const [squaresToGo, setSquaresToGo] = useState(initialSquaresToGo)

  const removeSquareFromSquaresToGo = (square: Square) => {
    const squareToGo = squaresToGo.length > 0 ? squaresToGo[0] : undefined
    if (squareToGo === square) {
      setSquaresToGo(squaresToGo.slice(1))
    }
  }

  useEffect(() => {
    setSquaresToGo(initialSquaresToGo)
  }, [initialSquaresToGo])

  // Store previous values using refs (managed manually to control update timing)
  const prevSquaresToGoRef = useRef(squaresToGo)
  const prevExerciseRef = useRef(exercise)

  useEffect(() => {
    const prevSquaresToGo = prevSquaresToGoRef.current
    const prevExercise = prevExerciseRef.current

    // Skip if exercise changed
    if (exercise.name !== prevExercise.name) {
      prevSquaresToGoRef.current = squaresToGo
      prevExerciseRef.current = exercise
      return
    }

    // Check if squaresToGo length changed
    if (squaresToGo.length !== prevSquaresToGo.length) {
      onSquaresToGoChange({
        prevSquaresToGo,
        newSquaresToGo: squaresToGo,
      })
    }

    // Update refs at the END, after comparisons
    prevSquaresToGoRef.current = squaresToGo
    prevExerciseRef.current = exercise
  }, [squaresToGo, exercise, onSquaresToGoChange])

  return { squaresToGo, removeSquareFromSquaresToGo }
}

// const ChessboardPepe = ({ position }: { position: string }) => {
//   // create a chess game using a ref to always have access to the latest game state within closures and maintain the game state across renders
//   const chessGameRef = useRef(new Chess())
//   const chessGame = chessGameRef.current

//   // track the current position of the chess game in state to trigger a re-render of the chessboard
//   const [chessPosition, setChessPosition] = useState(chessGame.fen())
//   const [moveFrom, setMoveFrom] = useState('')
//   const [optionSquares, setOptionSquares] = useState({})

//   // get the move options for a square to show valid moves
//   function getMoveOptions(square: Square) {
//     // get the moves for the square
//     const moves = chessGame.moves({
//       square,
//       verbose: true,
//     })

//     // if no moves, clear the option squares
//     if (moves.length === 0) {
//       setOptionSquares({})
//       return false
//     }

//     // create a new object to store the option squares
//     const newSquares: Record<string, React.CSSProperties> = {}

//     // loop through the moves and set the option squares
//     for (const move of moves) {
//       newSquares[move.to] = {
//         background:
//           chessGame.get(move.to) &&
//           chessGame.get(move.to)?.color !== chessGame.get(square)?.color
//             ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)' // larger circle for capturing
//             : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
//         // smaller circle for moving
//         borderRadius: '50%',
//       }
//     }

//     // set the square clicked to move from to yellow
//     newSquares[square] = {
//       background: 'rgba(255, 255, 0, 0.4)',
//     }

//     // set the option squares
//     setOptionSquares(newSquares)

//     // return true to indicate that there are move options
//     return true
//   }
//   function onSquareClick({ square, piece }: SquareHandlerArgs) {
//     // piece clicked to move
//     if (!moveFrom && piece) {
//       // get the move options for the square
//       const hasMoveOptions = getMoveOptions(square as Square)

//       // if move options, set the moveFrom to the square
//       if (hasMoveOptions) {
//         setMoveFrom(square)
//       }

//       // return early
//       return
//     }

//     // square clicked to move to, check if valid move
//     const moves = chessGame.moves({
//       square: moveFrom as Square,
//       verbose: true,
//     })
//     const foundMove = moves.find((m) => m.from === moveFrom && m.to === square)

//     // not a valid move
//     if (!foundMove) {
//       // check if clicked on new piece
//       const hasMoveOptions = getMoveOptions(square as Square)

//       // if new piece, setMoveFrom, otherwise clear moveFrom
//       setMoveFrom(hasMoveOptions ? square : '')

//       // return early
//       return
//     }

//     // is normal move
//     try {
//       chessGame.move({
//         from: moveFrom,
//         to: square,
//         promotion: 'q',
//       })
//     } catch {
//       // if invalid, setMoveFrom and getMoveOptions
//       const hasMoveOptions = getMoveOptions(square as Square)

//       // if new piece, setMoveFrom, otherwise clear moveFrom
//       if (hasMoveOptions) {
//         setMoveFrom(square)
//       }

//       // return early
//       return
//     }

//     // update the position state
//     setChessPosition(chessGame.fen())

//     // clear moveFrom and optionSquares
//     setMoveFrom('')
//     setOptionSquares({})
//   }

//   // handle piece drop
//   function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
//     // type narrow targetSquare potentially being null (e.g. if dropped off board)
//     if (!targetSquare) {
//       return false
//     }

//     // try to make the move according to chess.js logic
//     try {
//       chessGame.move({
//         from: sourceSquare,
//         to: targetSquare,
//         promotion: 'q', // always promote to a queen for example simplicity
//       })

//       // update the position state upon successful move to trigger a re-render of the chessboard
//       setChessPosition(chessGame.fen())

//       // clear moveFrom and optionSquares
//       setMoveFrom('')
//       setOptionSquares({})

//       // make random cpu move after a short delay
//       setTimeout(makeRandomMove, 500)

//       // return true as the move was successful
//       return true
//     } catch {
//       // return false as the move was not successful
//       return false
//     }
//   }

//   // set the chessboard options
//   const chessboardOptions = {
//     onPieceDrop,
//     onSquareClick,
//     position: chessPosition,
//     squareStyles: optionSquares,
//     id: 'click-or-drag-to-move',
//   }

//   // render the chessboard
//   return <Chessboard options={chessboardOptions} />
// }
