"use client";

import React from "react";
import Nav from "../Nav";
import AboutMe from "../AboutMe";
import { Button } from "../../Utils/types";
import Experience from "../Experience";
import classNames from "classnames";
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

import "./style.css";

interface BaseComponentProps {
	className?: string | undefined;
}

const Base: React.FC<BaseComponentProps> = ({ className }) => {
	const [view, setView] = React.useState<React.ReactNode>(
		<div></div>
	);

	const buttons: Button[] = [
		{
			name: "About Me",
			component: <AboutMe className="bg-slate-50/50 backdrop-blur-md py-4" />,
		},
		{
			name: "Experience",
			component: <Experience className="bg-slate-50/50 backdrop-blur-md py-4" />,
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
				<div className="my-12 md:mx-12 container overflow-x-hidden overflow-y-auto h-[86vh]">{view}</div>
			<Nav
				onViewChange={handleViewChange}
				buttons={buttons}
				className="fixed container w-full mx-auto bottom-0"
			/>
		</div>
	);
};

export default Base;
