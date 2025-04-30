import React from "react";
import "./css/pagination.css";

const Pagination = ({
  questions,
  userAnswers,
  questionsnum,
  selectQuestion,
  currentIndex,
}) => {
  const handleBack = () => {
    if (currentIndex > 0) selectQuestion(currentIndex - 1);
  };

  const handleForth = () => {
    if (currentIndex < questionsnum-1) selectQuestion(currentIndex + 1);
  };

  const getMiddlePages = () => {
    const pages = [];
    if (currentIndex > 0) pages.push(currentIndex - 1);
    pages.push(currentIndex);
    if (currentIndex < questionsnum-1) pages.push(currentIndex + 1);
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagediv" onClick={handleBack}>
        {"<"}
      </div>
      
      {getMiddlePages().map((page) => (
        <div key={page} className={`pagediv ${currentIndex === page ? "active" : ""} ${questions[page] && userAnswers[questions[page].question]?'answered':''}`} onClick={() => selectQuestion(page)}>{page+1}</div>
      ))}
<div className="pagediv" onClick={handleForth}>
        {">"}
      </div>
      {/* {Array.from({ length: questionsnum }, (_, index) => (
        <div
          key={index}
          className={`${currentIndex === index ? "active" : ""} ${questions[index] && userAnswers[questions[index].question]?'answered':''}`}
          onClick={() => selectQuestion(index)}
        >
          {index + 1}
        </div>
      ))} */}
    </div>
  );
};

export default Pagination;
