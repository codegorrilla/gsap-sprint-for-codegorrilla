'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

console.clear();

gsap.registerPlugin(ScrollTrigger, useGSAP);

const images = [
	'/images/1.jpg',
	'/images/2.jpg',
	'/images/3.jpg',
	'/images/4.jpg',
	'/images/5.jpg',
	'/images/6.jpg',
	'/images/7.jpg',
	'/images/8.jpg',
	'/images/9.jpg',
	'/images/10.jpg',
];

const Gallery = () => {
	const containerRef = useRef(null);
	const galleryRef = useRef(null);

	useGSAP(
		() => {
			// Ensure gallery is not empty before calculating dimensions
			if (!containerRef.current || !galleryRef.current) return;

			const images = gsap.utils.toArray('.gallery-image-wrapper');
			const gallery = galleryRef.current;

			const totalWidth = images.reduce(
				(sum, item) => sum + item.offsetWidth,
				0,
			);

			// We need to calculate how far to scroll the gallery
			const scrollDistance = totalWidth - window.innerWidth;

			// Pin the section and horizontally scroll the gallery wrapper
			const scrollTween = gsap.to(gallery, {
				x: -scrollDistance, // Animate to the negative scroll distance
				ease: 'none',
				scrollTrigger: {
					trigger: containerRef.current,
					pin: true,
					scrub: 2,
					start: 'top top',
					end: `+=${scrollDistance}`, // The end position matches the scroll distance
					invalidateOnRefresh: true, // Recalculates on resize
					markers: true,
				},
			});

			// quickSetter for optimized velocity skew
			const skewProxy = { skew: 0 };
			const skewSetter = gsap.quickSetter(
				'.gallery-image-wrapper',
				'skewX',
				'deg',
			);
			const clamp = gsap.utils.clamp(-10, 10); // Max skew amount in degrees

			ScrollTrigger.create({
				onUpdate: (self) => {
					let skew = clamp(self.getVelocity() / -100);
					// Only update the skew if the absolute value is greater than the current one
					if (Math.abs(skew) > Math.abs(skewProxy.skew)) {
						skewProxy.skew = skew;
						gsap.to(skewProxy, {
							skew: 0,
							duration: 0.8,
							ease: 'power3.in',
							overwrite: true,
							onUpdate: () => skewSetter(skewProxy.skew),
						});
					}
				},
			});

			// Parallax for individual images
			images.forEach((wrapper) => {
				const image = wrapper.querySelector('img');
				gsap.to(image, {
					y: '20%', // Adjust the parallax intensity
					ease: 'none',
					scrollTrigger: {
						trigger: wrapper,
						containerAnimation: scrollTween, // Tie the animation to the horizontal scroll
						start: 'left right',
						end: 'right left',
						scrub: true,
					},
				});
			});

			// Ensure GSAP recalculates on image load completion
			// You may need a more robust solution if using a complex image lazy-loading library
			const imagesLoadedPromise = new Promise((resolve) => {
				let loadedCount = 0;
				const totalImages = images.length;
				if (totalImages === 0) {
					resolve();
				}
				images.forEach((imgWrapper) => {
					const img = imgWrapper.querySelector('img');
					img.onload = () => {
						loadedCount++;
						if (loadedCount === totalImages) {
							resolve();
						}
					};
				});
			});

			imagesLoadedPromise.then(() => {
				ScrollTrigger.refresh();
			});
		},
		{ scope: containerRef, dependencies: [], revertOnUpdate: true },
	);
	return (
		<section
			ref={containerRef}
			className='gallery-container'>
			<div
				ref={galleryRef}
				className='gallery-wrapper'>
				{images.map((src, index) => (
					<div
						key={index}
						className='gallery-image-wrapper'>
						<div className='gallery-image-content'>
							<Image
								src={src}
								alt={`Gallery Image ${index + 1}`}
								width={400}
								height={500}
								className='gallery-image'
								priority={index === 0} // Optional: Prioritize the first image for faster loading
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Gallery;
