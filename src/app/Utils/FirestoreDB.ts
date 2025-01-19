import { getFirestore } from "firebase/firestore";
import FirebaseApp from "./FirebaseApp";

const FirestoreDB = getFirestore(FirebaseApp);

export default FirestoreDB;