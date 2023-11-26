import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import {
  getSquarestoGo,
  getAllPiecesExceptKnight,
  moveLikesKnight,
  updateKnightInPosition,
  getSquareOfKnight,
  getInvalidSquaresByPosition,
} from "./functions";
// import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";

// code extracted and adapted from https://chessboardjsx.com/integrations/move-validation
class ChessPuzzle extends Component {
  static propTypes = { children: PropTypes.func };
  state = {
    position: this.props.exercise.position,
    squareOfKnight: getSquareOfKnight(this.props.exercise.position),
    OtherPieces: getAllPiecesExceptKnight(this.props.exercise.position),
    invalidSquares: getInvalidSquaresByPosition(this.props.exercise.position),
    squaresToGo: getSquarestoGo(this.props.exercise),
    actualSquareToGoIndex: 1,
    squareStyles: {},
  };

  componentDidMount() {
    // this.game = new Chess(this.state.fen);
    this.setState({
      squareStyles: {
        [this.state.squaresToGo[this.state.actualSquareToGoIndex]]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)",
        },
      },
    });
  }

  componentDidUpdate() {
    if (!this.props.timeIsActive && this.props.hasReseted) {
      this.reset();
      this.props.context.setTimerState({
        ...this.props.context.timer,
        hasReseted: false,
      });
    }
    if (this.hasEnded() && !this.props.hasEnded) {
      this.props.context.setTimer("playPauseTime");
      this.props.context.setTimer("endGame");
    }
  }

  hasEnded = () => {
    return this.state.actualSquareToGoIndex === this.state.squaresToGo.length;
  };

  reset = () => {
    const position = this.props.exercise.position;
    const squaresToGo = getSquarestoGo(this.props.exercise);
    this.setState({
      position: position,
      squareOfKnight: getSquareOfKnight(position),
      OtherPieces: getAllPiecesExceptKnight(position),
      invalidSquares: getInvalidSquaresByPosition(position),
      squaresToGo: squaresToGo,
      actualSquareToGoIndex: 1,
      squareStyles: {
        [squaresToGo[1]]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      },
    });
    this.props.contextExercise.setSquares("totalToGo", squaresToGo.length - 1);
  };

  allowDrag = ({ piece }) => {
    // we can only pick up the white knight
    return piece === "wN";
  };

  moveTheKnight = (sourceSquare, targetSquare) => {
    if (
      moveLikesKnight(sourceSquare, targetSquare) &&
      !this.state.invalidSquares.includes(targetSquare)
    ) {
      this.setState({
        position: updateKnightInPosition(
          this.props.exercise.position,
          targetSquare
        ),
        squareOfKnight: targetSquare,
      });
      if (
        targetSquare ===
        this.state.squaresToGo[this.state.actualSquareToGoIndex]
      ) {
        this.props.contextExercise.setSquares(
          "squaresDone",
          this.state.actualSquareToGoIndex
        );
        this.setState({
          actualSquareToGoIndex: this.state.actualSquareToGoIndex + 1,
          actualSquareToGo:
            this.state.squaresToGo[this.state.actualSquareToGoIndex + 1],
          squareStyles: {
            [this.state.squaresToGo[this.state.actualSquareToGoIndex + 1]]: {
              backgroundColor: "rgba(255, 255, 0, 0.4)",
            },
          },
        });
      }
      if (!this.props.timeIsActive) {
        this.props.context.setTimer("playPauseTime");
      }
    } else if (moveLikesKnight(sourceSquare, targetSquare)) {
      this.props.context.setTimer("addPenalization");
    } else {
      return;
    }
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    this.moveTheKnight(sourceSquare, targetSquare);
  };

  onSquareClick = (square) => {
    this.moveTheKnight(this.state.squareOfKnight, square);
  };

  render() {
    const { position, squareStyles } = this.state;

    return this.props.children({
      squareStyles,
      position: position,
      onDrop: this.onDrop,
      allowDrag: this.allowDrag,
      onSquareClick: this.onSquareClick,
    });
  }
}

export default function ChessPuzzleBoard(props) {
  const context = useContext(props.context);
  const contextExercise = useContext(props.contextExercise);
  return (
    <ChessPuzzle
      context={context}
      exercise={props.exercise}
      contextExercise={contextExercise}
      timeIsActive={context.timer.timeIsActive}
      hasReseted={context.timer.hasReseted}
      hasEnded={context.timer.hasEnded}
      penalizedMode={context.timer.penalizedMode}
    >
      {({ position, onDrop, allowDrag, onSquareClick, squareStyles }) => (
        <Chessboard
          boardStyle={{
            userSelect: "none",
          }}
          position={position}
          onDrop={onDrop}
          allowDrag={allowDrag}
          orientation={props.orientation}
          squareStyles={squareStyles}
          onSquareClick={onSquareClick}
          calcWidth={({ screenWidth }) => {
            return Math.min(screenWidth - 32 - 8, 560);
          }}
        />
      )}
    </ChessPuzzle>
  );
}
