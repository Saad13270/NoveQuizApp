import React from 'react';
import ScoreBoard from '../components/ScoreBoard.jsx';

export default function ResultPage({ result, onRestart }) {
	const score = result?.score ?? 0;
	const total = result?.total ?? 0;
	const correctIds = result?.correctIds ?? [];

	return (
		<div className="space-y-6 py-8">
			<ScoreBoard score={score} total={total} />
			{Array.isArray(correctIds) && (
				<div className="bg-white rounded-lg shadow p-5">
					<h3 className="font-semibold mb-2">Details</h3>
					<p className="text-sm text-gray-600">
						Correct question IDs: {correctIds.length ? correctIds.join(', ') : 'None'}
					</p>
				</div>
			)}
			<div className="text-center">
				<button
					onClick={onRestart}
					className="px-4 py-2 bg-gray-800 text-white rounded"
					data-testid="restart-btn"
				>
					Back to Home
				</button>
			</div>
		</div>
	);
}

// Placeholder
