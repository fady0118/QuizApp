import React, { useEffect, useState } from "react";
import "./css/timer.css";
import TimerBarCircular from "./TimeBar";
import timerArrow from '../assets/TimerA-.png'

const Timer = ({ timeLeft, allowedTime, setLeftTime, submit }) => {
  // const allowedTime = questionsNum * 45 * 1000; // quiz time in milliseconds
  // const [timeLeft, setTimeLeft] = useState(allowedTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftTime((prevState) => (prevState > 0 ? prevState - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  useEffect(() => {
    if(timeLeft<=0){
      submit();
    }
  }, [timeLeft, submit]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let start = null;

    const smoothRotate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / (allowedTime),1); // Calculate progress as a fraction

      const currentRotation = progress * -360; // Total degrees based on progress
      setRotation(currentRotation);
      if (progress < 1) {
        requestAnimationFrame(smoothRotate);
      }
    };

    requestAnimationFrame(smoothRotate);
  }, [allowedTime]);

  return (
    <div className="timerContainer">
      <img src={timerArrow} style={{zIndex:'0',position:'absolute',top:'20.5%',left:'38.5%',width:'2.2rem', transition:'transform 1s linear', transform: `rotate(${(timeLeft/allowedTime)*360}deg)`,
}} />
      <TimerBarCircular timeLeft={timeLeft} allowedTime={allowedTime} />
    </div>
  );
};

export default Timer;
