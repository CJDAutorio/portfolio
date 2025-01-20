import FirebaseApp from "./FirebaseApp";
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
	UploadMetadata,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const FirebaseStorage = getStorage(FirebaseApp);

export const FirebaseStorageRef = (path: string) => {
	return ref(FirebaseStorage, path);
};

export async function firebaseStorageUploadBytes(
	file: Blob | File,
	metadata?: UploadMetadata
) {
	const date = new Date(Date.now());
	const dateString =
		date.getHours() +
		"-" +
		date.getMinutes() +
		"-" +
		date.getMilliseconds() +
		(date.getMonth() + 1) +
		"-" +
		date.getDate() +
		"-" +
		date.getFullYear();

	const fileName =
		file instanceof File ? file.name : `${dateString}-${uuidv4()}`;
	const fileRef = ref(FirebaseStorage, fileName);

	await uploadBytes(fileRef, file, metadata ? metadata : {})
		.then((snapshot) => {
			console.log("Uploaded a blob or file!", snapshot);
		})
		.catch((error) => {
			switch (error.code) {
				case "storage/unauthorized":
					// User doesn't have permission to access the object
					console.log("Unauthorized:", error);
					break;
				case "storage/canceled":
					// User canceled the upload
					console.log("Upload canceled:", error);
					break;
				case "storage/unknown":
					// Unknown error occurred, inspect the server response
					console.error(error);
					break;
				default:
					console.error(error);
					break;
			}
		});

	return fileRef.fullPath ? fileRef.fullPath : "";
}

export async function firebaseStorageGetDownloadURL(path: string) {
	let mediaUrl = "";
	await getDownloadURL(ref(FirebaseStorage, path))
		.then((url) => {
			console.log("File available at", url);
			mediaUrl = url;
		})
		.catch((error) => {
			switch (error.code) {
				case "storage/object-not-found":
					// File doesn't exist
					console.log("File not found:", error);
					break;
				case "storage/unauthorized":
					// User doesn't have permission to access the object
					console.log("Unauthorized:", error);
					break;
				case "storage/canceled":
					// User canceled the download
					console.log("Download canceled:", error);
					break;
				case "storage/unknown":
					// Unknown error occurred, inspect the server response
					console.error(error);
					break;
				default:
					console.error(error);
					break;
			}
		});
	return mediaUrl;
}

export async function firebaseStorageDeleteFile(path: string) {
	const storageRef = ref(FirebaseStorage, path);

	deleteObject(storageRef)
		.then(() => {
			console.log("File deleted successfully");
		})
		.catch((error) => {
			console.error("Error deleting file:", error);
		});
}

export default FirebaseStorage;
