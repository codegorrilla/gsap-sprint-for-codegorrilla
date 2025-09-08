import '../scss/demo.scss';
import { gsap } from 'gsap';
import { ScrollTrigger, Flip } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, Flip);

gsap.registerPlugin(ScrollTrigger, Flip);

// Register GSAP plugins
gsap.registerPlugin(Flip, ScrollTrigger);

// Get the elements
const image = document.getElementById('my-image');
const startWrapper = document.querySelector('.start-wrapper');
const endWrapper = document.querySelector('.end-wrapper');
const middleSection = document.querySelector('.middle-section');

// Set up the ScrollTrigger animation
function createFlipAnimation() {
	// 1. Get the state BEFORE making any DOM changes
	const state = Flip.getState(image);

	// 2. Perform the DOM change (the "Last" step)
	endWrapper.appendChild(image);

	// 3. Create the Flip animation and hook it to a ScrollTrigger timeline
	const flip = Flip.from(state, {
		scale: true, // Animate the scale property
		absolute: true, // Prevents a jump when reparenting
		ease: 'power1.inOut',
		duration: 1,
	});

	// Create the ScrollTrigger to control the timeline
	ScrollTrigger.create({
		trigger: middleSection,
		start: 'top top',
		end: '+=1000', // The duration of the scrubbed animation
		scrub: true,
		pin: true,
		animation: flip,
		// Add markers for debugging
		markers: { startColor: 'white', endColor: 'white' },
	});
}

// Ensure the animation is re-created on window resize
let ctx;
function setupAnimation() {
	// Use a GSAP context to manage all animations and prevent duplicates on refresh
	if (ctx) ctx.revert();
	ctx = gsap.context(createFlipAnimation);
}

setupAnimation();
window.addEventListener('resize', setupAnimation);
