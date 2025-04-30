import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LandingPage.css";
import { PiStarFourFill } from "react-icons/pi";
import starEdge from "../assets/starIMG.png";

const LandingPage = () => {
  const [userName, setUserName] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [selectedCategory, setSelectedOperation] = useState("");

  const Category = {
      "Art":25,
      "Music": 12,
      "Science: Computers":18,
      "Science: Mathematics":19,
      "Japanese Anime & Manga": 31,
      "Mythology":20,
      "Video Games": 15,
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(userName && selectedCategory){
      navigate("/Questions", {
      state: {
        userName: userName,
        questionsNum: numOfQuestions,
        categoryCode: selectedCategory,
        categoryName: Object.keys(Category).find(key=>Category[key] == selectedCategory),
      },
    });
    setUserName("");
    setNumOfQuestions(0);
    setSelectedOperation("");
    }else{
      const FormElements = document.querySelectorAll('.LandingContainer label');
      let user_operation = [...FormElements];
      user_operation.splice(1,1);
      user_operation.forEach(element=>element.style.color='#ffeeae')
    }
    
  };
  return (
    <form className="LandingContainer" onSubmit={(e) => handleSubmit(e)}>
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
      <label>
        Enter User Name
        <div className="inputdiv">
          <input
            type="text"
            value={userName}
            id="username"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="..."
          />
          {/* <CiUser /> */}
        </div>
      </label>
      <label>
        Enter Number Of Questions
        <div className="inputdiv">
        <select
          name="questions"
          id="questions"
          className="input droplist"
          value={numOfQuestions}
          onChange={(e) => setNumOfQuestions(e.target.value)}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        </div>
      </label>
      <label>
        Select Quiz Type
        <div className="inputdiv">
        <select
          className="input droplist"
          name="operations"
          id="operations"
          onChange={(e) => setSelectedOperation(e.target.value)}
        >
          <option value="" selected hidden disabled>
          ...
          </option>
          
          {Object.entries(Category).map(([key, value])=>(
            <option key={key} value={value}>{key}</option>
          ))
          }
        </select>
        </div>
      </label>
      
      <button className="button" type="submit">
        <span style={{position:"relative",zIndex:1}}>Submit</span>
        {/* Submit */}
        {/* <div className="star star-1">
          <PiStarFourFill />
        </div>
        <div className="star star-2">
          <PiStarFourFill />
        </div>
        <div className="star star-3">
          <PiStarFourFill />
        </div>
        <div className="star star-4">
          <PiStarFourFill />
        </div>
        <div className="star star-5">
          <PiStarFourFill />
        </div> */}
      </button>
    </form>
  );
};

export default LandingPage;
