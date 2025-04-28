import React from 'react'
import './css/Leaderboard.css'
import './css/results.css'
const LeaderboardItem = ({data}) => {
    // const percentage =
    // (Result.numOfCorrectAnswers / Result.numberOfQuestions) * 100; // Remaining percentage
  const radius = 25; // Radius of the circle
  const strokeWidth = radius / 10; // Width of the circular stroke
  const normalizedRadius = radius - strokeWidth / 2; // Normalize radius for the stroke
  const circumference = 2 * Math.PI * normalizedRadius; // Circumference of the circle
  const strokeDashoffset = circumference - (data.grade / 100) * circumference; // Calculate offset for progress

  return (
    <div className='LeaderboardResult'>
        <div className='leaderboardResultData'><p>Name: {data.userName}</p>
      <p>Category: {data.category}</p></div>
      
      <svg width={2 * radius} height={2 * radius}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="violet" />
                <stop offset="100%" stopColor="blueviolet" />
              </linearGradient>
            </defs>
            <circle
              stroke="gray" // Background circle
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="url(#gradient)"
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
              x={radius}
              y={radius + strokeWidth * 2}
              textAnchor="middle"
              // dominantBaseline="middle"
              fontSize={strokeWidth * 6.5}
              fill="url(#gradient)"
            >
              {Math.floor(data.grade)}
            </text>
          </svg>
    </div>
  )
}

export default LeaderboardItem
