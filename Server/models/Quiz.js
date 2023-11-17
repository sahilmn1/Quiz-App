// server/models/Quiz.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Change the type to Number
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [questionSchema],
  },
  { collection: "quizzes" }
); // Specify the collection name

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
