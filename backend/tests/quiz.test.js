const request = require('supertest');
const path = require('path');

// Point DB to a temp test file to avoid clobbering dev DB
process.env.BACKEND_DB_PATH = path.resolve(__dirname, '../data/test.sqlite');

process.env.NODE_ENV = 'test';
const { syncAndSeed } = require('../src/db');
const app = require('../src/index');

describe('NovaQuiz API', () => {
	beforeAll(async () => {
		await syncAndSeed();
	});
	test('GET /api/questions returns array with required fields', async () => {
		const res = await request(app).get('/api/questions');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBeGreaterThanOrEqual(8);
		const first = res.body[0];
		expect(first).toHaveProperty('id');
		expect(first).toHaveProperty('question');
		expect(first).toHaveProperty('options');
		expect(Array.isArray(first.options)).toBe(true);
	});

	test('POST /api/submit returns score and total', async () => {
		// Get questions to craft an answers payload
		const qRes = await request(app).get('/api/questions');
		const questions = qRes.body;
		const answers = questions.slice(0, 5).map((q, idx) => ({
			id: q.id,
			selectedIndex: idx % 4, // some deterministic selection
		}));
		const res = await request(app).post('/api/submit').send({ answers });
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('score');
		expect(res.body).toHaveProperty('total');
		expect(res.body.total).toBe(answers.length);
	});
});

// Placeholder
