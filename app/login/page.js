"use client";
import styles from "@/app/login/login.module.css";
import { logIn } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../_components/Spinner";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ← step 1

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      setError("");
      setLoading(true); // ← step 2
      try {
        const res = await logIn(email, password);
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({
            email: res?.user?.email,
            uid: res?.user?.uid,
          })
        );
      } catch (error) {
        throw error;
      } finally {
        setLoading(false); // ← step 3
        if (sessionStorage.getItem("emailVerfied") === "true") {
          sessionStorage.removeItem("emailVerfied");
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
        <button
          type="submit"
          className={styles.login_button}
          disabled={loading}
        >
          {loading ? 'Loading...' : "Login"}
        </button>
      </form>
      <div className={styles.reg}>
        <span>Create new account? </span>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
}
