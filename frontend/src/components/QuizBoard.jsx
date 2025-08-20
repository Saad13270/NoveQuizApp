import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import Button from './Button.jsx';
import { getQuestions, submitAnswers } from '../api/quizApi.js';

export default function QuizBoard({ onDone }) {
	const [questions, setQuestions] = useState([]);
	const [current, setCurrent] = useState(0);
	const [answers, setAnswers] = useState({}); // id -> selectedIndex
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		let mounted = true;
		(async () => {
			setLoading(true);
			setError(null);
			try {
				const qs = await getQuestions();
				if (mounted) setQuestions(qs || []);
			} catch (err) {
				if (mounted) setError('Failed to load questions');
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	// Simple timer
	useEffect(() => {
		const id = setInterval(() => setSeconds((s) => s + 1), 1000);
		return () => clearInterval(id);
	}, []);

	if (loading) return <div className="p-4">Loading...</div>;
	if (error) return <div className="p-4 text-red-600">{error}</div>;
	if (!questions.length) return <div className="p-4">No questions available.</div>;

	const q = questions[current];
	const selectedIndex = answers[q.id] ?? null;

	function handleSelect(idx) {
		setAnswers((prev) => ({ ...prev, [q.id]: idx }));
	}

	function handleNext() {
		if (current < questions.length - 1) setCurrent((c) => c + 1);
	}

	async function handleSubmit() {
		setSubmitting(true);
		try {
			const payload = Object.entries(answers).map(([id, selectedIndex]) => ({
				id: Number(id),
				selectedIndex,
			}));
			const result = await submitAnswers(payload);
			onDone(result);
		} catch (err) {
			setError('Failed to submit answers');
		} finally {
			setSubmitting(false);
		}
	}

	const isLast = current === questions.length - 1;

	return (
		<div className="space-y-4 animate-fade-in">
			{/* Progress */}
			<div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
				<div
					className="bg-blue-600 h-2 transition-all"
					style={{ width: `${((current + 1) / questions.length) * 100}%` }}
				/>
			</div>
			<div className="flex items-center justify-between text-sm text-gray-500">
				<div>Question {current + 1} / {questions.length}</div>
				<div>Time: {seconds}s</div>
			</div>
			<QuestionCard
				question={q.question}
				options={q.options}
				selectedIndex={selectedIndex}
				onSelect={handleSelect}
			/>
			<div className="flex justify-end">
				{!isLast ? (
					<Button onClick={handleNext} disabled={selectedIndex == null} data-testid="next-btn">Next</Button>
				) : (
					<Button variant="success" onClick={handleSubmit} disabled={submitting || Object.keys(answers).length === 0} data-testid="submit-btn">
						{submitting ? 'Submitting...' : 'Submit'}
					</Button>
				)}
			</div>
		</div>
	);
}

// Placeholder
