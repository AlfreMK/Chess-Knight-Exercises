import React, { Component, useContext } from "react";
import PropTypes from "prop-types";

// import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";


const getSquarestoGo = (invalidSquares) => {
    const squares = [];
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            const square = String.fromCharCode(96 + i) + j;
            if (!invalidSquares.includes(square)) {
                squares.push(square);
            }
        }
    }
    // sort squares by file and rank
    // order by a1, b1, c1, d1, ..., h8, a2, ...
    squares.sort((a, b) => {
        if (a[1] === b[1]) {
            return a.charCodeAt(0) - b.charCodeAt(0);
        }
        return a[1] - b[1];
    });

    return squares;
};

const SQUARE_PAWNS = {"c3": "bP", "c6": "bP", "f3": "bP", "f6": "bP"};
const ATTACKED_SQUARES = ["b2", "d2", "b5", "d5", "e2", "e5", "g2", "g5"];
const SQUARES_TO_GO = getSquarestoGo(ATTACKED_SQUARES.concat(Object.keys(SQUARE_PAWNS)));

// code extracted and adapted from https://chessboardjsx.com/integrations/move-validation
class ChessPuzzle extends Component {
  static propTypes = { children: PropTypes.func };
  state = {
    position: {...SQUARE_PAWNS, "a1": "wN"},
    squareOfKnight: "a1",
    squarePawns: SQUARE_PAWNS,
    attackedSquares: ATTACKED_SQUARES,
    // all squares except the attacked ones and squarepawns
    squaresToGo: SQUARES_TO_GO,
    actualSquareToGoIndex: 1,
    squareStyles: {},
  };


  componentDidMount() {
    // this.game = new Chess(this.state.fen);
    this.setState({
        squareStyles: { [this.state.squaresToGo[this.state.actualSquareToGoIndex]]: { backgroundColor: "rgba(255, 255, 0, 0.4)" } }
      });
  }

  componentDidUpdate(){
    if (!this.props.timeIsActive && this.props.hasReseted){
        this.reset();
        this.props.context.setTimerState({...this.props.context.timer, hasReseted: false});
        
    }
    if (this.hasEnded() && !this.props.hasEnded){
        this.props.context.setTimer("playPauseTime");
        this.props.context.setTimer("endGame");
    }
    
  }

  hasEnded = () => {
    return this.state.actualSquareToGoIndex === this.state.squaresToGo.length;
  }

  reset = () => {
    this.setState({
        position: {...this.state.squarePawns, "a1": "wN",},
        squareOfKnight: "a1",
        actualSquareToGoIndex: 1,
        squareStyles: { [this.state.squaresToGo[1]]: { backgroundColor: "rgba(255, 255, 0, 0.4)" } }
    });
  }

  allowDrag = ({ piece }) => {
    // we can only pick up the white knight
    return piece === "wN";
    };


  moveTheKnight = (sourceSquare, targetSquare) => {
    if (moveLikesKnight(sourceSquare, targetSquare) && this.state.squaresToGo.includes(targetSquare)) {
      this.setState({
          position: {...this.state.squarePawns, [targetSquare]: "wN",},
          squareOfKnight: targetSquare,
      });
      if (targetSquare === this.state.squaresToGo[this.state.actualSquareToGoIndex]){
          this.setState({
            actualSquareToGoIndex: this.state.actualSquareToGoIndex + 1,
            actualSquareToGo: this.state.squaresToGo[this.state.actualSquareToGoIndex + 1],
            squareStyles: { [this.state.squaresToGo[this.state.actualSquareToGoIndex + 1]]: { backgroundColor: "rgba(255, 255, 0, 0.4)" } }
        });
      };
      
      if (!this.props.timeIsActive){
        this.props.context.setTimer("playPauseTime");
      }
      }
      else {
          return;
      }
    };

  onDrop = ({ sourceSquare, targetSquare }) => {
    this.moveTheKnight(sourceSquare, targetSquare);
    
  };

  onSquareClick = square => {
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



const moveLikesKnight = (sourceSquare, targetSquare) => {
    const fileDifference = Math.abs(sourceSquare[0].charCodeAt(0) - targetSquare[0].charCodeAt(0));
    const rankDifference = Math.abs(sourceSquare[1] - targetSquare[1]);
    if ((fileDifference === 1 && rankDifference === 2) || (fileDifference === 2 && rankDifference === 1)) {
        return true;
    }
    return false;
};

export default function ChessPuzzleBoard(props) {
  const context = useContext(props.context);
  return (
    <ChessPuzzle
      context={context}
      timeIsActive={context.timer.timeIsActive}
      hasReseted={context.timer.hasReseted}
      hasEnded={context.timer.hasEnded}
      penalizedMode={context.timer.penalizedMode}
      >
      {({
        position,
        onDrop,
        allowDrag,
        onSquareClick,
        squareStyles }) => (
        <Chessboard
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