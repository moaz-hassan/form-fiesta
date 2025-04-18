"use client";
import { useEffect, useState } from "react";
import styles from "./userProfile.module.css";
import { resetPassword } from "@/services/sendPasswordResetEmail";
const ProfileInfo = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    setUser({ userEmail: userInfo.email, createdAt: userInfo.createdAt });
  }, []);
  return (
    <div>
      <div className={styles.profileHeader}>
        <h1 className={styles.userName}>{user?.userEmail?.split("@")[0]}</h1>
      </div>
      <div className={styles.profileDetails}>
        <p>Email: {user.userEmail}</p>
        <p>Member since: {user.createdAt}</p>
      </div>
      <button
        className={styles.editButton}
        onClick={() => {
          resetPassword(user?.userEmail);
        }}
      >
        Edit Password
      </button>
    </div>
  );
};

export default ProfileInfo;
