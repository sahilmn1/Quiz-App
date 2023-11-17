// src/components/QuizTaking.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizTaking = () => {
  const [quiz, setQuiz] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch quiz data from the server
    axios
      .get("/api/quizzes/123") // Replace '123' with the actual quiz ID
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });
  }, []);

  const handleNextQuestion = () => {
    // Check if the selected answer is correct and update the score
    if (selectedAnswer === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer("");
  };

  return (
    <div>
      <h2>Take Quiz</h2>
      {currentQuestionIndex < quiz.questions.length ? (
        <div>
          <p>{quiz.questions[currentQuestionIndex].question}</p>
          <ul>
            {quiz.questions[currentQuestionIndex].options.map(
              (option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => setSelectedAnswer(option)}
                    />
                    {option}
                  </label>
                </li>
              )
            )}
          </ul>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      ) : (
        <div>
          <h3>Quiz Completed!</h3>
          <p>
            Your Score: {score} / {quiz.questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizTaking;
