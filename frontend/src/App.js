import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import setupUser from "./components/SetupUser/SetupUser";

const NewsFeed = React.lazy(() => import("./pages/Newspage/Newspage"));
const Formpage = React.lazy(() => import("./pages/Formpage/Formpage"));

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setupUser().then((success) => setReady(success));
  }, []);

  if (!ready) return <div>Завантаження...</div>;

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">News</Link>
        <Link to="/create" className="nav-link">Create post</Link>
      </nav>
      <Suspense fallback={<div>Завантаження сторінки...</div>}>
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/create" element={<Formpage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
