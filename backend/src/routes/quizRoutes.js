const express = require('express');
const { getQuestions, submitAnswers } = require('../controllers/quizController');

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/submit', submitAnswers);

module.exports = router;

// Placeholder
