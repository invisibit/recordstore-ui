import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Mymusic from './components/Mymusic'


function App() {

  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">
            You emotionally unsatisfied hipster record store clerk
          </h1>
          <hr className="mb-3"></hr>
        </div>
        <div className="row">

          <div className="col-md-10">
            <Routes>
              <Route path="/Mymusic" element={<Mymusic />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
