"use client";

import React from "react";
import Nav from "../Nav";
import AboutMe from "../AboutMe";
import { Button } from "../../Utils/types";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

interface BaseComponentProps {
	className?: string | undefined;
}

const Base: React.FC<BaseComponentProps> = ({ className }) => {
	const [view, setView] = React.useState<React.ReactNode>(null);

	const firebaseConfig = {
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.FIREBASE_APP_ID,
		measurementId: process.env.FIREBASE_MEASUREMENT_ID,
	};
	
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);

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
			console.log("removed view");
			return;
		}

		setView(buttons[viewIndex].component);
		console.log("set view to", buttons[viewIndex].name);
	};

	return (
		<div className={`${className ? className : ""} relative w-full h-full`}>
			<div
				className={`${
					view ? "opacity-100" : "opacity-0"
				} transition-all`}
			>
				{view}
				<hr className="" />
			</div>
			<Nav onViewChange={handleViewChange} buttons={buttons} />
		</div>
	);
};

export default Base;
