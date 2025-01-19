import FirebaseApp from "./FirebaseApp";
import {
	getDownloadURL,
	getStorage,
	ref,
	StorageReference,
	uploadBytes,
	UploadMetadata,
} from "firebase/storage";

export const FirebaseStorage = getStorage(FirebaseApp);

export const FirebaseStorageRef = (path: string) => {
	return ref(FirebaseStorage, path);
};

export async function firebaseStorageUploadBytes(
	ref: StorageReference,
	file: Blob | File,
	metadata?: UploadMetadata
) {
	await uploadBytes(ref, file, metadata ? metadata : {})
		.then((snapshot) => {
			console.log("Uploaded a blob or file!", snapshot);
			return snapshot;
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
}

export async function firebaseStorageGetDownloadURL(
	storageRef: StorageReference,
	path: string
) {
	await getDownloadURL(ref(FirebaseStorage, path))
		.then((url) => {
			console.log("File available at", url);

			return url;
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
}

export default FirebaseStorage;
