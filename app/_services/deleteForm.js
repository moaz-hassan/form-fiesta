import { db } from "@/lib/firebase"
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore"

export const deleteFormCompletely = async (formId) => {
  const formRef = doc(db, `forms/${formId}`)

  // حذف الأسئلة
  const questionsSnap = await getDocs(collection(db, `forms/${formId}/questions`))
  questionsSnap.forEach(docSnap => deleteDoc(docSnap.ref))

  // حذف الردود
  const submissionsSnap = await getDocs(collection(db, `forms/${formId}/submissions`))
  submissionsSnap.forEach(docSnap => deleteDoc(docSnap.ref))

  // حذف الفورم نفسه
  await deleteDoc(formRef)
}
