import { Auth, getAuth } from "firebase/auth";
import FirebaseApp from "./FirebaseApp";

const FirebaseAuth: Auth = getAuth(FirebaseApp);

export default FirebaseAuth;
