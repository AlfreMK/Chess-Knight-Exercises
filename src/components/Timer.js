import React, { useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';

function Timer(props) {
    const context = useContext(props.context);

    useEffect(() => {
        let interval = null;
        if (context.timer.timeIsActive) {
            interval = setInterval(() => {
                context.setTimerState({...context.timer, time: context.timer.time + 100});
            }, 100);
        } else if (!context.timer.timeIsActive && context.timer.time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [context, context.timer.timeIsActive, context.timer.time]);
    

    return (
        <CenterContainer style={{backgroundColor: props.backgroundColor || "#262421"}}>
            <DisplayTimer>{timeToMsms(context.timer.time)}</DisplayTimer>
            <Button variant="outlined" onClick={() => context.setTimer("resetAll")}>Reset</Button>
        </CenterContainer>
    );
}


function timeToMsms(time) {
    // put ms in one digit
    let ms = time % 1000;
    time = (time - ms) / 1000;
    let secs = time % 60;
    let mins = (time - secs) / 60;
    // fill with zeros
    secs = secs.toString().padStart(2, '0');
    if (time < 60){
        return `${mins}:${secs}.${Math.floor(ms/100)}`;
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
    margin: 20px;
    border-radius: 10px;
`;

const DisplayTimer = styled.div`
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 15px;
`;
