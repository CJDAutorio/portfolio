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
			component: <AboutMe />,
		},
		{
			name: "Experience",
			component: <Experience className="bg-slate-50/50 backdrop-blur-md" />,
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
				"flex flex-col w-full"
			)}
		>
				<div className="my-12 container mx-auto md:mx-12 overflow-x-hidden overflow-y-auto h-[90vh]">{view}</div>
			<Nav
				onViewChange={handleViewChange}
				buttons={buttons}
				className="fixed container w-full mx-auto"
			/>
		</div>
	);
};

export default Base;
