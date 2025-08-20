import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App.jsx';

// Mock fetch
const mockQuestions = [
	{
		id: 1,
		question: 'Q1',
		options: ['A', 'B', 'C', 'D'],
		category: 'Gen',
		difficulty: 'easy',
	},
	{
		id: 2,
		question: 'Q2',
		options: ['A', 'B', 'C', 'D'],
		category: 'Gen',
		difficulty: 'easy',
	},
];

beforeEach(() => {
	global.fetch = jest.fn((url, opts) => {
		if (String(url).includes('/questions')) {
			return Promise.resolve({ ok: true, json: () => Promise.resolve(mockQuestions) });
		}
		if (String(url).includes('/submit')) {
			return Promise.resolve({ ok: true, json: () => Promise.resolve({ score: 1, total: 2, correctIds: [1] }) });
		}
		return Promise.reject(new Error('Unknown URL'));
	});
});


afterEach(() => {
	jest.restoreAllMocks();
});

test('UI flow: start quiz, answer, submit, and see results', async () => {
	render(<App />);

	// Home shows start button
	const startBtn = screen.getByTestId('start-btn');
	expect(startBtn).toBeInTheDocument();
	fireEvent.click(startBtn);

	// First question appears
	await waitFor(() => expect(screen.getByTestId('question-text')).toBeInTheDocument());
	const option0 = screen.getByTestId('option-0');
	fireEvent.click(option0);

	// Next to second question
	const nextBtn = screen.getByTestId('next-btn');
	fireEvent.click(nextBtn);

	// Select option and submit
	await waitFor(() => expect(screen.getByTestId('question-text')).toBeInTheDocument());
	const option1 = screen.getByTestId('option-1');
	fireEvent.click(option1);
	const submitBtn = screen.getByTestId('submit-btn');
	fireEvent.click(submitBtn);

	// See results
	await waitFor(() => expect(screen.getByTestId('score-text')).toBeInTheDocument());
	expect(screen.getByTestId('score-text')).toHaveTextContent('1 / 2');
});

// Placeholder
