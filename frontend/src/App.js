import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const NewsFeed = React.lazy(() => import('./pages/Newspage/Newspage'));
const Formpage = React.lazy(() => import('./pages/Formpage/Formpage'));

const App = () => (
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

export default App;
