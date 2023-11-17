// src/App.js
import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import QuizCreation from "./components/QuizCreation";
import QuizTaking from "./components/QuizTaking";
import QuizResults from "./components/QuizResults";
import QuizList from "./components/QuizList";
import Auth from "./components/Auth";
import QuizPlay from "./components/QuizPlay";
import Navbar from "./components/Navbar";
import QuizDetail from "./components/QuizDetail";
import Login from "./components/Login";
import Signup from "./components/RegistrationForm";
import AdminPage from "./components/Admin";
import User from "./components/User";
const App = () => {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  const handleLogout = () => {
    setUserRole("");

    localStorage.removeItem("userRole");
  };

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  return (
    <div>
      <Navbar userRole={userRole} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<QuizCreation />} />
        <Route path="/take" element={<QuizTaking />} />
        <Route path="/results" element={<QuizResults />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/play/:id" element={<QuizPlay />} />
        <Route component={() => <div>Page Not Found</div>} />

        <Route
          path="/dashboard"
          element={
            userRole === "user" ? (
              <User />
            ) : userRole === "admin" ? (
              <AdminPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
