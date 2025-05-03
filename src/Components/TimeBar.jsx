const msToTime = (duration) => {
  let milliseconds = Math.floor((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;

  return hours + ":" + minutes + ":" + seconds ;
  // return minutes + ":" + seconds + "." + milliseconds;
};
const TimerBarCircular = ({ timeLeft, allowedTime }) => {
  const percentage = (timeLeft / allowedTime) * 100; // Remaining percentage
  const radius = 60; // Radius of the circle
  const strokeWidth = 3; // Width of the circular stroke
  const normalizedRadius = radius - strokeWidth / 2; // Normalize radius for the stroke
  const circumference = 2 * Math.PI * normalizedRadius; // Circumference of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Calculate offset for progress

  const getColor = () => {
    if (percentage > 40) return "green";
    else if (percentage > 15) return "orange";
    return "red";
  };

  return (
    <svg height={radius * 2} width={radius * 2}  style={{zIndex:'2'}}>
      <defs>
        <linearGradient id="TimergradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor='#fff9a8' />
          <stop offset="100%" stopColor='#e3a381' />
        </linearGradient>
      </defs>
      <circle
        stroke="url(#TimergradientStroke)" // Dynamic color for the progress
        fill="none"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={circumference} // Total circumference
        strokeDashoffset={strokeDashoffset} // Progress offset
        transform={`rotate(-90 ${radius} ${radius})`}
        style={{
          transition: "stroke-dashoffset 1s linear", // Smooth transition for progress
        }}
      />
      <text
        x="50%"
        y="80%"
        textAnchor="middle"
        dominantBaseline="top"
        fontSize={radius/5}
        fill="silver"
      >
        {msToTime(timeLeft)}
      </text>
    </svg>
  );
};
export default TimerBarCircular;
