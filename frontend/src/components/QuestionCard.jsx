import React from 'react';

export default function QuestionCard({ question, options, selectedIndex, onSelect }) {
	return (
		<div className="bg-white rounded-lg shadow p-5">
			<h2 className="text-lg font-semibold mb-4" data-testid="question-text">{question}</h2>
			<div className="grid gap-3">
				{options.map((opt, idx) => (
					<button
						key={idx}
						onClick={() => onSelect(idx)}
						className={`text-left border rounded px-4 py-2 transition-colors ${
							selectedIndex === idx
								? 'bg-blue-600 text-white border-blue-600'
								: 'bg-white hover:bg-blue-50 border-gray-300'
						}`}
						data-testid={`option-${idx}`}
					>
						{opt}
					</button>
				))}
			</div>
		</div>
	);
}

// Placeholder
