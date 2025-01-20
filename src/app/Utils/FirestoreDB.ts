import {
    addDoc,
    collection,
	deleteDoc,
	doc,
	Firestore,
	getDoc,
	getDocs,
	getFirestore,
} from "firebase/firestore";
import FirebaseApp from "./FirebaseApp";
import { aboutMeContent } from './types';
import { firebaseStorageGetDownloadURL, firebaseStorageUploadBytes } from "./FirebaseStorage";

const FirestoreDB = getFirestore(FirebaseApp);

export async function uploadAboutMeDoc(
	content: aboutMeContent
) {
    console.log('uploading', content);
	const docRef = collection(FirestoreDB, "aboutme-content");

    const filePath = await firebaseStorageUploadBytes(content.media ? content.media as Blob : new Blob());

    content.media = filePath;

	await addDoc(docRef, content)
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

export async function getAboutMeDoc(docId?: string) {
    const docRef = doc(FirestoreDB, `aboutme-content${docId ? `/${docId}` : ""}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
}

export async function getAllAboutMeDocs() {
    const querySnapshot = await getDocs(collection(FirestoreDB, "aboutme-content"));
    const content: aboutMeContent[] = [];

    const promises = querySnapshot.docs.map(async (doc) => {
        const aboutMeContent = doc.data() as aboutMeContent;
        console.log(`${doc.id}`, doc.data());
        aboutMeContent.id = doc.id;
        if (aboutMeContent.media) {
            const url = await firebaseStorageGetDownloadURL(aboutMeContent.media as string);
            console.log('url:', url);
            aboutMeContent.media = url;
        }
        content.push(aboutMeContent);
    });

    await Promise.all(promises);

    return content;
}

export default FirestoreDB;
