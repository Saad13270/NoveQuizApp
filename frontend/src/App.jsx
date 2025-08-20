import React, { useMemo, useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import ResultPage from './pages/ResultPage.jsx';
import QuizBoard from './components/QuizBoard.jsx';

export default function App() {
	const [route, setRoute] = useState('home'); // 'home' | 'quiz' | 'result'
	const [result, setResult] = useState(null);

	const nav = useMemo(
		() => ({
			goHome: () => setRoute('home'),
			startQuiz: () => {
				setResult(null);
				setRoute('quiz');
			},
			finishQuiz: (res) => {
				setResult(res);
				setRoute('result');
			},
		}),
		[]
	);

	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			<div className="max-w-2xl mx-auto p-4">
				{route === 'home' && <HomePage onStart={nav.startQuiz} />}
				{route === 'quiz' && <QuizBoard onDone={nav.finishQuiz} />}
				{route === 'result' && <ResultPage result={result} onRestart={nav.goHome} />}
			</div>
		</div>
	);
}

// Placeholder
