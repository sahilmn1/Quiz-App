// server/routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.post("/create", quizController.createQuiz);
router.get("/all", quizController.getAllQuizzes);
router.get("/:id", quizController.getQuizById);
router.post("/:id/submit", quizController.submitQuiz);
module.exports = router;
