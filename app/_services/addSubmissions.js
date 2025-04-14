import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const addSubmissionToForm = async (formId, submissionData) => {
  try {
    const formRef = doc(db, "forms", formId); // Reference to the form document

    // Add the submission to the 'submissions' array
    await updateDoc(formRef, {
      submissions: arrayUnion(submissionData), // Adding to the existing array
    });

    console.log("Submission added to form", formId);
  } catch (error) {
    console.error("Error adding submission:", error);
  }
};
