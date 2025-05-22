import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewsFeed from "./pages/Newspage/Newspage";
import Formpage from "./pages/Formpage/Formpage";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Новини</Link>
        <Link to="/create" className="nav-link">Створити пост</Link>
      </nav>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/create" element={<Formpage />} />
      </Routes>
    </Router>
  );
}

export default App;
