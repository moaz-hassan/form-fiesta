"use client";

import styles from "@/app/sign-up/sign-up.module.css";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (password !== retypePassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await signUp(email, password);
      toast("User signed up successfully ✅");
      toast("Check your inbox and verfiy your email !");
      toast("Redirecting to login");
      await new Promise(() => {
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_header}>
        <h1>Sign Up</h1>
        <p>Welcome! Create new account.</p>
      </div>
      <div className={styles.inputs}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Retype Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <button className={styles.reg_button} onClick={handleSignUp}>
        Sign Up
      </button>

      <div className={styles.reg}>
        <span>Already have an account? </span>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
