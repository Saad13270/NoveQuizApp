import React from 'react';
import Logo from '../components/Logo.jsx';
import Button from '../components/Button.jsx';

export default function HomePage({ onStart }) {
	return (
		<div className="text-center space-y-8 py-20 animate-fade-in">
			<Logo size={56} />
			<p className="text-gray-600 text-lg">Test your knowledge with 10 curated questions.</p>
			<div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-full px-4 py-2">
				<span className="h-2 w-2 rounded-full bg-blue-500" />
				<span className="text-sm">Ready when you are</span>
			</div>
			<div>
				<Button onClick={(e) => { e.preventDefault?.(); onStart(); }} data-testid="start-btn">Start Quiz</Button>
			</div>
		</div>
	);
}

// Placeholder
