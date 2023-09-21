import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import Home from "./components/Home";
import List from "./components/List";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" component={Home} />
                <Route path="/list" component={List} />
            </Routes>
        </Router>
    );
};
export default App;
