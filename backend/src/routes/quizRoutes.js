const express = require('express');
const { getQuestions, submitAnswers, startQuiz, getLeaderboard, postLeaderboard } = require('../controllers/quizController');

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/submit', submitAnswers);

// New structured routes under /api/quiz/*
router.post('/quiz/start', startQuiz);
router.get('/quiz/questions', getQuestions);
router.post('/quiz/submit', submitAnswers);
router.get('/quiz/leaderboard', getLeaderboard);
router.post('/quiz/leaderboard', postLeaderboard);

module.exports = router;

// Placeholder
