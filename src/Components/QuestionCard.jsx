import React, { memo } from "react";
import "./css/Questions.css";
const QuestionCard = ({ question, userAnswer, onAnswer }) => {
  const allAnswers = [...question.incorrect_answers, question.correct_answer];
  const handleOptionChange = (event) => {
    onAnswer(event.target.value);
  };
  return (
    <div className="questionBody">
      <div >{question.question}</div>
      {allAnswers.map((answer, index) => {
        return (
          <div className="answerRadio" key={index}>
            <input
              type="radio"
              name={question.question}
              id={`answer-${index}`}
              value={answer}
              checked={userAnswer === answer}
              onChange={(e) => handleOptionChange(e)}
            ></input>
            <label htmlFor={`answer-${index}`}>{answer}</label>
          </div>
        );
      })}
    </div>
  );
};

export default memo(QuestionCard);
