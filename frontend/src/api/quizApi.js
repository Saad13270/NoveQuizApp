function getViteEnv() {
	try {
		// Access import.meta.env at runtime only where supported (Vite/browser)
		// Using Function avoids parse errors in Jest/CommonJS
		// eslint-disable-next-line no-new-func
		const fn = new Function('return import.meta.env;');
		return fn();
	} catch (_) {
		return undefined;
	}
}

const API_BASE = (typeof window !== 'undefined' && window.__APP_CONFIG__ && window.__APP_CONFIG__.VITE_API_URL)
	|| (getViteEnv() && getViteEnv().VITE_API_URL)
	|| process.env.VITE_API_URL
	|| 'http://localhost:4000/api';

export async function getQuestions() {
	try {
		// Prefer new structured route if available
		const res = await fetch(`${API_BASE}/quiz/questions`).catch(() => fetch(`${API_BASE}/questions`));
		if (!res.ok) throw new Error('Failed to fetch questions');
		return await res.json();
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function submitAnswers(answers) {
	try {
		const res = await fetch(`${API_BASE}/quiz/submit`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ answers }),
		}).catch(() => fetch(`${API_BASE}/submit`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ answers }),
		}));
		if (!res.ok) throw new Error('Failed to submit answers');
		return await res.json();
	} catch (err) {
		console.error(err);
		throw err;
	}
}

// Placeholder
