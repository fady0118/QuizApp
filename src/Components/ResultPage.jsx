import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const { answers, questions } = location.state || {};
  const numberOfQuestions = questions.length;
  console.log("numberOfQuestions", numberOfQuestions);
  const checkAnswer = (question, selectedAnswer) => {
    console.log(question);
    console.log(selectedAnswer);
    if (selectedAnswer.selectedAnswer === question.correct_answer) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="resultPage">
      {questions.map((question,index) => {
        const questionResult = checkAnswer(
          question,
          answers[index],
        );
        return (
          <div className="answer" key={question.question}>
            <p>{question.question}</p>
            <p>{answers[index].selectedAnswer}</p>
            {questionResult ? (
              <p style={{ color: "green" }}>Correct Answer</p>
            ) : (
              <>
                <p style={{ color: "red" }}>Wrong Answer</p>
                <p>
                  <span style={{ color: "green" }}>Correct Answer</span>
                  <span>: {question.correct_answer}</span>
                </p>
              </>
            )}
          </div>
        );
        // console.log(answers.find(answer=>answer.question === question.question))
      })}
    </div>
  );
};

export default ResultPage;
