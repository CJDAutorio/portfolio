"use client";

import React from "react";
import Nav from "../Nav";
import AboutMe from "../AboutMe";
import { Button, ProjectExperience, WorkExperience } from "../../Utils/types";
import Experience from "../Experience";
import classNames from "classnames";
import "lenis/dist/lenis.css";

import "./style.css";

interface BaseComponentProps {
	className?: string | undefined;
}

const Base: React.FC<BaseComponentProps> = ({ className }) => {
	const [view, setView] = React.useState<React.ReactNode>(<div></div>);
	const [experienceContent, setExperienceContent] = React.useState<
		Array<WorkExperience | ProjectExperience>
	>();

	const buttons: Button[] = [
		{
			name: "About Me",
			component: (
				<AboutMe className="bg-slate-50/60 backdrop-blur-md py-4" />
			),
		},
		{
			name: "Experience",
			component: (
				<Experience
					className="bg-slate-50/60 backdrop-blur-md py-4"
					experienceContent={experienceContent}
					onExperienceContentLoaded={(experienceContent) => {
						setExperienceContent(experienceContent);
					}}
				/>
			),
		},
		{
			name: "Hobbies",
			component: <AboutMe />,
		},
		{
			name: "Contact Me",
			component: <AboutMe />,
		},
	];

	const handleViewChange = (viewIndex: number) => {
		if (viewIndex === -1) {
			setView(<div className="p-2"></div>);
			console.log("removed view");
			return;
		}

		setView(buttons[viewIndex].component);
		console.log("set view to", buttons[viewIndex].name);
	};

	return (
		<div
			className={classNames(
				className ? className : "",
				"flex flex-col w-full h-full justify-start items-start overflow-hidden"
			)}
		>
			<div className="my-12 md:mx-12 container overflow-x-hidden overflow-y-auto h-[86vh] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-200/10">
				{view}
			</div>
			<Nav
				onViewChange={handleViewChange}
				buttons={buttons}
				className="fixed container w-full mx-auto bottom-0"
			/>
		</div>
	);
};

export default Base;
