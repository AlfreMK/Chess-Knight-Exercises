import React, { useState, useEffect, useContext } from 'react';



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
        <div className="timer">
            <div className="time">{timeToMsms(context.timer.time)}</div>
            <button onClick={() => context.setTimer("resetTime")}>Reset</button>
            {/* <button onClick={() => context.setTimer("playPauseTime")}>Start/Stop</button> */}
        </div>
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
        return `${mins}:${secs}:${Math.floor(ms/100)}`;
    }
    return `${mins}:${secs}`;
}

export default Timer;