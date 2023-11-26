import { useState, createContext } from "react";
import ChessPuzzleBoard from "./integrations/ChessPuzzle";
import styled from "styled-components";
import Rules from "./components/Rules";
import Timer from "./components/Timer";
import { Switch, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SelectExercise from "./components/SelectExercise";
import exercises from "./exercises.json";
import Footer from "./components/Footer";
import useTimer from "./hooks/useTimer";

const TimerContext = createContext();
const ExerciseContext = createContext();

const invisibleStyle = {
  display: "none",
};

function App() {
  const { timerState, setTimer, setTimerState, timerStyle } = useTimer();
  const [exercise, setExercise] = useState(3);

  const [squaresCount, setSquaresCount] = useState({
    squaresToGo: 0,
    squaresDone: 0,
  });

  const setSquares = (option, num) => {
    switch (option) {
      case "squaresDone":
        setSquaresCount({ ...squaresCount, squaresDone: num });
        break;
      case "totalToGo":
        setSquaresCount({ ...squaresCount, squaresToGo: num, squaresDone: 0 });
        break;
      default:
        break;
    }
  };

  return (
    <CenterContainer>
      <TimerContext.Provider
        value={{
          timer: timerState,
          setTimer: setTimer,
          setTimerState: setTimerState,
          timerStyle: timerStyle,
        }}
      >
        <ExerciseContext.Provider
          value={{
            exercise: exercise,
            setExercise: setExercise,
            squaresCount: squaresCount,
            setSquares: setSquares,
          }}
        >
          <TitleContainer>
            <Title>Chess Knight Exercises</Title>

            <SelectExercise
              context={ExerciseContext}
              contextTimer={TimerContext}
            />
          </TitleContainer>
          <Container>
            <LeftContainer>
              <Rules context={ExerciseContext} />
              <PenaltContainer style={exercise < 3 ? {} : invisibleStyle}>
                <SwitchContainer>
                  <SwitchRow>
                    <Tooltip
                      title="Each time you go to controlled squares (i.e ilegal attempt) the timer will be penalized with 10 seconds added"
                      arrow
                    >
                      <IconButton>
                        <InfoIcon
                          fontSize="small"
                          style={{ color: "#bababa" }}
                        />
                      </IconButton>
                    </Tooltip>
                    <SpanSwitch>Penalization Mode</SpanSwitch>
                    <Switch
                      onClick={() => setTimer("changeMode")}
                      disabled={timerState.timeIsActive}
                      checked={timerState.modePenalization}
                    />
                  </SwitchRow>
                </SwitchContainer>
                <SpanIlegal>
                  {timerState.countPenalization}{" "}
                  <span style={{ color: "rgb(224 74 74)" }}>
                    ILEGAL ATTEMPTS
                  </span>
                </SpanIlegal>
              </PenaltContainer>
              <Timer context={TimerContext} exercise={ExerciseContext} />
            </LeftContainer>
            <BorderChessBoard>
              <ChessPuzzleBoard
                context={TimerContext}
                exercise={exercises[exercise]}
                contextExercise={ExerciseContext}
              />
              <SpanMyTime style={exercise < 3 ? {} : invisibleStyle}>
                <SpanTime> {exercises[exercise].my_time} </SpanTime>
                Beat my time! I dare you, I double dare you!{" "}
              </SpanMyTime>
            </BorderChessBoard>
          </Container>
          <Footer />
        </ExerciseContext.Provider>
      </TimerContext.Provider>
    </CenterContainer>
  );
}

export default App;

const SpanTime = styled.span`
  display: inline-block;
  font-weight: 600;
  text-align: center;
  color: #bababa;
  border-radius: 5px;
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 0 5px;
  background-color: #1a1a1a;
`;

const SpanMyTime = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 0.9em;
  color: #bababa;
  margin-top: 4px;
  @media (max-width: 640px) {
    font-size: 0.8em;
  }
`;

const Title = styled.h2`
  margin-right: 15px;
  margin-left: 15px;
  @media (max-width: 640px) {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  @media (max-width: 640px) {
    justify-content: center;
    margin-bottom: 0px;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 5%;
  margin-left: 5%;
`;

const BorderChessBoard = styled.div`
  padding: 5px;
  background-color: #373531;
  margin: 5px;
`;

const SpanSwitch = styled.span`
  font-weight: bold;
`;

const SwitchRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  margin: 7px;
  background-color: #373531;
  min-width: 250px;
`;

const PenaltContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    order: 2;
    margin-top: 20px;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  min-width: 250px;
  background-color: #373531;
`;

const SpanIlegal = styled.span`
  font-weight: bold;
  background-color: #262626;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 12px;
  box-shadow: rgb(0 20 0 / 25%) 0px 30px 60px -12px inset,
    rgb(0 0 0 / 30%) 0px 18px 36px -18px inset;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  margin-top: 10px;
  @media (max-width: 900px) {
    order: 2;
  }
`;
