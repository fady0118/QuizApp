import React, { memo } from "react";
import "./css/Questions.css";
import borderLine from '../assets/borderLine.png'
import unchecked from '../assets/unchecked-l.png'
import checked from '../assets/checked-l.png'

const QuestionCard = ({ question, userAnswer, onAnswer }) => {
  const allAnswers = [...question.incorrect_answers, question.correct_answer];
  const handleOptionChange = (event) => {
    onAnswer(event.target.value);
  };
  return (
    <div className="questionBody">
      <div className="containerHead"><div>{question.question}</div>
      <img src={borderLine} style={{width:'95%',}} alt="" /></div>
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
            <label htmlFor={`answer-${index}`}>
            {userAnswer===answer?<img style={{width:'1rem',height:'1rem'}} src={checked}></img>:<img style={{width:'1rem',height:'1rem'}} src={unchecked}></img>}
              <span style={{zIndex:'1'}}>{answer}</span>
              <div style={{width:'1rem'}}></div>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default memo(QuestionCard);
