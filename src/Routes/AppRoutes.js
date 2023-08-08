import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Home from "../Components/Home";
import AnswerProvided from "../Components/AnswerProvided";
import AnswerQuestion from "../Components/AnswerQuestion";
import User from "../Components/User";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/answerProvided" element={<AnswerProvided />} />
                <Route path="/answerQuestion" element={<AnswerQuestion />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;