import Image from 'next/image';
import styles from './page.module.css';

import TransitionLink from '../components/TransitionLink';

export default function Home() {
	return (
		<main>
			<h1>Home Page</h1>
			<TransitionLink href='/about'>Go to About</TransitionLink>
		</main>
	);
}
