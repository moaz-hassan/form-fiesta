import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function getAllUsers() {
  const usersRef = collection(db, "usersNum");
  const snapshot = await getDocs(usersRef);

  const users = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return users;
}
