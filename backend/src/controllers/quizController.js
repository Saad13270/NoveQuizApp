const { Quiz } = require('../db');

async function getQuestions(req, res) {
	try {
		const quizzes = await Quiz.findAll({
			attributes: ['id', 'question', 'options', 'category', 'difficulty'],
			limit: 10,
			order: [['id', 'ASC']],
		});
		const items = quizzes.map((q) => ({
			id: q.id,
			question: q.question,
			options: Array.isArray(q.options) ? q.options : [],
			category: q.category,
			difficulty: q.difficulty,
		}));
		if (!items.length) {
			// Fallback dummy data if DB empty
			return res.json(getDummyQuestions());
		}
		return res.json(items);
	} catch (err) {
		// Fallback dummy data if DB error
		return res.json(getDummyQuestions());
	}
}

async function submitAnswers(req, res) {
	try {
		const { answers } = req.body || {};
		if (!Array.isArray(answers)) {
			return res.status(400).json({ error: 'Invalid payload: answers must be an array' });
		}
		const ids = answers
			.filter((a) => a && Number.isInteger(a.id) && Number.isInteger(a.selectedIndex))
			.map((a) => a.id);
		if (ids.length === 0) {
			return res.status(400).json({ error: 'No valid answers provided' });
		}
		const quizzes = await Quiz.findAll({ where: { id: ids } });
		let score = 0;
		const correctIds = [];
		const quizMap = new Map(quizzes.map((q) => [q.id, q]));
		for (const a of answers) {
			const q = quizMap.get(a.id);
			if (!q) continue;
			if (a.selectedIndex === q.answerIndex) {
				score += 1;
				correctIds.push(q.id);
			}
		}
		return res.json({ score, total: answers.length, correctIds });
	} catch (err) {
		return res.status(500).json({ error: 'Failed to submit answers' });
	}
}

// Simple in-memory leaderboard (ephemeral)
const leaderboard = [];

function startQuiz(req, res) {
	const { username = 'Guest' } = req.body || {};
	return res.json({ message: 'Quiz started', username, startedAt: Date.now() });
}

function getLeaderboard(_req, res) {
	const top = leaderboard
		.sort((a, b) => b.score - a.score)
		.slice(0, 20);
	return res.json(top);
}

function postLeaderboard(req, res) {
	const { username = 'Guest', score = 0, total = 0 } = req.body || {};
	leaderboard.push({ username, score, total, at: Date.now() });
	return res.status(201).json({ ok: true });
}

function getDummyQuestions() {
	return [
		{ id: 1001, question: 'Dummy: 2 + 2 = ?', options: ['3', '4', '5', '6'], category: 'Math', difficulty: 'easy' },
		{ id: 1002, question: 'Dummy: Capital of Italy?', options: ['Paris', 'Rome', 'Berlin', 'Madrid'], category: 'Geography', difficulty: 'easy' },
		{ id: 1003, question: 'Dummy: H2O is?', options: ['Oxygen', 'Hydrogen', 'Water', 'Helium'], category: 'Science', difficulty: 'easy' },
		{ id: 1004, question: 'Dummy: HTML stands for?', options: ['HighText', 'HyperText Markup Language', 'HotMail', 'HowTo Make Language'], category: 'Technology', difficulty: 'easy' },
		{ id: 1005, question: 'Dummy: 5 * 6 = ?', options: ['30', '11', '56', '28'], category: 'Math', difficulty: 'easy' },
		{ id: 1006, question: 'Dummy: Color of sky?', options: ['Blue', 'Green', 'Red', 'Yellow'], category: 'General', difficulty: 'easy' },
		{ id: 1007, question: 'Dummy: Sun rises in?', options: ['North', 'South', 'East', 'West'], category: 'General', difficulty: 'easy' },
		{ id: 1008, question: 'Dummy: JS runs in?', options: ['Browser', 'Microwave', 'TV only', 'None'], category: 'Technology', difficulty: 'easy' },
		{ id: 1009, question: 'Dummy: 10/2 = ?', options: ['2', '3', '4', '5'], category: 'Math', difficulty: 'easy' },
		{ id: 1010, question: 'Dummy: Earth is a?', options: ['Star', 'Planet', 'Comet', 'Asteroid'], category: 'Science', difficulty: 'easy' },
	];
}

module.exports = { getQuestions, submitAnswers, startQuiz, getLeaderboard, postLeaderboard };

// Placeholder
