"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { ProjectExperience, WorkExperience } from "../../Utils/types";
import Image from "next/image";
import { getAllExperienceDocs } from "@/app/Utils/FirestoreDB";
import { Timestamp } from "firebase/firestore";
import { ProjectCard } from "@/app/Components/ProjectCard/project-card.component";
import { FadeInWhenVisible } from "@/app/Components/FadeInWhenVisible/fade-in-when-visible.component";
import classNames from "classnames";

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
			className={classNames(
				className ? className : "",
				"relative mx-auto flex justify-start items-start"
			)}
			ref={scope}
		>
			{isLoaded ? (
				<div className="w-full flex flex-col justify-center items-center mx-8 pb-4">
					<div className="self-start sticky top-0 w-full flex justify-start items-center gap-2 bg-slate-200/90 backdrop-blur-lg z-10">
						<h1 className="font-serif self-start text-4xl font-medium my-2 mx-4 pt-4">
							Experience
						</h1>
					</div>
					<div className="w-full h-full flex flex-col justify-center items-center mx-12 gap-2 tracking-normal">
						<div className="relative flex justify-center items-center w-full gap-2">
							<div className="flex-grow h-px bg-gray-300"></div>
							<h2 className="font-serif text-2xl font-medium my-2">
								Work / Professional
							</h2>
							<div className="flex-grow h-px bg-gray-300"></div>
						</div>
						{workExperience.map((exp, index) => (
							<FadeInWhenVisible key={exp.id} className="w-full md:w-3/4">
								<div className="self-start grid grid-cols-3 gap-y-4 items-baseline">
									<div className="font-serif text-2xl justify-self-start col-span-2 flex justify-center items-center gap-2 ">
										{exp.media && (
											<div className="self-start drop-shadow-md">
												<Image
													src={exp.media as string}
													alt="alt"
													width={48}
													height={48}
												/>
											</div>
										)}
										<h3>{exp.company}</h3>
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
								<ul className="font-sans list-disc break-words">
									{exp.description.map((desc, index) => (
										<li key={index}>{desc}</li>
									))}
								</ul>
								{index !== workExperience.length - 1 && (
									<div className="w-full h-px bg-gray-300 my-8"></div>
								)}
							</FadeInWhenVisible>
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
						<div className="flex flex-col md:grid md:grid-cols-2 w-full gap-2 justify-center items-start">
							{projectExperience.map((exp) => (
								<div key={exp.id} className="my-2">
									<FadeInWhenVisible>
										<ProjectCard project={exp} />
									</FadeInWhenVisible>
								</div>
							))}
						</div>
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
