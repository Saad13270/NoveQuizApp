import React from 'react';
import ScoreBoard from '../components/ScoreBoard.jsx';

export default function ResultPage({ result, onRestart }) {
	const score = result?.score ?? 0;
	const total = result?.total ?? 0;
	const correctIds = result?.correctIds ?? [];

	const durationSeconds = result?.durationSeconds ?? null;

	return (
		<div className="space-y-6 py-8 animate-fade-in">
			<ScoreBoard score={score} total={total} />
			{Array.isArray(correctIds) && (
				<div className="glass rounded-xl p-6">
					<h3 className="font-semibold mb-2">Details</h3>
					<p className="text-sm text-gray-600">
						Correct question IDs: {correctIds.length ? correctIds.join(', ') : 'None'}
					</p>
					{durationSeconds != null && (
						<p className="text-sm text-gray-600 mt-1">Time: {durationSeconds}s</p>
					)}
				</div>
			)}
			<div className="text-center">
				<button
					onClick={onRestart}
					className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
					data-testid="restart-btn"
				>
					Back to Home
				</button>
			</div>
		</div>
	);
}

// Placeholder
