import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import { getQuestions, submitAnswers } from '../api/quizApi.js';

export default function QuizBoard({ onDone }) {
	const [questions, setQuestions] = useState([]);
	const [current, setCurrent] = useState(0);
	const [answers, setAnswers] = useState({}); // id -> selectedIndex
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

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
		<div className="space-y-4">
			<QuestionCard
				question={q.question}
				options={q.options}
				selectedIndex={selectedIndex}
				onSelect={handleSelect}
			/>
			<div className="flex justify-between">
				<div className="text-sm text-gray-500">Question {current + 1} / {questions.length}</div>
				{!isLast ? (
					<button
						onClick={handleNext}
						className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
						disabled={selectedIndex == null}
						data-testid="next-btn"
					>
						Next
					</button>
				) : (
					<button
						onClick={handleSubmit}
						className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
						disabled={submitting || Object.keys(answers).length === 0}
						data-testid="submit-btn"
					>
						{submitting ? 'Submitting...' : 'Submit'}
					</button>
				)}
			</div>
		</div>
	);
}

// Placeholder
