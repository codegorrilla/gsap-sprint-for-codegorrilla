import HorizontalScroll from './components/HorizontalScroll';

export default function App() {
	return (
		<>
			<section className='spacer'>
				<h1>Scroll Down For Horizontal Fun!</h1>
			</section>
			<HorizontalScroll />
			<section className='spacer'>
				<h1>...And Back To Vertical</h1>
			</section>
		</>
	);
}
