import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import classes from './HorizontalScroll.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HorizontalScroll() {
	//Use a ref for the parent container that will be pinned
	const containerRef = useRef(null);

	//Use a ref for the horizontal panels
	const panelsRef = useRef([]);

	useGSAP(() => {
		//Scope all GSAP animations to this component for safe cleanup
		const ctx = gsap.context(() => {
			const panels = panelsRef.current;
			const tl = gsap.timeline();

			//Create the main ScrollTrigger animation
			const scrollTween = gsap.to(panels, {
				xPercent: -100 * (panels.length - 1), //Animate x-position to move panels
				ease: 'none',
				scrollTrigger: {
					trigger: containerRef.current,
					pin: true,
					scrub: 1,
					snap: 1 / (panels.length - 1), //Optional: snap to each panel
					end: () => `+=${containerRef.current.offsetWidth}`, //Create vertical scroll space equal to the total width of the panels
				},
			});

			panels.forEach((panel, index) => {
				//Create child ScrollTrigger for each panel
				gsap
					.timeline(panel, {
						scrollTrigger: {
							trigger: panel, //Trigger starts when the left edge of the panel hits the center of the viewport.
							start: 'left center',
							end: 'right center',
							containerAnimation: scrollTween, //Connect  to the main horizontal scroll animation
							markers: true,
							scrub: true,
						},
					})
					.to(panel.querySelector('h1'), {
						scale: 1.4,
						opacity: 0.5,
						duration: 1,
					}); //Added a tween to this timeline, you can more tween here.
			});
		}, containerRef); //Scope to this component

		//Cleanup function: reverts all animations created within the context
		return () => ctx.revert();
	}, []); //Run only once on component mount

	return (
		<div className={classes['horizontal-section-wrapper']}>
			<div
				className={classes['horizontal-container']}
				ref={containerRef}>
				{[
					'Panel One',
					'Panel Two',
					'Panel Three',
					'Panel Four',
					'Panel Five',
				].map((text, index) => (
					<section
						key={index}
						ref={(el) => (panelsRef.current[index] = el)}
						className={`${classes.panel} ${
							classes[['one', 'two', 'three', 'four', 'five'][index]]
						}`}>
						<h1>{text}</h1>
					</section>
				))}
			</div>
		</div>
	);
}
