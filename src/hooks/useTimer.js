import { useState } from "react";

const initialState = {
  countPenalization: 0,
  time: 0,
  modePenalization: false,
  timeIsActive: false,
  hasReseted: true,
  hasEnded: false,
};

const useTimer = () => {
  const [timerState, setTimerState] = useState(initialState);

  const [timerStyle, setTimerStyle] = useState("normal");

  const updateStyle = (style, time) => {
    setTimeout(function () {
      setTimerStyle(style);
    }, time);
  };

  const setTimer = (option) => {
    switch (option) {
      case "playPauseTime":
        setTimerState({
          ...timerState,
          timeIsActive: !timerState.timeIsActive,
          hasReseted: false,
          hasEnded: false,
        });
        break;
      case "addPenalization":
        if (timerState.timeIsActive) {
          setTimerState({
            ...timerState,
            countPenalization: timerState.countPenalization + 1,
          });
          if (timerState.modePenalization) {
            setTimerState({
              ...timerState,
              countPenalization: timerState.countPenalization + 1,
              time: timerState.time + 10000,
            });
            setTimerStyle("red");
            updateStyle("normal", 100);
          }
        }
        break;
      case "resetPenalization":
        setTimerState(initialState);
        break;
      case "resetAll":
        setTimerState({
          ...timerState,
          countPenalization: 0,
          time: 0,
          timeIsActive: false,
          hasReseted: true,
          hasEnded: false,
        });
        break;
      case "changeMode":
        setTimerState({
          ...timerState,
          modePenalization: !timerState.modePenalization,
        });
        break;
      case "endGame":
        setTimerState({ ...timerState, timeIsActive: false, hasEnded: true });
        break;
      default:
        break;
    }
  };

  return {
    timerState: timerState,
    setTimer: setTimer,
    setTimerState: setTimerState,
    timerStyle: timerStyle,
  };
};

export default useTimer;
