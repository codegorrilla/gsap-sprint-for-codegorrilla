'use client';

import { useRouter, usePathname } from 'next/navigation';
import { animatePageOut } from '../animations';

const TransitionLink = ({ href, children, ...props }) => {
	const router = useRouter();
	const pathName = usePathname(); //et the current path

	const handleClick = (e) => {
		e.preventDefault();

		//Only trigger the animation if the navigation is to a different page
		if (pathName !== href) {
			animatePageOut(href, router);
		}
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			{...props}
		>
			{children}
		</a>
	);
};

export default TransitionLink;
