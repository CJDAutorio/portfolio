"use client";

import React from "react";
import Nav from "../Nav";
import AboutMe from "../AboutMe";
import { Button } from "../../Utils/types";

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
            component: <AboutMe />,
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
            console.log('removed view');
            return;
        }

        setView(buttons[viewIndex].component);
        console.log('set view to', buttons[viewIndex].name);
    };

	return (
		<div className={`${className} relative w-full h-full`}>
            <div className={`${view ? 'mb-12 h-0' : 'mb-0 h-full'}`}>{view}</div>
			<Nav onViewChange={handleViewChange} buttons={buttons} />
		</div>
	);
};

export default Base;
