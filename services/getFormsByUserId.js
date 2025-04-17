import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function getFormsByUserId(userId) {
  try {
    const formsRef = collection(db, "forms");
    const q = query(formsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const forms = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return forms;
  } catch (error) {
    console.error("Error getting forms: ", error);
    return [];
  }
}
