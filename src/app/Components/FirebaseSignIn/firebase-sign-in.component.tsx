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

		const uiConfig = {
			signInOptions: [
				{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					requireDisplayName: false,
				},
			],
			disableSignUp: {
				status: true,
				errorMessage: "Bad dog.",
			},
			signInFlow: "popup",
			callbacks: {
				signInSuccessWithAuthResult: function () {
					setIsSignedIn(true);
					return false;
				},
			},
		};

		if (ui.isPendingRedirect()) {
			ui.start("#firebaseui-auth-container", uiConfig);
		}
	}, []);
	return (
		<NoSSRComponent>
			<div id="firebaseui-auth-container"></div>
		</NoSSRComponent>
	);
}
