import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { defaultUser } from "./config/defaultUser";

const NewsFeed = React.lazy(() => import("./pages/Newspage/Newspage"));
const Formpage = React.lazy(() => import("./pages/Formpage/Formpage"));

const setupUser = async () => {
  try {
    await fetch("http://localhost:3001/users/delete-by-email", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: defaultUser.email }),
    });

    const roleRes = await fetch("http://localhost:3001/users/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "traveler3", permissions: ["read", "create"] }),
    });
    const roleData = await roleRes.json();

    await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: defaultUser.nickname,
        email: defaultUser.email,
        password: defaultUser.password,
        roleId: roleData.id || 1,
      }),
    });

    const loginRes = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: defaultUser.email, password: defaultUser.password }),
    });
    const loginData = await loginRes.json();

    localStorage.setItem("token", loginData.accessToken);
    return true;
  } catch (e) {
    console.error("Setup error:", e);
    return false;
  }
};

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setupUser().then((success) => setReady(success));
  }, []);

  if (!ready) return <div>Завантаження...</div>;

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Новини</Link>
        <Link to="/create" className="nav-link">Створити пост</Link>
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
