import React, { useEffect } from "react";
import "./css/timer.css";
import TimerBarCircular from "./TimeBar";
import timerArrow from '../assets/TimerA-.png'

const Timer = ({ timeLeft, allowedTime, setLeftTime, submit }) => {

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftTime((prevState) => (prevState > 0 ? prevState - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  useEffect(() => {
    if(timeLeft<=0){
      console.log('timer submit')
      submit();
    }
  }, [timeLeft, submit]);

  return (
    <div className="timerContainer">
      <img src={timerArrow} style={{zIndex:'0',position:'absolute',top:'20.5%',left:'38.5%',width:'2.2rem', transition:'transform 1s linear', transform: `rotate(${(timeLeft/allowedTime)*360}deg)`,
}} />
      <TimerBarCircular timeLeft={timeLeft} allowedTime={allowedTime} />
    </div>
  );
};

export default Timer;
