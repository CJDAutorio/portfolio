import FirebaseAuth from "@/app/Utils/FirebaseAuth";
import firebase from "firebase/compat/app";
import * as firebaseui from 'firebaseui'
import { useEffect } from "react";
import NoSSRComponent from "../NoSSR/no-s-s-r.component";

interface FirebaseSignInProps {
	setIsSignedIn: (isSignedIn: boolean) => void;
}

export function FirebaseSignIn({ setIsSignedIn }: FirebaseSignInProps) {
	useEffect(() => {

		const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(FirebaseAuth);

		const uiConfig: firebaseui.auth.Config = {
			signInOptions: [
				{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					requireDisplayName: false,
					disableSignUp: {
                        status: true
                    }
				},
			],
			signInFlow: "popup",
			callbacks: {
				signInSuccessWithAuthResult: function (authResult: unknown, _redirectUrl?: string) {
					const currentUser = FirebaseAuth.currentUser;
					console.log('currentUser', currentUser);
					setIsSignedIn(true);
					console.log("Sign in success", authResult);
					return false;
				},
				signInFailure: function (error) {
					console.error("Sign in failed", error);
				},
			},
		};

		ui.start("#firebaseui-auth-container", uiConfig);
	}, []);
	return (
		<NoSSRComponent>
			<div id="firebaseui-auth-container"></div>
		</NoSSRComponent>
	);
}
