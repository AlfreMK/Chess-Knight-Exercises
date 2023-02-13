import React, { useState, useEffect } from 'react';


function Timer(props) {
    
        const [time, setTime] = useState(0);
        const [isActive, setIsActive] = useState(false);
    
        function toggle() {
            setIsActive(!isActive);
        }
    
        function reset() {
            setTime(0);
            setIsActive(false);
        }
    
    
        useEffect(() => {
            let interval = null;
            if (isActive) {
                interval = setInterval(() => {
                    setTime(time => time + 100);
                }, 100);
            } else if (!isActive) {
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [isActive, time]);
    
        return (
            <div className="timer">
                <div className="time">{timeToMsms(time)}</div>
                <div className="row">
                    <button onClick={toggle} className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`}>
                        {isActive ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={reset} className="button">Reset</button>
                </div>
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