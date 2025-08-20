import React from 'react';

export default function QuestionCard({ question, options, selectedIndex, onSelect }) {
	return (
		<div className="glass rounded-xl p-6 animate-slide-up">
			<h2 className="text-xl font-semibold mb-5" data-testid="question-text">{question}</h2>
			<div className="grid gap-3">
				{options.map((opt, idx) => (
					<button
						key={idx}
						onClick={() => onSelect(idx)}
						className={`text-left border rounded-lg px-4 py-3 transition-all ${
							selectedIndex === idx
								? 'bg-blue-600 text-white border-blue-600 shadow'
								: 'bg-white hover:bg-blue-50 border-gray-300 hover:shadow'
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
