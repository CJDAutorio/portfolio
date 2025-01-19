import {
	deleteDoc,
	doc,
	Firestore,
	getFirestore,
	setDoc,
} from "firebase/firestore";
import FirebaseApp from "./FirebaseApp";
import { aboutMeContent } from "./types";

const FirestoreDB = getFirestore(FirebaseApp);

export async function setAboutMeDoc(
	firestoreDb: Firestore,
	content: aboutMeContent
) {
	const docRef = doc(firestoreDb, "aboutme-content");

	await setDoc(docRef, content)
		.then(() => {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
}

export async function deleteDocument(firestoreDb: Firestore, docPath: string) {
	const docRef = doc(firestoreDb, docPath);

	await deleteDoc(docRef)
		.then(() => {
			console.log("Document deleted");
		})
		.catch((error) => {
			console.error("Error deleting document: ", error);
		});
}

export default FirestoreDB;
