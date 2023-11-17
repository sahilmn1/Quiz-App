import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Home.css"; // Import the custom CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="welcome-heading">Welcome to the Quiz Player!</h2>
      <div className="button-container">
        {/* <Link to="/create" className="quiz-button">
          Create Quiz
        </Link> */}
        <Link to="/quizzes" className="quiz-button">
          Take Quiz
        </Link>
      </div>
    </div>
  );
};

export default Home;
