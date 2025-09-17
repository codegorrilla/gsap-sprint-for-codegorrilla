import Gallery from '@/components/Gallery';

export default function Home() {
	return (
		<main>
			<div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
				<h1>Scroll down to see the magic</h1>
			</div>
			<Gallery />
			<div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
				<h1>End of gallery</h1>
			</div>
		</main>
	);
}
