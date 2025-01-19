"use client";

import React from "react";
import { AboutMeForm } from "../Views/Admin/AboutMeForm/about-me-form.component";
import "firebaseui/dist/firebaseui.css";

import dynamic from "next/dynamic";

export default function Admin() {
	const [view, setView] = React.useState<React.ReactNode>(null);
	const [isSignedIn, setIsSignedIn] = React.useState(false);

	const buttonClasses =
		"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

	function handleViewChange(component: React.ReactNode) {
		setView(component);
		console.log("set view to", component);
	}

	const FirebaseSignIn = dynamic(
		() => import("../Components/FirebaseSignIn/firebase-sign-in.component").then(mod => mod.FirebaseSignIn),
		{
			loading: () => <p>Loading...</p>,
			ssr: false,
		}
	);

	return (
		<div className="container mx-auto mt-12 w-full">
			<h1 className="text-4xl mb-16">Admin Page</h1>
			{!isSignedIn ? (
				<div className="w-full">
					<FirebaseSignIn setIsSignedIn={setIsSignedIn} />
				</div>
			) : (
				<div>
					<div className="flex flex-row w-full justify-around gap-x-2">
						<button
							className={buttonClasses}
							onClick={() => handleViewChange(<AboutMeForm />)}
						>
							About Me Content
						</button>
						<button className={buttonClasses}>
							Experience Content
						</button>
						<button className={buttonClasses}>
							Hobbies Content
						</button>
						<button className={buttonClasses}>
							Contact Me Content
						</button>
					</div>
					<div className="mt-12">{view}</div>
				</div>
			)}
		</div>
	);
}
