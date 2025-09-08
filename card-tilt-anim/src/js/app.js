import '../scss/app.scss';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/all';

gsap.registerPlugin(InertiaPlugin);

const box = document.querySelector('.tracker');

const card = document.querySelectorAll('.card');

const cardStack = gsap.utils.toArray(card);

console.log(cardStack);

const maxTilt = 40;

let isHovering = false;

const cardMovement = (e) => {
	if (!isHovering) return;

	const boxRect = box.getBoundingClientRect();

	const centerX = boxRect.left + boxRect.width / 2;
	const centerY = boxRect.top + boxRect.height / 2;

	const mouseX = (e.clientX - centerX) / (boxRect.width / 2);
	const mouseY = (e.clientY - centerY) / (boxRect.height / 2);

	const rotateX = mouseY * -maxTilt;
	const rotateY = mouseX * maxTilt;

	const randomVelocityX = gsap.utils.random(-1000, 1000);
	const randomVelocityY = gsap.utils.random(-1000, 1000);

	gsap.to(cardStack, {
		rotationX: rotateX,
		rotationY: rotateY,
		inertia: {
			// x: {
			// 	velocity: randomVelocityX,
			// 	min: -50, // Minimum position for the oscillation
			// 	max: 50, // Maximum position for the oscillation
			// 	resistance: 1000, // High resistance for a quick, "bouncy" effect
			// },
			y: {
				velocity: mouseY,
				min: -50,
				max: 50,
				resistance: 1000,
			},
		},
		ease: 'power2.out',
		duration: 0.5,
	});
};

//handle mouse enter
box.addEventListener('mouseenter', () => {
	isHovering = true;
});

//handle mouse event
box.addEventListener('mousemove', cardMovement);

// box.addEventListener('mouseleave', (e) => {
// 	isHovering = false;

// 	const velocityX = e.movementX;
// 	const velocityY = e.movementY;

// 	gsap.to(cardStack, {
// 		inertia: {
// 			rotationX: {
// 				velocity: -velocityY * 1.5,
// 				end: 0,
// 			},
// 			rotationY: {
// 				velocity: velocityX * 1.5,
// 				end: 0,
// 			},
// 			x: {
// 				velocity: velocityX * 1.5,
// 				end: 0,
// 			},
// 		},
// 	});
// });

//
const button = document.querySelector('.oscillate-btn');

// Set up the initial state
// gsap.set(button, {
// 	x: 0,
// 	y: 0,
// });

// button.addEventListener('click', () => {
// 	// Generate a random initial "throw" velocity on click
// 	const randomVelocityX = gsap.utils.random(-1000, 1000);
// 	const randomVelocityY = gsap.utils.random(-1000, 1000);

// 	// Apply the inertia tween to create the oscillation
// 	gsap.to(button, {
// 		inertia: {
// 			x: {
// 				velocity: randomVelocityX,
// 				min: -50, // Minimum position for the oscillation
// 				max: 50, // Maximum position for the oscillation
// 				resistance: 1000, // High resistance for a quick, "bouncy" effect
// 			},
// 			y: {
// 				velocity: randomVelocityY,
// 				min: -50,
// 				max: 50,
// 				resistance: 1000,
// 			},
// 		},
// 	});
// });
