import { useState, createContext  } from "react";
import ChessPuzzleBoard from './integrations/ChessPuzzle';
import styled from 'styled-components';
import Rules from "./components/Rules";
import Timer from "./components/Timer";
import { Switch, Tooltip, IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import SelectExercise from "./components/SelectExercise";
import exercises from "./exercises.json";

const TimerContext = createContext();
const ExerciseContext = createContext();

const invisibleStyle = {
  display: "none",
}

function App() {
  const [timerState, setTimerState] = useState({
    countPenalization: 0,
    modePenalization: false,
    time: 0,
    timeIsActive: false,
    hasReseted: true,
    hasEnded: false,
  })

  const [timerColor, setTimerColor] = useState(undefined);
  
  const [exercise, setExercise] = useState(3);


  const setTimer = (option) => {
    switch (option) {
    case 'playPauseTime':
      setTimerState({...timerState, timeIsActive: !timerState.timeIsActive, hasReseted: false, hasEnded: false});
      break;
    case 'resetTime':
      setTimerState({...timerState, time: 0, timeIsActive: false, hasReseted: true, hasEnded: false});
      break;
    case 'addPenalization':
      if (timerState.timeIsActive){
        setTimerState({...timerState, countPenalization: timerState.countPenalization + 1});
        if (timerState.modePenalization){
          setTimerState({...timerState, countPenalization: timerState.countPenalization + 1, time: timerState.time + 10000});
          setTimerColor("rgb(224 74 74)");
          setTimeout(function(){
            setTimerColor(undefined);
          }, 100);
        }
      }
      break;
    case 'resetPenalization':
      setTimerState({...timerState, countPenalization: 0, modePenalization: false, time: 0, timeIsActive: false, hasReseted: true, hasEnded: false});
      break;
    case 'resetAll':
      setTimerState({...timerState, countPenalization: 0, time: 0, timeIsActive: false, hasReseted: true, hasEnded: false});
      break;
    case 'changeMode':
      setTimerState({...timerState, modePenalization: !timerState.modePenalization});
      break;
    case 'endGame':
      setTimerState({...timerState, timeIsActive: false, hasEnded: true});
      break;
    default:
      break;
    }
  }
  
  return (
    <CenterContainer>
      <TimerContext.Provider value={{
            timer: timerState,
            setTimer: setTimer,
            setTimerState: setTimerState,
            }}>
      <ExerciseContext.Provider value={{
            exercise: exercise,
            setExercise: setExercise,
            }}>
        <TitleContainer>
          <Title>Chess Knight Exercises</Title>
          
          <SelectExercise context={ExerciseContext} contextTimer={TimerContext} />
        </TitleContainer>
        <Container>
            <LeftContainer>
              <Rules context={ExerciseContext} />
              <PenaltContainer  style={exercise<3? {}: invisibleStyle}>
                <SwitchContainer>
                  <SwitchRow>
                    {/* <Tooltip title="Each time you go to controlled squares the timer will be penalized with 10 seconds">
                        <InfoIcon fontSize="small" />
                    </Tooltip> */}
                    <SpanSwitch>Penalization Mode</SpanSwitch>
                    <Switch onClick={() => setTimer("changeMode")} disabled={timerState.timeIsActive} checked={timerState.modePenalization} />
                  </SwitchRow>
                </SwitchContainer>
                <SpanIlegal>{timerState.countPenalization} <span style={{color:"rgb(224 74 74)"}}>ILEGAL ATTEMPTS</span></SpanIlegal>
              </PenaltContainer>
              <Timer context={TimerContext} backgroundColor={timerColor}/>
            </LeftContainer>
            <BorderChessBoard>
              <ChessPuzzleBoard context={TimerContext} exercise={exercises[exercise]} />
            </BorderChessBoard>
        </Container>
    <Footer>
      Made by <Link href="https://github.com/AlfreMK"> Alfredo Medina</Link>.
      Inspired by <Link href="https://www.jairtrejo.com/"> Jair Trejo</Link> and
      <Link href="https://www.danheisman.com/chess-exercises.html"> Dan Heisman </Link>
    </Footer>
      </ExerciseContext.Provider>
      </TimerContext.Provider>

    </CenterContainer>
  );
}

export default App;

const Title = styled.h2`
    margin-right: 15px;
    margin-left: 15px;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
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

const Footer = styled.footer`
    margin: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: center;
    @media (max-width: 640px) { 
      font-size: 0.8em;
    }
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
    margin-bottom: 10px;
    @media (max-width: 640px) { 
      order: 2;
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
    box-shadow: rgb(0 20 0 / 25%) 0px 30px 60px -12px inset, rgb(0 0 0 / 30%) 0px 18px 36px -18px inset;
`;


const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    margin-top: 10px;
    @media (max-width: 640px) { 
      order: 2;
    }
`;

const Link = styled.a`
    color: #4183c4;
    text-decoration: none;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;
