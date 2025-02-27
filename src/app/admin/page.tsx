"use client";

import React from "react";
import { AboutMeForm } from "../Views/Admin/AboutMeForm/about-me-form.component";
import "firebaseui/dist/firebaseui.css";
import dynamic from "next/dynamic";
import FirebaseAuth from "../Utils/FirebaseAuth";
import { ExperienceForm } from "../Views/Admin/ExperienceForm/experience-form.component";

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
		() =>
			import(
				"../Components/FirebaseSignIn/firebase-sign-in.component"
			).then((mod) => mod.FirebaseSignIn),
		{
			loading: () => <p>Loading...</p>,
			ssr: false,
		}
	);

	return (
		<div className="container mx-auto mt-12 w-full font-sans">
			<div className="mb-16">
				<h1 className="text-4xl">Admin Page</h1>
				{isSignedIn && (
					<div className="flex flex-row justify-start gap-5 items-center">
						<p>Logged in as {FirebaseAuth.currentUser?.email}</p>
						<button
							className="bg-slate-200 px-3 py-1 rounded"
							onClick={() => {
								FirebaseAuth.signOut();
								setIsSignedIn(false);
							}}
						>
							Sign Out
						</button>
					</div>
				)}
			</div>

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
						<button
							className={buttonClasses}
							onClick={() => handleViewChange(<ExperienceForm />)}
						>
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
