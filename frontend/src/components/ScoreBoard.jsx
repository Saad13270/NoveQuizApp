import React from 'react';

export default function ScoreBoard({ score, total }) {
	return (
		<div className="bg-white rounded-lg shadow p-5 text-center">
			<h2 className="text-2xl font-bold mb-2">Your Score</h2>
			<p className="text-xl" data-testid="score-text">
				{score} / {total}
			</p>
		</div>
	);
}

// Placeholder
