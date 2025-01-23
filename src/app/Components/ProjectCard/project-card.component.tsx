import { ProjectExperience } from "@/app/Utils/types";
import "./styles.css";

interface ProjectCardProps {
	project: ProjectExperience;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const buttonStyle =
		"project-button rounded-lg px-4 py-1 flex justify-center items-center";
	const buttonDisabled =
		"px-4 py-1 flex rounded-lg justify-center items-center cursor-not-allowed bg-gray-300";

	return (
		<div className="col-span-1 py-4 px-8 bg-gray-100 rounded-lg shadow-lg flex flex-col justify-center items-center">
			<h1>{project.title}</h1>
			<ul className="font-sans justify-self-start list-disc">
				{project.description.map((desc, index) => (
					<li key={index}>{desc}</li>
				))}
			</ul>
			<div className="grid grid-cols-2 gap-8 justify-center my-2 w-full">
				<a href={project.demoLink} className={
						`${project.demoLink !== "" ? buttonStyle : buttonDisabled}`
					}>
					Demo
				</a>
				<a
					href={project.githubLink}
					className={
						`${project.githubLink !== "" ? buttonStyle : buttonDisabled}`
					}
				>
					Github
				</a>
			</div>
		</div>
	);
}
