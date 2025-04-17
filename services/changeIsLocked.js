import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const changeIsLocked = async (formId, isLocked) => {
  try {
    const formsRef = collection(db, "forms");
    const q = query(formsRef, where("formId", "==", formId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No form found with formId:", formId);
      return;
    }

    // Assuming formId is unique, so only one match
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, { isLocked });
    console.log("isLocked updated successfully");
  } catch (error) {
    console.error("Failed to update isLocked:", error);
  }
};
