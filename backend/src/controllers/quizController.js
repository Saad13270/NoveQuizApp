const { Quiz } = require('../db');

async function getQuestions(req, res) {
	try {
		const quizzes = await Quiz.findAll({
			attributes: ['id', 'question', 'options', 'category', 'difficulty'],
			limit: 10,
			order: [['id', 'ASC']],
		});
		return res.json(quizzes.map((q) => ({
			id: q.id,
			question: q.question,
			options: Array.isArray(q.options) ? q.options : [],
			category: q.category,
			difficulty: q.difficulty,
		})));
	} catch (err) {
		return res.status(500).json({ error: 'Failed to fetch questions' });
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

module.exports = { getQuestions, submitAnswers };

// Placeholder
