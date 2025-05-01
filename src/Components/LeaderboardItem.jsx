import React from "react";
import "./css/Leaderboard.css";
import "./css/results.css";

const LeaderboardItem = ({ data }) => {
  // const percentage =
  // (Result.numOfCorrectAnswers / Result.numberOfQuestions) * 100; // Remaining percentage
  const radius = 25; // Radius of the circle
  const strokeWidth = radius / 10; // Width of the circular stroke
  const normalizedRadius = radius - strokeWidth / 2; // Normalize radius for the stroke
  const circumference = 2 * Math.PI * normalizedRadius; // Circumference of the circle
  const strokeDashoffset = circumference - (data.grade / 100) * circumference; // Calculate offset for progress

  return (
    <div
      className={`LeaderboardResult ${data.category
        .replace(/\s+/g, "")
        .replace(/:/g, "-")
        .replace(/&/g, "-")}`}
    >
      <div className="leaderboardName">{data.userName}</div>

      <div className="LeaderboardSvgContainer">
        <span>{data.grade.toFixed(2)}%</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 0 550 50">
          <defs>
            <linearGradient id={`${data.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                id="gradientStart"
                offset={`${Math.round(data.grade)}%`}
                stop-color="#fdffff"
              />
              <stop
                id="gradientEnd"
                offset={`${Math.round(data.grade)}%`}
                stop-color="#4c4842"
              />
                     </linearGradient>
          </defs>
          <path d="M -30 20 L -15 5 L 0 20 L -15 35 Z" fill="#fdffff" />
          <path
            d="M 0 20 L 15 10 M 15 10 L 400 10 L 415 20 L 400 30 L 15 30 L 0 20"
            fill={`url(#${data.id})`}
          />
          <path d="M 430 20 L 445 5 L 460 20 L 445 35 Z" fill="#fdffff" />
        </svg>
      </div>

      <div className="Leaderboardcategory">{data.category}</div>
    </div>
  );
};

export default LeaderboardItem;

const LeaderboardGradebar = ({ percentage, title }) => {
  return <></>;
};
