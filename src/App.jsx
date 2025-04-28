import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import QuestionsPage from "./Components/QuestionsPage";
import ResultPage from "./Components/ResultPage";
import LeaderboardPage from './Components/LeaderboardPage';
import { WiDayCloudy } from "react-icons/wi";

function App() {
  return (
    <>
    <nav>
      <ul>
        <Link className="navitem" to={{pathname:'/'}}><img style={{width:'4.5rem',height:'2.8rem'}} src='src\assets\logo-wp.png'></img></Link>
        <Link className="navitem" to={{pathname:'/Leaderboard'}}>LeaderBoard</Link>
      </ul>
    </nav>
    <Routes>
        <Route index element={<LandingPage/>}></Route>
        <Route path="/Questions" element={<QuestionsPage/>}></Route>
        <Route path="/Result" element={<ResultPage/>}></Route>
        <Route path="/Leaderboard" element={<LeaderboardPage/>}></Route>
        {/* <Route path="/*" element={<FallbackElement/>}></Route> */}
    </Routes>
    </>
  );
}

export default App;
