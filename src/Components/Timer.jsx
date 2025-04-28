import React, { useEffect, useState } from "react";
import "./css/timer.css";
import TimerBarCircular from "./TimeBar";

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

  return (
    <div>
      <TimerBarCircular timeLeft={timeLeft} allowedTime={allowedTime} />
    </div>
  );
};

export default Timer;
