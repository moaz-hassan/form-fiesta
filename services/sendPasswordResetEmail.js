import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";


export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent successfully.");
    return { success: true };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    toast.error("Failed to send reset email.");
    return { success: false, error: error.message };
  }
};
