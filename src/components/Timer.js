import React, { useEffect, useContext } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const redStyle = {
  backgroundColor: "rgb(224 74 74)",
  border: "3px solid rgb(224 74 74)",
};

const normalStyle = {
  backgroundColor: "#262421",
  border: "3px solid #262421",
};

const styles = {
  normal: normalStyle,
  red: redStyle,
};

function Timer(props) {
  const context = useContext(props.context);
  const exercise = useContext(props.exercise);

  useEffect(() => {
    let interval = null;
    if (context.timer.timeIsActive) {
      interval = setInterval(() => {
        context.setTimerState({
          ...context.timer,
          time: context.timer.time + 100,
        });
      }, 100);
    } else if (!context.timer.timeIsActive && context.timer.time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [context, context.timer.timeIsActive, context.timer.time]);

  return (
    <CircularProgressWithLabel value={getPercentage(exercise.squaresCount)}>
      <CenterContainer style={styles[context.timerStyle]}>
        <DisplayTimer>{timeToMsms(context.timer.time)}</DisplayTimer>
        <Button variant="outlined" onClick={() => context.setTimer("resetAll")}>
          Reset
        </Button>
      </CenterContainer>
    </CircularProgressWithLabel>
  );
}

function getPercentage(object) {
  return Math.floor((object.squaresDone * 100) / object.squaresToGo);
}

function timeToMsms(time) {
  // put ms in one digit
  let ms = time % 1000;
  time = (time - ms) / 1000;
  let secs = time % 60;
  let mins = (time - secs) / 60;
  // fill with zeros
  secs = secs.toString().padStart(2, "0");
  if (time < 60) {
    return `${mins}:${secs}.${Math.floor(ms / 100)}`;
  }
  return `${mins}:${secs}`;
}

export default Timer;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 123px;
  height: 123px;
  border-radius: 50%;
`;

const DisplayTimer = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 15px;
`;
