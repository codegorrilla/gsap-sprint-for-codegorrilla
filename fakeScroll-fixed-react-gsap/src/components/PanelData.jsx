export const panelData = [
	{
		title: 'Panel One',
		content: (
			<>
				<p>This is the custom content for Panel One.</p>
				<img
					src='path/to/image1.jpg'
					alt='Panel 1'
				/>
			</>
		),
	},
	{
		title: 'Panel Two',
		content: <p>This panel has a different kind of content, with a list:</p>,
		listItems: ['Item A', 'Item B', 'Item C'],
	},
	{
		title: 'Panel Three',
		content: <p>Here is a unique button for Panel Three.</p>,
		buttonText: 'Click Me!',
	},
	{
		title: 'Panel Four',
		content: (
			<>
				<div className='box'></div>
			</>
		),
	},
	{
		title: 'Panel Five',
		content: (
			<>
				<div className='box'>I'm Box 2</div>
			</>
		),
	},
];
