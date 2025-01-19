import FirebaseAuth from "@/app/Utils/FirebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import NoSSRComponent from "../NoSSR/no-s-s-r.component";

interface FirebaseSignInProps {
	setIsSignedIn: (isSignedIn: boolean) => void;
}

export function FirebaseSignIn({ setIsSignedIn }: FirebaseSignInProps) {
	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		const email = (event.target as HTMLFormElement).email.value;
		const password = (event.target as HTMLFormElement).password.value;
		signInWithEmailAndPassword(FirebaseAuth, email, password).then((userCredential) => {
			console.log('userCredential', userCredential);
			setIsSignedIn(true);
		});
	}

	useEffect(() => {}, []);
	return (
		<NoSSRComponent>
			<div className="container mx-auto w-1/2 min-w-96">
				<form
					className="grid grid-cols-2 items-center justify-center gap-4"
					onSubmit={handleSubmit}
				>
					<label htmlFor="email" className="place-self-end">
						Email:
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="border place-self-start"
					/>
					<label htmlFor="password" className="place-self-end">
						Password:
					</label>
					<input
						type="password"
						id="password"
						name="password"
						className="border place-self-start"
						required
					/>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded col-span-2 mx-auto"
					>
						Sign In
					</button>
				</form>
			</div>
		</NoSSRComponent>
	);
}
