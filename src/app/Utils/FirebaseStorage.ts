import FirebaseApp from "./FirebaseApp";
import { getStorage } from "firebase/storage";

const FirebaseStorage = getStorage(FirebaseApp);

console.log('firebase storage', FirebaseStorage);

export default FirebaseStorage;