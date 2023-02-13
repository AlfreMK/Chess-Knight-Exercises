import React, { useState, useEffect } from 'react';


function Timer(props) {
    
    // const reset = props.reset;
    const [time, setTime] = useState(0);
    



    useEffect(() => {
        let interval = null;
        if (props.isActive) {
            interval = setInterval(() => {
                setTime(time => time + 100);
            }, 100);
        } else if (!props.isActive) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [props.isActive, time]);

    return (
        <div className="timer">
            <div className="time">{timeToMsms(time)}</div>
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