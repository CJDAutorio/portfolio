"use client";

import React, { useEffect } from "react";
import { AboutMeForm } from "../Views/Admin/AboutMeForm/about-me-form.component";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import FirebaseAuth from "../Utils/FirebaseAuth";

export default function Admin() {
	const [view, setView] = React.useState<React.ReactNode>(null);
	const [isSignedIn, setIsSignedIn] = React.useState(false);

	const buttonClasses = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

	function handleViewChange(component: React.ReactNode) {
		setView(component);
		console.log("set view to", component);
	}

	useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(FirebaseAuth);

        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: function(_authResult, _redirectUrl) {
                    setIsSignedIn(true);
					return false;
                },
                uiShown: function() {
                    // This is what should happen when the form is full loaded. In this example, I hide the loader element.
                    document.getElementById('loader')!.style.display = 'none';
                }
            },
            // signInSuccessUrl: 'https://www.anyurl.com', // This is where should redirect if the sign in is successful.
            signInOptions: [ // This array contains all the ways an user can authenticate in your application. For this example, is only by email.
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true,
                    disableSignUp: {
                        status: true
                    }
                }
            ],
        });
    }, []);

	return (
		<div className="container mx-auto mt-12 w-full">
			<h1 className="text-4xl mb-16">Admin Page</h1>
			{!isSignedIn ? (
				<div>
					<p>Please sign in:</p>
					<div id="firebaseui-auth-container"></div>
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
