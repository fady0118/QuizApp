import React from "react";
import "./css/results.css";
import starEdge from "../assets/starIMG.png";
import borderLine from "../assets/borderLine-.png";

const QuizResultCard = ({ Result, saveResult }) => {
  console.log(Result);
  // constants
  const percentage =
    (Result.numOfCorrectAnswers / Result.numberOfQuestions) * 100; // Remaining percentage
  const radius = 25; // Radius of the circle
  const strokeWidth = radius / 10; // Width of the circular stroke
  const normalizedRadius = radius - strokeWidth / 2; // Normalize radius for the stroke
  const circumference = 2 * Math.PI * normalizedRadius; // Circumference of the circle
  const strokeDashoffset = circumference - (Result.grade / 100) * circumference; // Calculate offset for progress

  const gradeClick = () => {
    const gradeContainer = document.getElementById("GradeSvgContainer");
    const detailedGradeContainer = document.getElementById(
      "detailedGradeContainer"
    );

    const gradeContainerDisplay =
      window.getComputedStyle(gradeContainer).display;
    const detailedGradeContainerDisplay = window.getComputedStyle(
      detailedGradeContainer
    ).display;

    if (gradeContainerDisplay === "flex") {
      gradeContainer.style.display = "none";
      detailedGradeContainer.style.display = "flex";
      detailedGradeContainer.classList.add("detailedGradeFlexContainer");
    } else if (detailedGradeContainerDisplay === "flex") {
      gradeContainer.style.display = "flex";
      detailedGradeContainer.style.display = "none";
    }
  };

  return (
    <div className="QuizCard">
      <img
        src={starEdge}
        style={{
          width: "1rem",
          position: "absolute",
          top: "0",
          left: "0",
          transform: "rotate(-90deg)",
        }}
      />
      <img
        src={starEdge}
        style={{
          width: "1rem",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      />
      <img
        src={starEdge}
        style={{
          width: "1rem",
          position: "absolute",
          bottom: "0",
          left: "0",
          transform: "rotate(180deg)",
        }}
      />
      <img
        src={starEdge}
        style={{
          width: "1rem",
          position: "absolute",
          bottom: "0",
          right: "0",
          transform: "rotate(90deg)",
        }}
      />
      <div className="resultHeadContainer">
        <p className="resultHead">Quiz Results</p>
        <img src={borderLine} style={{ width: "95%" }} alt="" />
      </div>

      <div className="ResultData">
        {" "}
        <div>
          Name:&nbsp;
          <span style={{ textTransform: "capitalize" }}>{Result.userName}</span>
        </div>
        <div>
          Category:&nbsp;
          <span style={{ textTransform: "capitalize" }}>{Result.category}</span>
        </div>
      </div>
      <div className="gradeContainer">
        <div id="GradeSvgContainer" onClick={gradeClick}>
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
              {Math.floor(Result.grade)}
            </text>
          </svg>
          <span style={{fontSize:'0.75rem'}}>Click for details</span>
        </div>
        <div id="detailedGradeContainer" onClick={gradeClick}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Gradebar percentage={percentage} title={"Answers Score"} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Gradebar
              percentage={Result.timeFactor * 100}
              title={"Time Bonus"}
            />
          </div>
        </div>
      </div>

      <button className="Qbutton" onClick={() => saveResult(Result)}>
        <div>Save Result</div>
      </button>
      <div className="dateDiv">
        Time: <i>{Result.timestamp}</i>
      </div>
    </div>
  );
};

export default QuizResultCard;

const Gradebar = ({ percentage, title }) => {
  const width = (percentage / 100) * 7;
  return (
    <>
      <span style={{ width: "40%" }}>{title}</span>
      <div style={{ width: "7rem", height: "0.4rem" }}>
        <div
          style={{
            position: "absolute",
            display: "inline-block",
            boxSizing: "border-box",
            border: "1px solid rgba(200, 200, 200, 0.28)",
            borderRadius: "1rem",
            height: "0.4rem",
            width: "7rem",
            zIndex: "1",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            display: "inline-block",
            boxSizing: "border-box",
            borderRadius: "1rem",
            height: "0.4rem",
            width: `${width}rem`,
            backgroundImage: "linear-gradient(to right,blueviolet,violet)",
            zIndex: "0",
          }}
        ></div>
      </div>
      <span style={{ textAlign:'right',width: "12%" }}>{Math.floor(percentage)}%</span>
    </>
  );
};
