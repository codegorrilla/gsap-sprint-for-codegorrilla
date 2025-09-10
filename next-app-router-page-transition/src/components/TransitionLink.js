'use client';

import { useRouter } from 'next/navigation';
import { animatePageOut } from '../animations';

const TransitionLink = ({ href, children, ...props }) => {
	const router = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		animatePageOut(href, router);
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
