'use client';

import { useEffect, useRef, useState } from 'react';
import { animatePageIn, animatePageOut } from '../animations'; // We'll create this file next

export default function Template({ children }) {
	const transitionRef = useRef(null);
	const [isAnimating, setIsAnimating] = useState(true);

	useEffect(() => {
		//when the component first mounts, animate the overlay in
		animatePageIn(transitionRef.current, () => setIsAnimating(false));
	}, []);

	return (
		<>
			<div
				id='transition-element'
				ref={transitionRef}
			/>
			<div style={{ opacity: isAnimating ? 0 : 1 }}>{children}</div>
		</>
	);
}
