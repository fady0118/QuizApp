const msToTime = (duration) => {
  let milliseconds = Math.floor((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  // return minutes + ":" + seconds + "." + milliseconds;
};
const TimerBarCircular = ({ timeLeft, allowedTime }) => {
  const percentage = (timeLeft / allowedTime) * 100; // Remaining percentage
  const radius = 50; // Radius of the circle
  const strokeWidth = 10; // Width of the circular stroke
  const normalizedRadius = radius - strokeWidth / 2; // Normalize radius for the stroke
  const circumference = 2 * Math.PI * normalizedRadius; // Circumference of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Calculate offset for progress

  const getColor = () => {
    if (percentage > 40) return "green";
    else if (percentage > 15) return "orange";
    return "red";
  };

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="lightgray" // Background circle
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={getColor()} // Dynamic color for the progress
        fill="transparent"
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
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16px"
        fill={getColor()}
      >
        {msToTime(timeLeft)}
      </text>
      {/* <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16px"
                fill={getColor()}
            >
                {Math.round(percentage)}%
            </text> */}
    </svg>
  );
};
export default TimerBarCircular;
