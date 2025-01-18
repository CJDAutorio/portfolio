"use client";

import React, { FormEvent, useEffect } from "react";
import { AboutMeForm } from "../Views/Admin/AboutMeForm/about-me-form.component";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure FirebaseUI.
const uiConfig = {
	signInFlow: "popup",
	signInSuccessUrl: "/signedIn",
	signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

export default function Admin() {
	const [view, setView] = React.useState<React.ReactNode>(null);
	const [isSignedIn, setIsSignedIn] = React.useState(false);

	const buttonClasses = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

	if (!firebase.apps.length) {
		const firebaseConfig = {
			apiKey: process.env.FIREBASE_API_KEY,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN,
			projectId: process.env.FIREBASE_PROJECT_ID,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.FIREBASE_APP_ID,
			measurementId: process.env.FIREBASE_MEASUREMENT_ID,
		};
		firebase.initializeApp(firebaseConfig);
	}

	function handleViewChange(component: React.ReactNode) {
		setView(component);
		console.log("set view to", component);
	}

	useEffect(() => {
		const unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged((user) => {
				setIsSignedIn(!!user);
			});
		return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
	}, []);

	return (
		<div className="container mx-auto mt-12 w-full">
			<h1 className="text-4xl mb-16">Admin Page</h1>
			{isSignedIn ? (
				<StyledFirebaseAuth
					uiConfig={uiConfig}
					firebaseAuth={firebase.auth()}
				/>
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
