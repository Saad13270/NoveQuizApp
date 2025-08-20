import React from 'react';

export default function HomePage({ onStart }) {
	return (
		<div className="text-center space-y-6 py-16">
			<h1 className="text-3xl font-bold">NovaQuiz</h1>
			<p className="text-gray-600">Test your knowledge with 10 quick questions.</p>
			<button
				onClick={onStart}
				className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
				data-testid="start-btn"
			>
				Start Quiz
			</button>
		</div>
	);
}

// Placeholder
