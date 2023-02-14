import { useState, createContext  } from "react";
import ChessPuzzleBoard from './integrations/ChessPuzzle';
import styled from 'styled-components';
import Rules from "./components/Rules";
import Timer from "./components/Timer";
import Switch from '@mui/material/Switch';


const TimerContext = createContext();

function App() {
  const [timerState, setTimerState] = useState({
    countPenalization: 0,
    modePenalization: false,
    time: 0,
    timeIsActive: false,
    hasReseted: true,
    hasEnded: false,
  })

  const setTimer = (option) => {
    switch (option) {
    case 'playPauseTime':
      setTimerState({...timerState, timeIsActive: !timerState.timeIsActive, hasReseted: false, hasEnded: false});
      break;
    case 'resetTime':
      setTimerState({...timerState, time: 0, timeIsActive: false, hasReseted: true, hasEnded: false});
      break;
    case 'addPenalization':
      setTimerState({...timerState, countPenalization: timerState.countPenalization + 1});
      break;
    case 'resetPenalization':
      setTimerState({...timerState, countPenalization: 0});
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
      <h2>Chess Knight Exercises</h2>
    <Container>
      <TimerContext.Provider value={{
            timer: timerState,
            setTimer: setTimer,
            setTimerState: setTimerState,
            }}>
        <LeftContainer>
          <Rules />
          <SwitchContainer>
            <SpanSwitch>Penalization Mode</SpanSwitch>
            <Switch onClick={() => setTimer("changeMode")} disabled={timerState.timeIsActive? true : false} />
          </SwitchContainer>
          <Timer context={TimerContext}/>
        </LeftContainer>
        <BorderChessBoard>
          <ChessPuzzleBoard context={TimerContext}/>
        </BorderChessBoard>
      </TimerContext.Provider>
    </Container>
    <Footer>
      Made by <Link href="https://github.com/AlfreMK"> Alfredo Medina</Link>.
      Inspired by <Link href="https://www.jairtrejo.com/"> Jair Trejo</Link> and
      <Link href="https://www.danheisman.com/chess-exercises.html"> Dan Heisman </Link>
    </Footer>
    </CenterContainer>
  );
}

export default App;


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
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 640px) { 
      font-size: 0.8em;
    }
`;

const SpanSwitch = styled.span`
    margin-left: 15px;
`;

const SwitchContainer = styled.div`
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

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    margin-top: 30px;
    min-width: 300px;
`;

const Button = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #373531;
    font-weight: bold;
    color: #bababa;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    border: none;
    cursor: pointer;
    min-width: 250px;
    &:hover {
        background-color: #2d5b7c;
    }
`;