console.clear();

//import Page from './Page';
import ThemeContextProvider from './ThemeContextProvider';
import './App.scss';
import Page from './Page';

export default function App() {
	return (
		<ThemeContextProvider>
			<h2>how to use | useContext hook with GSAP</h2>
			<Page />
		</ThemeContextProvider>
	);
}
