import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Panel from './Panel';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const panelData = [
	{
		title: 'Panel One',
		content: (
			<>
				<p>This is the custom content for Panel One.</p>
				<img
					src='path/to/image1.jpg'
					alt='Panel 1'
				/>
			</>
		),
	},
	{
		title: 'Panel Two',
		content: <p>This panel has a different kind of content, with a list:</p>,
		listItems: ['Item A', 'Item B', 'Item C'],
	},
	{
		title: 'Panel Three',
		content: <p>Here is a unique button for Panel Three.</p>,
		buttonText: 'Click Me!',
	},
	{
		title: 'Panel Four',
		content: (
			<>
				<div className='box'></div>
			</>
		),
	},
	{
		title: 'Panel Five',
		content: (
			<>
				<div className='box'>I'm Box 2</div>
			</>
		),
	},
];

export default function HorizontalScrollTrigger() {
	const containerRef = useRef(null);
	const panelsRef = useRef([]);

	useGSAP(
		() => {
			const panels = panelsRef.current;

			//ScrollTrigger animation for the main container that holds panels inside it
			const scrollTween = gsap.to(panels, {
				xPercent: -100 * (panels.length - 1),
				ease: 'none',
				scrollTrigger: {
					trigger: containerRef.current,
					pin: true,
					scrub: 1,
					snap: 1 / (panels.length - 1),
					end: () => `+=${containerRef.current.offsetWidth}`,
				},
			});

			const tl = gsap.timeline();

			//Child ScrollTrigger
			panels.forEach((panel, index) => {
				tl.to(panel, {
					scrollTrigger: {
						trigger: panel,
						start: 'left 0%',
						end: 'right 100%',
						containerAnimation: scrollTween,
						markers: true,
						scrub: true,
					},
				})
					.to(panel.querySelector('h1'), {
						scale: 3,
						opacity: 0.4,
						duration: 1,
						ease: 'power1.in',
						scrollTrigger: {
							trigger: panel.querySelector('h1'),
							containerAnimation: scrollTween,
							scrub: 1,
							toggleActions: 'play none none reset',
						},
						onComplete: () =>
							console.log(`Completed animating in Panel ${index + 1}`),
					})
					.to('.box', {
						y: -200,
						ease: 'power2.in',
						scrollTrigger: {
							trigger: '.box',
							containerAnimation: scrollTween,
							scrub: true,
						},
					});
			});
		},
		{ scope: containerRef, dependencies: [] }
	);

	return (
		<section className='horizontal-section-wrapper'>
			<div
				className='horizontal-container'
				ref={containerRef}
			>
				{panelData.map((panel, index) => (
					<Panel
						key={index}
						ref={(el) => (panelsRef.current[index] = el)}
						className={`panel ${
							['one', 'two', 'three', 'four', 'five'][index]
						}`}
					>
						{/* The content is now dynamic and comes from the panelData array */}
						<h1>{panel.title}</h1>
						<div>{panel.content}</div>

						{/* Conditionally render unique content based on data */}
						{panel.listItems && (
							<ul>
								{panel.listItems.map((item, itemIndex) => (
									<li key={itemIndex}>{item}</li>
								))}
							</ul>
						)}

						{panel.buttonText && (
							<button
								onClick={() =>
									alert(`You clicked the button in ${panel.title}`)
								}
							>
								{panel.buttonText}
							</button>
						)}
					</Panel>
				))}
			</div>
		</section>
	);
}
