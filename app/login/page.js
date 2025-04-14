"use client";
import styles from "@/app/login/login.module.css";
import { logIn } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      setError("");
      try {
        const res = await logIn(email, password);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            email: res?.user?.email,
            uid: res?.user?.uid,
          })
        );
      } catch (error) {
        throw error;
      } finally {
        if (localStorage.getItem("emailVerfied") === "true") {
          localStorage.removeItem("emailVerfied");
          router.push("/");
        } else {
          setError("Invalid credential");
          toast.error("Invalid credential");
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_header}>
        <h1>Login</h1>
        <p>Welcome back! Please login to your account.</p>
      </div>
      {error && (
        <p
          style={{
            backgroundColor: "#b32e2e",
            color: "white",
            padding: "10px",
          }}
          className={styles.error}
        >
          {error}
        </p>
      )}
      <form className={styles.inputs} onSubmit={handleSubmit}>
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
        <button type="submit" className={styles.login_button}>
          Login
        </button>
      </form>
      <div className={styles.reg}>
        <span>Create new account? </span>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
}
