'use client';

import Link from 'next/link';
import TransitionLink from './TransitionLink';

export default function Navbar() {
	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Portfolio', href: '/portfolio' },
		{ name: 'Contact', href: '/contact' },
	];

	return (
		<nav className='flex justify-center p-4 bg-gray-800 text-white'>
			<ul className='flex space-x-6'>
				{navLinks.map((link) => (
					<li key={link.name}>
						<TransitionLink href={link.href}>{link.name}</TransitionLink>
					</li>
				))}
			</ul>
		</nav>
	);
}
