# NovaQuiz

An end-to-end quiz app with React + Vite + Tailwind on the frontend and Node.js + Express + Sequelize (SQLite) on the backend.

## Stack
- Frontend: React (Vite), TailwindCSS
- Backend: Node.js, Express, Sequelize, SQLite (file storage)
- Testing: Jest (backend), React Testing Library + Jest (frontend)

## Project Structure
```
NovaQuiz/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   └── quizRoutes.js
│   │   ├── controllers/
│   │   │   └── quizController.js
│   │   ├── models/
│   │   │   └── Quiz.js
│   │   └── db.js
│   ├── package.json
│   ├── jest.config.js
│   ├── tests/
│   │   └── quiz.test.js
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── QuizBoard.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   └── ScoreBoard.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── ResultPage.jsx
│   │   └── api/
│   │       └── quizApi.js
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── jest.config.js
│   ├── .env.example
│   └── tests/
│       └── quizUi.test.jsx
│
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── README.md
└── .env.example
```

## Local Development (without Docker)
Backend:
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Frontend:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Docker Usage
```bash
docker compose build
docker compose up
```
- Frontend: http://localhost:5173
- Backend: http://localhost:4000 (API at /api)

## Environment Variables
- Root `.env.example`:
  - `BACKEND_PORT=4000`
  - `BACKEND_DB_PATH=./backend/data/dev.sqlite`
  - `FRONTEND_PORT=5173`
  - `VITE_API_URL=http://localhost:4000/api`
- Backend `.env.example`: `PORT`, `BACKEND_DB_PATH`, `FRONTEND_ORIGIN`
- Frontend `.env.example`: `VITE_API_URL`

## Run Tests
Backend:
```bash
cd backend
npm test
```

Frontend:
```bash
cd frontend
npm test
```

## Future Extensions
- Categories and filters
- Timers per question
- Authentication and user profiles
- Persistent scores and leaderboards

## Run with Docker

Prerequisites: Docker and Docker Compose

Build images:

```bash
docker compose build
```

Start services:

```bash
docker compose up
```

Services:
- Backend: http://localhost:4000 (API at `/api`)
- Frontend: http://localhost:5173
