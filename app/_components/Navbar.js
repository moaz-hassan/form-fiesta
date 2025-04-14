"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/app/_components/components.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { logOut } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    }
  }, [setIsLoggedIn]);

  function handleMenuDisplay() {
    setIsMenuDisplayed(!isMenuDisplayed);
  }

  function handleLogout() {
    logOut();
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setIsLoggedIn(false);
    setIsMenuDisplayed(false);
  }

  const DrobMenu = () => {
    return (
      <div className={styles.drop_menu}>
        <Link href="/dashboard">Dashboard</Link>
        <span onClick={handleLogout}>Logout</span>
      </div>
    );
  };

  return (
    <div className={styles.nav}>
      <Image
        className={styles.logo}
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        priority
      />
      <div className={styles.nav_links}>
        <Link
          href="/"
          style={pathname === "/" ? { backgroundColor: "#F5F6F7" } : null}
        >
          Home
        </Link>
        <Link
          href="/about"
          style={pathname === "/about" ? { backgroundColor: "#F5F6F7" } : null}
        >
          About
        </Link>
        <Link
          href="/contact"
          style={
            pathname === "/contact" ? { backgroundColor: "#F5F6F7" } : null
          }
        >
          Contact
        </Link>
      </div>
      {isLoggedIn && (
        <div className={styles.drop_menu_conatiner}>
          <span
            style={isMenuDisplayed ? { backgroundColor: "#e6e6e6" } : null}
            className={styles.drop_menu_main_span}
            onClick={() => {
              handleMenuDisplay();
            }}
          >
            Hi, {userInfo?.email?.slice(0, userInfo?.email.indexOf("@"))}
          </span>
          {isMenuDisplayed && <DrobMenu />}
        </div>
      )}
      {(!isLoggedIn && !isLoading) && (
        <div className={styles.auth}>
          <Link href="/login" className={styles.auth_link1}>
            Login
          </Link>
          <Link href="/sign-up" className={styles.auth_link2}>
            Sign Up
          </Link>
        </div>
      )}
      {isLoading && <Spinner className={styles.nav_spinner} />}
    </div>
  );
}
