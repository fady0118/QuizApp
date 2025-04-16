import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./css/LandingPage.css";
import { CiUser } from "react-icons/ci";

const LandingPage = () => {
  const [userName, setUserName] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState("");

  const operations = [
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
    "All",
  ];

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/Questions", {
      state: {
        userName: userName,
        questionsNum: numOfQuestions,
        operation: selectedOperation,
      },
    });
    setUserName("");
    setNumOfQuestions(0);
    setSelectedOperation("");
  };
  return (
    <form className="LandingContiner" onSubmit={(e) => handleSubmit(e)}>
      <label>
        Enter User Name
        <div className="input">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name..."
          />
          <CiUser />
        </div>
      </label>
      <label>
        Enter Number Of Questions
        <input
          className="input"
          type="number"
          name="questions"
          id="questions"
          value={numOfQuestions}
          onChange={(e) => setNumOfQuestions(e.target.value)}
        />
      </label>
      <label>
        Select Math Operation
        <select
          className="input"
          name="operations"
          id="operations"
          onChange={(e) => setSelectedOperation(e.target.value)}
        >
          <option value="" hidden disabled>
            select math operation
          </option>
          {operations.map((operation,index) => {
            return <option key={index} value={operation}>{operation}</option>;
          })}
        </select>
      </label>
      {/* <button type="submit">Submit</button> */}
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default LandingPage;
