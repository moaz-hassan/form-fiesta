import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";

export async function getFormById(formId) {
  const formsRef = collection(db, "forms");
  const q = query(formsRef, where("formId", "==", formId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  }
}
