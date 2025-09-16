'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from './TransitionLink';
import { portfolioData } from '@/data/portfolioData';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HorizontalGallery() {
	const containerRef = useRef(null);
	const scrollRef = useRef(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					pin: true,
					scrub: 1,
					end: () => `+=${scrollRef.current.offsetWidth}`,
				},
			});

			// Horizontal scroll animation
			tl.to(scrollRef.current, {
				x: () => `-${scrollRef.current.offsetWidth - window.innerWidth}`,
				ease: 'none',
			});

			// Parallax effect for each thumbnail
			const thumbnails = gsap.utils.toArray('.thumbnail-link');
			thumbnails.forEach((thumbnail) => {
				const parallaxImage = thumbnail.querySelector('.parallax-image');

				gsap.fromTo(
					parallaxImage,
					{ y: -50 }, // Initial state
					{
						y: 50, // End state
						ease: 'none',
						scrollTrigger: {
							trigger: thumbnail,
							containerAnimation: tl, // Associate with the horizontal scroll timeline
							start: 'left right',
							end: 'right left',
							scrub: true,
						},
					}
				);
			});
		},
		{ scope: containerRef, dependencies: [] }
	);

	return (
		<div
			className='horizontal-gallery-container'
			ref={containerRef}
		>
			<div
				className='scroll-wrapper'
				ref={scrollRef}
			>
				{portfolioData.map((project, index) => (
					<TransitionLink
						key={index}
						href={`/portfolio/${project.slug}`}
						className='thumbnail-link'
					>
						<div className='thumbnail-inner'>
							<Image
								src={project.thumbnail}
								alt={project.title}
								className='thumbnail-image'
								fill
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
							<Image
								src={project.parallaxImage}
								alt={`${project.title} background`}
								className='parallax-image'
								fill
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
							<div className='project-info'>
								<h3>{project.title}</h3>
								<p>{project.category}</p>
							</div>
						</div>
					</TransitionLink>
				))}
			</div>
		</div>
	);
}
