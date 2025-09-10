'use client';

import { useEffect, useRef } from 'react';
import { animatePageIn } from '../animations'; // We'll create this file next

export default function Template({ children }) {
	const transitionRef = useRef(null);

	useEffect(() => {
		animatePageIn(transitionRef.current);
	}, []);

	return (
		<>
			<div
				id='transition-element'
				ref={transitionRef}
			/>
			{children}
		</>
	);
}
