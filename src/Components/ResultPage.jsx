import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailedResults from "./DetailedResults";
import QuizResultCard from "./QuizResultCard";
import "./css/results.css";

import { ref,push } from "firebase/database";
import { database } from "../config/firebase";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, category, answers, questions, timeleft, allowedTime } =
    location.state || {};
  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState([]);

  const numberOfQuestions = questions.length;
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [grade, setGrade] = useState(0);
  const [timeFactor, setTimeFactor] = useState(0);
  const [initialTimestamp] = useState(new Date().toLocaleString());
  const [resultObject, setResultObject] = useState({});

  const checkAnswer = (question, selectedAnswer) => {
    if (selectedAnswer === question.correct_answer) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    const newResults = questions.map((question) => {
      return {
        question: question.question,
        correct_answer: question.correct_answer,
        user_answer: answers[question.question],
        result: checkAnswer(question, answers[question.question]),
      };
    });
    setResults(newResults);
  }, [questions, answers]);

  useEffect(() => {
    let numOfCorrectAnswers = results.reduce(
      (accumulator, result) => accumulator + (result.result ? 1 : 0),
      0
    );
    setNumberOfCorrectAnswers(numOfCorrectAnswers);
  }, [results]);

  useEffect(() => {
    const scaleFactor = 100;
    setTimeFactor(timeleft / allowedTime);
    // const timeFactor = (timeleft / allowedTime);
    const answersFactor = numberOfCorrectAnswers / numberOfQuestions;
    // Grade = constant × (Correct Answers / Total Questions) × (1 + (Time Factor × 0.25))
    const Grade = scaleFactor * answersFactor * (1 + 0.25 * timeFactor);
    setGrade(Grade);
  }, [numberOfCorrectAnswers]);

  useEffect(() => {
      const ResultObject = {
        userName: userName,
        category: category,
        grade: grade,
        timeFactor: timeFactor,
        numberOfQuestions: questions.length,
        numOfCorrectAnswers: numberOfCorrectAnswers,
        timestamp: initialTimestamp,
        results: results,
      };
      setResultObject(ResultObject);
  }, [userName, grade, category, results]);
  
  const saveResult = (result)=>{
    console.log('saveResultInvoked')
    const resultsRef = ref(database, "results"); // "results" is the node in the database
    push(resultsRef, result)
    .then(()=>console.log('Result saved successfully'))
    .catch((error)=>console.error('error saving result', error))
    navigate('/Leaderboard');
  };

  return (
    <div className="resultPage">
      <QuizResultCard Result={resultObject} saveResult={saveResult}/>
      <button style={{}} className="Qbutton" onClick={() => setDisplayResults((prevState) => !prevState)}>
        {displayResults ? <div>Hide Results</div>: <div>Display Results</div>}
      </button>
      <DetailedResults results={results} displayResults={displayResults} />
    </div>
  );
};

export default ResultPage;
