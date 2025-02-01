"use client";

import React from "react";
import Nav from "../Nav";
import AboutMe from "../AboutMe";
import { Button } from "../../Utils/types";
import Experience from "../Experience";
import classNames from "classnames";

interface BaseComponentProps {
	className?: string | undefined;
}

const Base: React.FC<BaseComponentProps> = ({ className }) => {
	const [view, setView] = React.useState<React.ReactNode>(null);

	const buttons: Button[] = [
		{
			name: "About Me",
			component: <AboutMe />,
		},
		{
			name: "Experience",
			component: <Experience />,
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
			setView(null);
			console.log("removed view");
			return;
		}

		setView(buttons[viewIndex].component);
		console.log("set view to", buttons[viewIndex].name);
	};

	return (
		<div className={classNames(
			className ? className : "",
			""
		)}>
			<Nav onViewChange={handleViewChange} buttons={buttons} className="" />
			<div
				className=""
			>
				{view}
			</div>
		</div>
	);
};

export default Base;
