import HorizontalGallery from '@/components/HorizontalGallery';

export default function Home() {
	return (
		<>
			<section className='spacer'>
				<h1>Scroll below to view horizontal scrolling gallery</h1>
			</section>
			<HorizontalGallery />
			<section className='spacer'>
				<h1>Next Section</h1>
			</section>
		</>
	);
}
