import gsap from 'gsap';

export const animatePageIn = (transitionElement) => {
	if (transitionElement) {
		const tl = gsap.timeline();

		tl.set(transitionElement, {
			xPercent: 0,
			borderRadius: '0%',
			backgroundColor: '#000000',
		}).to(transitionElement, {
			xPercent: 100,
			duration: 0.8,
			ease: 'power2.in',
		});
	}
};

export const animatePageOut = (href, router) => {
	const transitionElement = document.getElementById('transition-element');
	if (transitionElement) {
		const tl = gsap.timeline();

		tl.set(transitionElement, {
			xPercent: -100,
			borderRadius: '0%',
		}).to(transitionElement, {
			xPercent: 0,
			duration: 0.8,
			ease: 'power2.in',
			onComplete: () => {
				router.push(href);
			},
		});
	}
};
