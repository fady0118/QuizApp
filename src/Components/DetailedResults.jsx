import React from "react";
import './css/results.css'
const DetailedResults = ({results, displayResults}) => {
    const checkanswer = (result)=>{
        if(result){
            return <span style={{ color: "green" }}>Correct Answer</span>
        }
        return <span style={{ color: "red" }}>Wrong Answer</span>
    }
  return (
    <div
      className="detailedResults"
      style={{ display: displayResults ? "block" : "none" }}
    >
      {results.map((result,index) => {
        return (
          <div className="answer" key={result.question}>
            <p>{index+1} - {result.question}</p>
            <p><span>{result.user_answer}</span>
            {checkanswer(result.result)}</p>
            
            <p>
                  <span style={{ color: "green" }}>Correct Answer</span>
                  <span>: {result.correct_answer}</span>
                </p>
          </div>
        );
      })}
    </div>
  );
};

export default DetailedResults;
