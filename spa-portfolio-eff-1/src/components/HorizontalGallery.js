'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PanelData } from '@/data/PanelData';
import Panel from './Panel';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HorizontalGallery() {
	const containerRef = useRef();
	const panelsRef = useRef([]);

	useGSAP(
		() => {
			const panels = panelsRef.current;

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

			panels.forEach((panel, index) => {
				tl.to(panel, {
					scrollTrigger: {
						trigger: panel,
						start: 'left 0%',
						end: 'left 50%',
						containerAnimation: scrollTween,
						markers: true,
						scrub: true,
					},
					onComplete: () =>
						console.log(`Completed animating Panel ${index + 1}`),
				});
			});

			//parallax effect for each thumbnail
			const thumbs = gsap.utils.toArray('.folio-thumb');

			thumbs.forEach((thumb) => {
				const parallaxImg = thumb.querySelector('.parallax-img');

				tl.fromTo(
					parallaxImg,
					{
						y: -20,
					},
					{
						y: 20,
						ease: 'none',
						scrollTrigger: {
							trigger: thumb,
							containerAnimation: scrollTween,
							start: 'left right',
							end: 'right left',
							scrub: true,
						},
					}
				);
			});

			// Refresh ScrollTrigger after all images have loaded
			const images = gsap.utils.toArray('img');
			const loadPromises = images.map(
				(img) =>
					new Promise((resolve) => {
						if (img.complete) {
							resolve();
							console.log('images are loaded properly');
						} else {
							img.addEventListener('load', resolve);
							img.addEventListener('error', resolve); // Also resolve on error to not block
						}
					})
			);

			Promise.all(loadPromises).then(() => {
				ScrollTrigger.refresh();
			});
		},
		{ scope: containerRef, dependencies: [PanelData] }
	);

	return (
		<section className='horizontal-gallery-wrapper'>
			<div
				className='gallery-container'
				ref={containerRef}
			>
				{PanelData.map((panel, index) => (
					<Panel
						key={index}
						ref={(el) => (panelsRef.current[index] = el)}
						className={`panel ${['one', 'two', 'three', 'four'][index]}`}
					>
						<div className='folio-thumb'>
							<div className='thumb-container'>
								<Image
									src={panel.parallaxImage}
									alt={panel.title}
									className='parallax-img'
									fill
								/>
								<Image
									src={panel.thumbnail}
									alt={panel.title}
									className='thumb-img'
									fill
								/>
							</div>
							<h2>{panel.title}</h2>
							<p>{panel.category}</p>
						</div>
					</Panel>
				))}
			</div>
		</section>
	);
}
