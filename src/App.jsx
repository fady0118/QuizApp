import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import QuestionsPage from "./Components/QuestionsPage";
import ResultPage from "./Components/ResultPage";

function App() {
  return (
    <Routes>
        <Route index element={<LandingPage/>}></Route>
        <Route path="/Questions" element={<QuestionsPage/>}></Route>
        <Route path="/Result" element={<ResultPage/>}></Route>
        {/* <Route path="/*" element={<FallbackElement/>}></Route> */}
    </Routes>
  );
}

export default App;
