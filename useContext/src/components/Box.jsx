import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// export default function Box({ addAnimation, index, children }) {
// 	const box = useRef();

// 	useGSAP(() => {
// 		const anim = gsap.to(box.current, { x: 200, ease: 'power1.out' });

// 		addAnimation(anim, index);
// 	}, [addAnimation]);

// 	return (
// 		<div
// 			className='box'
// 			ref={box}
// 		>
// 			{children}
// 		</div>
// 	);
// }

export default function Box({ addAnimation, index, children }) {
	const box = useRef();

	useGSAP(() => {
		const anim = gsap.to(box.current, { x: 200, ease: 'power1.out' });

		addAnimation(anim, index);
	}, [addAnimation]);

	return (
		<div
			className='box'
			ref={box}
		>
			{children}
		</div>
	);
}
