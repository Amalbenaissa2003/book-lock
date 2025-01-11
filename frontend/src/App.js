// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'; 
import About from './components/About'; 
import AllBooks from "./components/AllBooks";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Accueil</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/register">S'inscrire</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Se connecter</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/allBooks">All Books</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Bienvenue sur le Book Club</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/allBooks" element={<AllBooks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

