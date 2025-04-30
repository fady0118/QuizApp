import React, { memo } from "react";
import "./css/Questions.css";
import borderLine from '../assets/borderLine.png'
import unchecked from '../assets/checkbox-1.png'
import checked from '../assets/checkbox-2.png'

const QuestionCard = ({ question, userAnswer, onAnswer }) => {
  const allAnswers = [...question.incorrect_answers, question.correct_answer];
  const handleOptionChange = (event) => {
    onAnswer(event.target.value);
  };
  return (
    <div className="questionBody">
      <div className="questionHead"><div>{question.question}</div>
      <img src={borderLine} style={{width:'95%',height:'1.2rem'}} alt="" /></div>
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
