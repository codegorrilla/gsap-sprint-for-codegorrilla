'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ReactLenis } from 'lenis/react';

export default function LenisProvider({ children }) {
	const lenisRef = useRef();

	useEffect(() => {
		function update(time) {
			lenisRef.current?.lenis?.raf(time * 1000);
		}

		gsap.ticker.add(update);

		return () => gsap.ticker.remove(update);
	}, []);

	return (
		<ReactLenis
			root
			options={{ autoRaf: false, smoothTouch: true }}
			ref={lenisRef}>
			{children}
		</ReactLenis>
	);
}
