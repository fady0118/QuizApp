import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import ResultPage from "./ResultPage";
import "./css/Questions.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const decodeHtmlEntities = (str) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
};

const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, questionsNum, operation } = location.state || {};
  console.log(userName, questionsNum, operation);
  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const apiUrl = `https://opentdb.com/api.php?amount=${questionsNum}&category=${operation}&type=multiple`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.results);
        const decodedData = decodeQuestions(data.results);
        setQuestions(decodedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const decodeQuestions = (questionsData) => {
    const decodedQuestions = questionsData.map((question) => {
      const decodedQuestion = {
        ...question,
        question: decodeHtmlEntities(question.question),
        correct_answer: decodeHtmlEntities(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map((incorrect_answer) =>
          decodeHtmlEntities(incorrect_answer)
        ),
      };
      return decodedQuestion;
    });
    return decodedQuestions;
  };

  const handleSubmit = (event) => {
    navigate("/Result", {
      state: { answers: userAnswers, questions: questions },
    });
  };

  const handleAnswer = (question, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };
  const handleSkip = () => {
    handleNext();
  };

  return (
    <div className="questionsPage">
      <div className="questionsMap">
        {Array.from({ length: questionsNum }, (_, i) => (
          <div
            key={i}
            className="questionMapElement"
            onClick={() => setCurrentIndex(i)}
          >
            {questions[i] && userAnswers[questions[i].question]?<FaCheckCircle style={{ color: "green"}}/>:<FaRegCheckCircle/>}question-{i + 1}
          </div>
        ))}
      </div>
      <div className="questionContainer">
        {questions && questions.length > 0 ? (
          <>
            <QuestionCard
              question={questions[currentIndex]}
              userAnswer = {userAnswers[questions[currentIndex].question]}
              onAnswer={(answer) => {
                handleAnswer(questions[currentIndex].question, answer);
              }}
            />

            {currentIndex <= questions.length - 2 ? (
              <>
                {questions[currentIndex] &&
                userAnswers[questions[currentIndex].question] ? (
                  <button className="button" onClick={handleNext}>Next</button>
                ) : (
                  <button className="button" onClick={handleSkip}>Skip</button>
                )}
              </>
            ) : (
              <>
                <button className="button" onClick={handleSubmit}>Submit</button>
              </>
            )}
          </>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
