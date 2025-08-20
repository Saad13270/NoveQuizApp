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
					<radialGradient id="glow" cx="50%" cy="50%" r="60%">
						<stop offset="0%" stopColor="#93c5fd"/>
						<stop offset="100%" stopColor="#2563eb"/>
					</radialGradient>
					<linearGradient id="frame" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="#1f2937"/>
						<stop offset="100%" stopColor="#111827"/>
					</linearGradient>
				</defs>

				<rect x="3" y="3" width="58" height="58" rx="16" fill="url(#frame)" />
				<rect x="6" y="6" width="52" height="52" rx="14" fill="url(#glow)" />

				{/* Star burst */}
				<g opacity="0.25" transform="translate(32,32)">
					{Array.from({ length: 8 }).map((_, i) => (
						<rect key={i} x="-1" y="-18" width="2" height="12" rx="1" fill="#fff" transform={`rotate(${i*45})`} />
					))}
				</g>

				{/* "N" monogram */}
				<path
					d="M18 44 V20 h6 l8 14 8-14 h6 v24 h-6 V31 l-8 13 -8-13 v13z"
					fill="#fff"
					style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}
				/>
			</svg>
			<span className="text-2xl font-extrabold tracking-tight">NovaQuiz</span>
		</div>
	);
}


