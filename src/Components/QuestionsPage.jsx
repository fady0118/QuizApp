import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import ResultPage from "./ResultPage";
import "./css/Questions.css";

const decodeHtmlEntities = (str) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
};

const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, questionsNum, operation } = location.state || {};
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      const apiUrl =
        `https://opentdb.com/api.php?amount=${questionsNum}&category=19&difficulty=medium&type=multiple`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
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
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.target);
    const userAnswers = questions.map((question) => {
      return {
        question: question.question,
        selectedAnswer: formData.get(question.question),
      };
    });
    navigate("/Result", {
      state: { answers: userAnswers, questions: questions },
    });
  };
  return (
    // <form className="QuestionCard"></form>
    <form onSubmit={(event) => handleSubmit(event)} className="questionsList">
      {questions && questions.length > 0 ? (
        questions.map((question, index) => (
          <QuestionCard question={question} key={index} />
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      <button type="submit" value="submit">
        Submit
      </button>
    </form>
  );
};

export default QuestionsPage;
