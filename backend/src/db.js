const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const defineQuizModel = require('./models/Quiz');

const DEFAULT_DB_PATH = './backend/data/dev.sqlite';
const dbPath = process.env.BACKEND_DB_PATH || DEFAULT_DB_PATH;

// Ensure directory exists
const absoluteDbPath = path.isAbsolute(dbPath)
	? dbPath
	: path.resolve(process.cwd(), dbPath);
const dir = path.dirname(absoluteDbPath);
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, { recursive: true });
}

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: absoluteDbPath,
	logging: false,
});

const Quiz = defineQuizModel(sequelize);

async function syncAndSeed() {
	await sequelize.sync();
	const count = await Quiz.count();
	if (count === 0) {
		const sample = [
			{
				question: 'What is the capital of France?',
				options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
				answerIndex: 0,
				category: 'Geography',
				difficulty: 'easy',
			},
			{
				question: 'Which planet is known as the Red Planet?',
				options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
				answerIndex: 2,
				category: 'Science',
				difficulty: 'easy',
			},
			{
				question: 'Who wrote "1984"?',
				options: ['George Orwell', 'Aldous Huxley', 'J.K. Rowling', 'Ernest Hemingway'],
				answerIndex: 0,
				category: 'Literature',
				difficulty: 'medium',
			},
			{
				question: 'What is the smallest prime number?',
				options: ['0', '1', '2', '3'],
				answerIndex: 2,
				category: 'Math',
				difficulty: 'easy',
			},
			{
				question: 'HTTP status 404 means?',
				options: ['OK', 'Not Found', 'Forbidden', 'Bad Request'],
				answerIndex: 1,
				category: 'Web',
				difficulty: 'easy',
			},
			{
				question: 'Who painted the Mona Lisa?',
				options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'],
				answerIndex: 1,
				category: 'Art',
				difficulty: 'easy',
			},
			{
				question: 'The chemical symbol for Gold is?',
				options: ['Ag', 'Au', 'Gd', 'Go'],
				answerIndex: 1,
				category: 'Science',
				difficulty: 'easy',
			},
			{
				question: 'In computing, what does CPU stand for?',
				options: [
					'Central Processing Unit',
					'Computer Primary Unit',
					'Central Peripheral Unit',
					'Core Processing Utility',
				],
				answerIndex: 0,
				category: 'Technology',
				difficulty: 'easy',
			},
			{
				question: 'Which language runs in a web browser?',
				options: ['Python', 'C++', 'Java', 'JavaScript'],
				answerIndex: 3,
				category: 'Technology',
				difficulty: 'easy',
			},
			{
				question: 'What year did the first man land on the moon?',
				options: ['1965', '1969', '1972', '1959'],
				answerIndex: 1,
				category: 'History',
				difficulty: 'medium',
			},
		];

		await Quiz.bulkCreate(sample);
	}
}

module.exports = { sequelize, Quiz, syncAndSeed };

// Placeholder
