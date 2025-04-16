import React from "react";
import "./css/Questions.css";
const QuestionCard = ({ question }) => {
  const allAnswers = [...question.incorrect_answers, question.correct_answer];

  return (
    <>
      <div className="questionBody">{question.question}</div>
      {allAnswers.map((answer, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              name={question.question}
              id={`answer-${index}`}
              value={answer}
            ></input>
            <label htmlFor={`answer-${index}`}>{answer}</label>
          </div>
        );
      })}
    </>
  );
};

export default QuestionCard;
