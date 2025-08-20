require('dotenv').config();
const express = require('express');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');
const { syncAndSeed } = require('./db');

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.use('/api', quizRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Initialize database and optionally start server (skip listening during tests)
syncAndSeed()
	.then(() => {
		if (process.env.NODE_ENV !== 'test') {
			app.listen(PORT, () => {
				console.log(`NovaQuiz backend running at http://localhost:${PORT}`);
			});
		}
	})
	.catch((err) => {
		console.error('Failed to initialize database', err);
		process.exit(1);
	});

module.exports = app;

// Placeholder
