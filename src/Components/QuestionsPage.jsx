import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import ResultPage from "./ResultPage";
import "./css/Questions.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import Timer from "./Timer";

const decodeHtmlEntities = (str) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
};

const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, questionsNum, categoryCode, categoryName } =
    location.state || {};
  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const allowedTime = questionsNum * 30 * 1000; // quiz time in milliseconds
  const [timeLeft, setTimeLeft] = useState(allowedTime);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const apiUrl = `https://opentdb.com/api.php?amount=${questionsNum}&category=${categoryCode}&type=multiple`;
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

  const handleSubmit = useCallback(() => {
    navigate("/Result", {
      state: {
        userName: userName,
        category: categoryName,
        answers: userAnswers,
        questions: questions,
        timeleft: timeLeft,
        allowedTime: allowedTime,
      },
    });
  }, [userAnswers, questions]);

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
  useEffect(()=>{
    const mediaQuery = window.matchMedia('(min-width:768px)');
    const handleChange = () => setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    handleChange();

    return ()=> mediaQuery.removeEventListener('change', handleChange);
  },[])
  return (
    <div className="questionsPage">
      
      <div className="questions">
        <div className="questionContainer">
          {questions && questions.length > 0 ? (
            <>
              <QuestionCard
                question={questions[currentIndex]}
                userAnswer={userAnswers[questions[currentIndex].question]}
                onAnswer={(answer) => {
                  handleAnswer(questions[currentIndex].question, answer);
                }}
              />

              {currentIndex <= questions.length - 2 ? (
                <>
                  {questions[currentIndex] &&
                  userAnswers[questions[currentIndex].question] ? (
                    <button className="button" onClick={handleNext}>
                      Next
                    </button>
                  ) : (
                    <button className="button" onClick={handleSkip}>
                      Skip
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button className="button" onClick={handleSubmit}>
                    Submit
                  </button>
                </>
              )}
            </>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      </div>
      <div className="nav_n_time">
        <Timer
        timeLeft={timeLeft}
        allowedTime={allowedTime}
        setLeftTime={setTimeLeft}
        submit={handleSubmit}
      />
      <div className="questionsMap">
        
        {Array.from({ length: questionsNum }, (_, i) => (
          <div
            key={i}
            className={`questionMapElement ${
              currentIndex === i ? "active-question" : ""
            }`}
            onClick={() => setCurrentIndex(i)}
          >
            {questions[i] && userAnswers[questions[i].question] ? (
              <FaCheckCircle style={{ color: "#7d6aee" }} />
            ) : (
              <FaRegCheckCircle />
            )}
            question-{i + 1}
          </div>
        ))}
      </div>
      </div>
      
    </div>
  );
};

export default QuestionsPage;
