"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import {
	EducationExperience,
	ProjectExperience,
	WorkExperience,
} from "../../Utils/types";
import Image from "next/image";
import { getAllExperienceDocs } from "@/app/Utils/FirestoreDB";
import { Timestamp } from "firebase/firestore";
import { ProjectCard } from "@/app/Components/ProjectCard/project-card.component";

interface ExperienceComponentProps {
	className?: string | undefined;
}

const Experience: React.FC<ExperienceComponentProps> = ({ className }) => {
	const [scope, animate] = useAnimate();
	const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
	const [projectExperience, setProjectExperience] = useState<
		ProjectExperience[]
	>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	async function getExperienceContent() {
		setIsLoaded(false);
		setWorkExperience([]);
		setProjectExperience([]);
		const content = await getAllExperienceDocs();
		console.log("experience content:", content);
		const workExp: WorkExperience[] = [];
		const projExp: ProjectExperience[] = [];
		content.forEach((exp) => {
			if (exp.type === "education") {
				return;
			}

			if (exp.type === "work") {
				const monthNames = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				];
				const startDate = new Date(
					(exp.startDate as unknown as Timestamp).toDate()
				);
				exp.startDate =
					monthNames[startDate.getMonth()] +
					" " +
					startDate.getFullYear();
				if (exp.endDate !== "present") {
					const endDate = new Date(
						(exp.endDate as unknown as Timestamp).toDate()
					);
					exp.endDate =
						monthNames[endDate.getMonth()] +
						" " +
						endDate.getFullYear();
				}
			}

			if (exp.type === "work") {
				workExp.push(exp as WorkExperience);
			} else if (exp.type === "project") {
				projExp.push(exp as ProjectExperience);
			}
		});
		setWorkExperience(workExp);
		setProjectExperience(projExp);
		setIsLoaded(true);
	}

	useEffect(() => {
		getExperienceContent();
	}, []);

	useEffect(() => {
		animate(scope.current, { scale: 1 });
	}, [animate, scope]);

	return (
		<div
			className={`${
				className ? className : ""
			} relative mx-auto w-full h-[32rem] mb-12 flex justify-start items-start overflow-y-scroll`}
			ref={scope}
		>
			{isLoaded ? (
				<div className="w-full flex flex-col justify-center items-center mx-8">
					<div className="self-start">
						<h1 className="font-serif self-start text-4xl font-medium my-2">
							Experience
						</h1>
					</div>
					<div className="w-full h-full flex flex-col justify-center items-center mx-12 gap-2 tracking-normal">
						<div className="flex justify-center items-center w-full gap-2">
							<div className="flex-grow h-px bg-gray-300"></div>
							<h2 className="font-serif text-2xl font-medium my-2">
								Work / Professional
							</h2>
							<div className="flex-grow h-px bg-gray-300"></div>
						</div>
						{workExperience.map((exp, index) => (
							<div key={exp.id}>
								<div className="self-start w-full grid grid-cols-3 gap-y-4 items-baseline">
									<div className="font-serif text-2xl justify-self-start col-span-2 flex justify-center items-center gap-2">
										{exp.media && (
											<Image src={exp.media as string} alt="alt" width={48} height={48} />
										)}
										<h3>
											{exp.company}
										</h3>
									</div>
									<p className="font-serif text-lg justify-self-end">
										{exp.startDate} - {exp.endDate}
									</p>
									<p className="font-sans text-lg justify-self-start col-span-2">
										{exp.role}
									</p>
									<p className="font-sans text-lg justify-self-end">
										{exp.location}
									</p>
								</div>
								<ul className="font-sans justify-self-start list-disc">
									{exp.description.map((desc, index) => (
										<li key={index}>{desc}</li>
									))}
								</ul>
								{index !== workExperience.length - 1 && (
									<div className="w-full h-px bg-gray-300 my-8"></div>
								)}
							</div>
						))}
					</div>
					<div className="w-full h-full flex flex-col justify-center items-center mx-12 gap-2 tracking-normal">
						<div className="flex justify-center items-center w-full gap-2">
							<div className="flex-grow h-px bg-gray-300"></div>
							<h2 className="font-serif text-2xl font-medium my-2">
								Projects
							</h2>
							<div className="flex-grow h-px bg-gray-300"></div>
						</div>
						{projectExperience.map((exp, index) => (
							<div key={exp.id}>
								<ProjectCard project={exp} />
							</div>
						))}
					</div>
					<div className="w-full h-full flex flex-col justify-center items-center mx-12 gap-2 tracking-normal">
						<div className="flex justify-center items-center w-full gap-2">
							<div className="flex-grow h-px bg-gray-300"></div>
							<h2 className="font-serif text-2xl font-medium my-2">
								Education
							</h2>
							<div className="flex-grow h-px bg-gray-300"></div>
						</div>
						<div className="self-start w-full grid grid-cols-3 gap-2 items-baseline">
							<h3 className="font-serif text-2xl justify-self-start col-span-2">
								University of North Carolina at Charlotte
							</h3>
							<p className="font-serif text-lg justify-self-end">
								Aug 2019 - May 2023
							</p>
							<p className="font-sans text-lg justify-self-start col-span-2">
								Bachelor of Science in Computer Science
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="w-full h-full flex flex-col justify-center items-center gap-y-4">
					<h2>Loading</h2>
					<div className="w-12 h-12 rounded-xl bg-stone-400 animate-spin"></div>
				</div>
			)}
		</div>
	);
};

export default Experience;
