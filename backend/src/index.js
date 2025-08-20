require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const quizRoutes = require('./routes/quizRoutes');
const { syncAndSeed } = require('./db');

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(helmet());
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '200kb' }));

app.use('/api', quizRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/', (_req, res) => res.json({ message: 'Backend is running' }));

// Basic rate limiting
const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

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
