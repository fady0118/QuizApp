import React, { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import "./css/Questions.css";
import Timer from "./Timer";
import { useRef } from "react";

import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import starEdge from "../assets/starIMG.png";
import XYZ from "../assets/XYZ.png";
import borderLine from "../assets/borderLine.png";
import loadingImg from '../assets/loading.png'

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
        // console.log(data.results);
        if (data.results) {
          const decodedData = decodeQuestions(data.results);
          setQuestions(decodedData);
        }
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

  const handleSubmit = () => {
    navigate("/Result", {
      state: {
        userName: userName,
        categoryName: categoryName,
        questionsNum: questionsNum, 
        categoryCode: categoryCode,
        answers: userAnswers,
        questions: questions,
        timeleft: timeLeft,
        allowedTime: allowedTime,
      },
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
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width:768px)");
    const handleChange = () => setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    handleChange();

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const sideBarRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const toggleSideBar = () => {
    if (sideBarRef.current) {
      const newTransform = isMoved ? "translateX(100%)" : "translateX(0)";
      sideBarRef.current.style.transform = newTransform;
      setIsMoved(!isMoved);
    }
  };

  return (
    <div className="questionsPage">
      {!isLargeScreen?<div id="sidebarbutton" onClick={toggleSideBar}>
        <HiOutlineMenu fontSize={"1.2rem"} />
      </div>:<></>}
      <div className="questionsMap" ref={!isLargeScreen ? sideBarRef : undefined}>
  {/* Render sidebar toggles only for small screens */}
  {!isLargeScreen && (
    <>
      <div id="closeSideBar" onClick={toggleSideBar}>
        <HiOutlineX fontSize={"1.2rem"} />
      </div>
    </>
  )}

  <div className="questionmapXYZ">
    <img
      src={XYZ}
      style={{
        width: "25%",
        backgroundImage: "radial-gradient(#da9e71cd 0%, transparent 75%)",
      }}
    />
    <img src={borderLine} style={{ width: "90%", marginTop: "0.25rem" }} />
  </div>

  <div className="questionMapBox">
    {Array.from({ length: questionsNum }, (_, i) => (
      <div
        key={i}
        className={`questionMapElement ${
          currentIndex === i ? "active-question" : ""
        }`}
        onClick={() => setCurrentIndex(i)}
      >
      <div id="qMapElemCont">
        {questions[i] && userAnswers[questions[i].question] ? (
          <AiFillLike style={{ transform: "scale(1.2)" }} />
        ) : (
          <AiFillLike fill="transparent" />
        )}
        question-{i + 1}
        </div>
      </div>
    ))}
  </div>
</div>

      <div className="questions">
          {questions && questions.length > 0 ? (
            <div className="questionContainer">
              <img
                src={starEdge}
                style={{
                  width: "1rem",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  transform: "rotate(-90deg)",
                }}
              />
              <img
                src={starEdge}
                style={{
                  width: "1rem",
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
              />
              <img
                src={starEdge}
                style={{
                  width: "1rem",
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  transform: "rotate(180deg)",
                }}
              />
              <img
                src={starEdge}
                style={{
                  width: "1rem",
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  transform: "rotate(90deg)",
                }}
              />
              
              <QuestionCard
                question={questions[currentIndex]}
                userAnswer={userAnswers[questions[currentIndex].question]}
                onAnswer={(answer) => {
                  handleAnswer(questions[currentIndex].question, answer);
                }}
              />

              {currentIndex <= questions.length - 2 ? (
                <>
                  {questions[currentIndex] && currentIndex <= 0 ? (
                    <button className="Qbutton" onClick={handleNext}>
                      <div>Next</div>
                    </button>
                  ) : (
                    <div className="controls">
                      <button className="Qbutton" onClick={handleBack}>
                        <div>Back</div>
                      </button>
                      <button className="Qbutton" onClick={handleNext}>
                        <div>Next</div>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button className="Qbutton" onClick={handleSubmit}>
                    <div>Submit</div>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="loadingScreenContainer">
              <img src={loadingImg} alt="" className="loadingscreenImg"/>
              <p>loading questions</p>
            </div>
            
          )}
  
      </div>
      {questions.length > 0 ? (
        <div className="nav_n_time">
          <Timer
            timeLeft={timeLeft}
            allowedTime={allowedTime}
            setLeftTime={setTimeLeft}
            submit={handleSubmit}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuestionsPage;