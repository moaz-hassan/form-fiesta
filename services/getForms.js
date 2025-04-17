import { db } from "@/lib/firebase"; // Import your Firebase setup
import { collection, getDocs } from "firebase/firestore";

export const getForms = async () => {
  try {
    // Get the collection reference
    const formsCollectionRef = collection(db, "forms");

    // Fetch the documents in the collection
    const querySnapshot = await getDocs(formsCollectionRef);

    // Map through the documents and get data
    const forms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return forms;
  } catch (error) {
    console.error("Error fetching forms:", error);
  }
};
