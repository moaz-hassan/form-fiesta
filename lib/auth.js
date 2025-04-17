import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { increaseUserNumber } from "@/services/saveUser";

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await increaseUserNumber();
    try {
      await sendEmailVerification(user);
      toast("Check your inbox and verfiy your email !");
    } catch (error) {
      toast.error("Error sending verification email:", error.message);
    }

    toast("User registered successfully!");

    return { success: true, user };
  } catch (error) {
    toast.error("Error during sign up:", error.message);

    return { success: false, error: error.message };
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user.emailVerified) {
      toast("Logged in successfully");
      sessionStorage.setItem("emailVerfied", user.emailVerified);
      return { success: true, user };
    } else {
      toast.error("Login Failed ! Please verify your email");
      toast("Check your inbox and verfiy your email !");
      sendEmailVerification(user);
    }
  } catch (error) {
    toast.error("Error during login:", error.message);
    return { success: false, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    toast("User logged out successfully");

    return { success: true };
  } catch (error) {
    toast.error("Error during logout:", error.message);
    return { success: false, error: error.message };
  }
};
