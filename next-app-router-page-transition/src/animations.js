import gsap from 'gsap';

export const animatePageIn = (transitionElement, onComplete) => {
	if (transitionElement) {
		const tl = gsap.timeline({
			onComplete: () => {
				if (onComplete) onComplete();
			},
		});

		tl.set(transitionElement, {
			xPercent: 0,
			borderRadius: '0%',
			backgroundColor: '#000000',
		}).to(transitionElement, {
			xPercent: 100,
			duration: 0.8,
			ease: 'power2.in',
			delay: 0.2, //add a slight delay for smoother transition
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
