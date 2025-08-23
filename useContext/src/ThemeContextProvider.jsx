import { createContext, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export const ThemeContext = createContext({
	togglePos: () => {},
	addAnimation: () => {},
});

export default function ThemeContextProvider({ children }) {
	const [tl, setTl] = useState();

	const { contextSafe } = useGSAP(() => {
		const tl = gsap.timeline();

		setTl(tl);
	});

	const addAnimation = useCallback(
		(animation, index) => {
			tl && tl.add(animation, index);
		},
		[tl]
	);

	const toggleAnimation = contextSafe(() => {
		tl && tl.reversed(!tl.reversed());
	});

	const animVals = {
		togglePos: toggleAnimation,
		addAnimation: addAnimation,
	};

	return (
		<ThemeContext.Provider value={animVals}>{children}</ThemeContext.Provider>
	);
}
