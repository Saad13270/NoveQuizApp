import React from 'react';

export default function Button({ children, className = '', variant = 'primary', ...rest }) {
	const base = 'inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
	const variants = {
		primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500',
		secondary: 'bg-gray-900 hover:bg-black active:bg-black text-white focus:ring-gray-600',
		ghost: 'bg-transparent hover:bg-gray-100 text-gray-900 focus:ring-gray-300',
		success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white focus:ring-green-500',
	};
	return (
		<button className={`${base} ${variants[variant]} ${className}`} {...rest}>
			{children}
		</button>
	);
}


