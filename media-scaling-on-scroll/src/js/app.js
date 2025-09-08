import '../scss/app.scss';
import { gsap } from 'gsap';
import { ScrollTrigger, Flip } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, Flip);

const parentContainer = document.querySelector('.parent');
const thumbNailContainer = document.querySelector('.thumbNailContent');
const image = document.querySelector('.flip-img');
const fullScreenContainer = document.querySelector('.fullScreenContent');
const aboutText = document.querySelector('.about');
const heroText = document.querySelector('.hero-text');
const fixedWhiteSpace = 40;
const mediumThumb = document.querySelector('.medium-img');
console.log(mediumThumb);
const height = mediumThumb.getBoundingClientRect().height / 4;

gsap.set(aboutText, {
	opacity: 0,
	y: `${fullScreenContainer.getBoundingClientRect().height / 2}`,
});

// document.addEventListener('DOMContentLoaded', () => {

// });

//building timeline for scroll animation
const tl = gsap.timeline({
	scrollTrigger: {
		trigger: thumbNailContainer,
		start: 'top top',
		end: 'bottom top',
		scrub: true,
		pin: true,
		markers: {
			startColor: 'blue',
			endColor: 'red',
			fontSize: '18px',
			indent: 20,
			fontWeight: 'bold',
			color: 'white',
		},
	},
});

//animating hero text appearance on scroll
tl.fromTo(
	heroText,
	{
		opacity: 0,
		y: -100,
		ease: 'power1.out',
	},
	{
		opacity: 1,
		y: 0,
		ease: 'power1.in',
	}
);

// linking image scaling with the scroll progress
tl.to(
	image,
	{
		scale: `${
			(fullScreenContainer.getBoundingClientRect().width -
				2 * fixedWhiteSpace) /
			image.getBoundingClientRect().width
		}`,
		ease: 'power1.out',
	},
	0.2
);

//animating about text appearance on scroll
tl.to(aboutText, {
	scrollTrigger: {
		trigger: fullScreenContainer,
		start: 'top top',
		end: () => {
			console.log(`${height}px`);
			return `${height} top`;
		},
		scrub: 1,
		pin: true,
		markers: {
			startColor: 'yellow',
			endColor: 'pink',
			startLabel: 'about text animation start',
			endLabel: 'about text animation ends',
		},
	},
	opacity: 1,
	y: 0,
	ease: 'power1.in',
});
