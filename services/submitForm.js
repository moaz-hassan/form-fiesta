import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";

/**
 * Pushes a new submission to the 'attributes.submissions' array
 * for the form document where 'formId' equals the given formId
 *
 * @param {string} formId - The formId field inside the document
 * @param {any} newSubmissionValue - The value to push into attributes.submissions
 */
export async function submitForm(formId, newSubmissionValue) {
  try {
    const formsRef = collection(db, "forms");
    const q = query(formsRef, where("formId", "==", formId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      toast.error("No form found with the given formId.");
      return;
    }

    const docRef = doc(db, "forms", querySnapshot.docs[0].id);

    await updateDoc(docRef, {
      "attributes.submissions": arrayUnion(newSubmissionValue),
    });

    localStorage.removeItem(`form_${formId}`);
    toast("Submission added successfully.");
  } catch (error) {
    toast.error("Error updating submission field:", error);
  }
}
