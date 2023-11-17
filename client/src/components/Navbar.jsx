import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = ({ userRole, handleLogout }) => {
  const isLoggedIn = !!userRole;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fa-solid fa-desktop space"></i>
          Quiz
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/quizzes">
                <i className="fa-brands fa-searchengin space"></i>
                List Quizzes
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fa-solid fa-right-to-bracket space"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <i className="fa-solid fa-user-plus space"></i>
                    Signup
                  </Link>
                </li>
              </>
            )}

            {userRole === "user" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  User Panel
                </Link>
              </li>
            )}
            {userRole === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="fa-solid fa-lock space"></i>
                  Admin Panel
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
