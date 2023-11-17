import React, { useState } from "react";
import axios from "axios";
import "../assets/css/Home.css";
const QuizCreation = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ],
  });
  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuiz = { ...quiz };
    updatedQuiz.questions.splice(questionIndex, 1);
    setQuiz(updatedQuiz);
  };

  const handleAddQuestion = () => {
    const updatedQuiz = { ...quiz };
    updatedQuiz.questions.push({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setQuiz(updatedQuiz);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuiz = { ...quiz };
    updatedQuiz.questions[questionIndex].options.push("");
    setQuiz(updatedQuiz);
  };

  const handleSaveQuiz = () => {
    axios
      .post("http://localhost:7860/api/quizzes/create", quiz)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error creating quiz:", error);
      });
  };

  return (
    <div className="container margin-top">
      <h2>Create a Quiz</h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        />
      </div>

      {quiz.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <label
            htmlFor={`question${questionIndex + 1}`}
            className="form-label"
          >
            Question {questionIndex + 1}:
          </label>
          <input
            type="text"
            className="form-control"
            id={`question${questionIndex + 1}`}
            value={question.question}
            onChange={(e) => {
              const updatedQuiz = { ...quiz };
              updatedQuiz.questions[questionIndex].question = e.target.value;
              setQuiz(updatedQuiz);
            }}
          />

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-2">
              <label
                htmlFor={`option${optionIndex + 1}`}
                className="form-label"
              >
                Option {optionIndex + 1}:
              </label>
              <input
                type="text"
                className="form-control"
                id={`option${optionIndex + 1}`}
                value={option}
                onChange={(e) => {
                  const updatedQuiz = { ...quiz };
                  updatedQuiz.questions[questionIndex].options[optionIndex] =
                    e.target.value;
                  setQuiz(updatedQuiz);
                }}
              />
            </div>
          ))}

          <label
            htmlFor={`correctAnswer${questionIndex + 1}`}
            className="form-label"
          >
            Correct Answer (Index):
          </label>
          <input
            type="number"
            className="form-control"
            id={`correctAnswer${questionIndex + 1}`}
            value={question.correctAnswer}
            onChange={(e) => {
              const updatedQuiz = { ...quiz };
              updatedQuiz.questions[questionIndex].correctAnswer = parseInt(
                e.target.value,
                10
              );
              setQuiz(updatedQuiz);
            }}
          />

          <button
            className="btn btn-primary mt-2 space"
            onClick={() => handleAddOption(questionIndex)}
          >
            Add Option
          </button>
          <button
            className="btn btn-danger mt-2"
            onClick={() => handleRemoveQuestion(questionIndex)}
          >
            Remove Question
          </button>
        </div>
      ))}

      <button className="btn btn-primary" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button className="btn btn-success ms-2" onClick={handleSaveQuiz}>
        Save Quiz
      </button>
    </div>
  );
};

export default QuizCreation;
