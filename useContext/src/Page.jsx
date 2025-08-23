import { useContext } from 'react';
import Header from './components/Header';
import Box from './components/Box';
import { ThemeContext } from './ThemeContextProvider';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// export default function Page() {
// 	// const [tl, setTl] = useState();

// 	// const { contextSafe } = useGSAP(() => {
// 	// 	const tl = gsap.timeline();
// 	// 	setTl(tl);
// 	// });

// 	// const addAnimation = useCallback(
// 	// 	(animation, index) => {
// 	// 		tl && tl.add(animation, index * 0.01);
// 	// 	},
// 	// 	[tl]
// 	// );

// 	// const toggleAnimation = contextSafe(() => {
// 	// 	tl && tl.reversed(!tl.reversed());
// 	// });

// 	return (
// 		<section>
// 			<Header handlePos={toggleAnimation} />
// 			<Box
// 				addAnimation={addAnimation}
// 				index={0}
// 			>
// 				Box 1
// 			</Box>
// 		</section>
// 	);
// }

export default function Page() {
	const animCtx = useContext(ThemeContext);
	const anim = animCtx.addAnimation;
	const trigger = animCtx.togglePos;
	return (
		<section>
			<Header handlePos={trigger} />
			<Box
				addAnimation={anim}
				index={0}
			>
				Box 1
			</Box>
		</section>
	);
}
