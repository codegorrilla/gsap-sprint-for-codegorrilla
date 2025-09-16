import { portfolioData } from '@/data/portfolioData';
import TransitionLink from '@/components/TransitionLink';
import Image from 'next/image';

export default async function ProjectDetails({ params }) {
	const { slug } = await params;
	const project = portfolioData.find((p) => p.slug === slug);

	if (!project) {
		return <div>Project not found.</div>;
	}

	return (
		<div className='project-details'>
			<div className='detail-img'>
				<Image
					src={project.parallaxImage}
					alt={project.title}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					priority
				/>
			</div>
			<h1>{project.title}</h1>
			<p>{project.category}</p>
			<TransitionLink href='/portfolio'>Back to Portfolio</TransitionLink>
		</div>
	);
}
