import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../assets/css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const QuizPlay = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:7860/api/quizzes/${id}`)
      .then((response) => {
        setQuiz(response.data);
        setSelectedAnswers(
          new Array(response.data.questions.length).fill(null)
        );
        setCorrectAnswers(response.data.questions.map((q) => q.correctAnswer));
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });
  }, [id]);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmitQuiz = () => {
    // Check if any question is unanswered
    if (selectedAnswers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Proceed with submitting the quiz
    axios
      .post(`http://localhost:7860/api/quizzes/${id}/submit`, {
        selectedAnswers,
      })
      .then((response) => {
        setScore(response.data.score);
        setShowModal(true); // Show the modal when the score is available
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div className="container margin-top">
      <div className="card p-4">
        <div
          onClick={handleGoBack}
          style={{ cursor: "pointer" }}
          className="justify-content-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="1.5x" color="black" />
          Go Back
        </div>
        {/* <h2>{quiz.title}</h2>
        <p>{quiz.description}</p> */}
        <h3>Question - {currentQuestion + 1}</h3>

        <div className="mb-3">
          <h2 className="color-text">{currentQuestionData.question}</h2>
          <ul className="list-group">
            {currentQuestionData.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                className={`list-group-item  ${
                  selectedAnswers[currentQuestion] === optionIndex
                    ? "selected-option"
                    : ""
                }`}
              >
                <label className="text">
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswers[currentQuestion] === optionIndex}
                    onChange={() =>
                      handleOptionSelect(currentQuestion, optionIndex)
                    }
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {score !== null && (
          <div className="mb-3">
            <p className="text correct-answer">
              Correct Answer:{" "}
              {currentQuestionData.options[correctAnswers[currentQuestion]]}
            </p>
          </div>
        )}

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNextQuestion}
            disabled={currentQuestion === quiz.questions.length - 1}
          >
            Next
          </button>
          <button className="btn btn-success" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Quiz Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {score !== null && (
              <p className="mt-3 text">Your Score: {score.toFixed(2)}%</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default QuizPlay;
