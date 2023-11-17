// server/controllers/quizController.js
const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const newQuiz = new Quiz({
      title,
      description,
      questions,
    });

    await newQuiz.save();

    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, "title description");
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getQuizById = async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findById(quizId);
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.submitQuiz = async (req, res) => {
  const { id } = req.params;
  const { selectedAnswers } = req.body;

  try {
    // Fetch the quiz to get correct answers
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Calculate the score based on selected and correct answers
    let score = 0;
    quiz.questions.forEach((question, index) => {
      const correctAnswerIndex = question.options.findIndex(
        (option, optionIndex) => optionIndex === question.correctAnswer
      );

      if (selectedAnswers[index] === correctAnswerIndex) {
        score++;
      }
    });

    // Ensure the score is limited to 100%
    const percentageScore = Math.min(
      (score / quiz.questions.length) * 100,
      100
    );

    res.json({ score: percentageScore });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
