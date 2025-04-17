import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

 const addForm = async (formData) => {
  const formRef = await addDoc(collection(db, "forms"), {
    formId:formData.formId,
    title: formData.title,
    description: formData.description,
    userId: formData.userId,
    createdAt: serverTimestamp(),
    isLocked: false,
    questions: formData.questions,
  });

  return formRef.id;
};


export default addForm;