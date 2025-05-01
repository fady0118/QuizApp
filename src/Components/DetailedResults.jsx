import React from "react";
import "./css/results.css";
import starEdge from "../assets/starIMG.png";
import borderLine from "../assets/borderLine-.png";

const DetailedResults = ({ results, displayResults }) => {
  const checkanswer = (result) => {
    if (result) {
      return <span style={{ color: "#66ff6ec6" }}>Correct Answer</span>;
    }
    return <span style={{ color: "#ff5563c6" }}>Wrong Answer</span>;
  };
  return (
    <div
      className="detailedResults"
      style={{ display: displayResults ? "block" : "none" }}
    >
      {results.map((result, index) => {
        return (
          <div className="answer" key={result.question}>
            <img
              src={starEdge}
              style={{
                width: "0.75rem",
                position: "absolute",
                top: "0",
                left: "0",
                transform: "rotate(-90deg)",
              }}
            />
            <img
              src={starEdge}
              style={{
                width: "0.75rem",
                position: "absolute",
                top: "0",
                right: "0",
              }}
            />
            <img
              src={starEdge}
              style={{
                width: "0.75rem",
                position: "absolute",
                bottom: "0",
                left: "0",
                transform: "rotate(180deg)",
              }}
            />
            <img
              src={starEdge}
              style={{
                width: "0.75rem",
                position: "absolute",
                bottom: "0",
                right: "0",
                transform: "rotate(90deg)",
              }}
            />
            <div
              className="answerHead"
              style={{ color: "var(--highlighted-color)" }}
            >
              {index + 1} - {result.question}
            </div>
            <img src={borderLine} style={{ width: "95%" }} />
            <div className="userAnswerHeading">
              <span>User Answer</span>
              <div className="userRecordedAnswer">
                <span>{result.user_answer}</span>
                {checkanswer(result.result)}
              </div>
            </div>
            <div className="correctAnswer">
              <span style={{ color: "#66ff6ec6" }}>Correct Answer</span>
              <span>&nbsp;&nbsp;{result.correct_answer}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailedResults;
