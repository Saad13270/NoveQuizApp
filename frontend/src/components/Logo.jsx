import React from 'react';

export default function Logo({ size = 48 }) {
	return (
		<div className="inline-flex items-center gap-3 select-none">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 64 64"
				aria-label="NovaQuiz logo"
				className="drop-shadow-sm"
			>
				<defs>
					<linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
						<stop offset="0%" stopColor="#60a5fa" />
						<stop offset="100%" stopColor="#2563eb" />
					</linearGradient>
				</defs>
				<rect x="6" y="6" width="52" height="52" rx="14" fill="url(#g)" />
				<path
					d="M20 44 V20 h6 l8 14 8-14 h6 v24 h-6 V31 l-8 13 -8-13 v13z"
					fill="#ffffff"
				/>
			</svg>
			<span className="text-2xl font-extrabold tracking-tight">NovaQuiz</span>
		</div>
	);
}


