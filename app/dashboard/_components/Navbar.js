"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import styles from "../dashboard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { logOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Navbar = ({ isAside, setIsAside }) => {
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("userInfo")) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  function handleMenuDisplay() {
    setIsMenuDisplayed(!isMenuDisplayed);
  }

  function handleLogout() {
    logOut();
    sessionStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setIsMenuDisplayed(false);
    router.push("/");
  }

  const DrobMenu = () => {
    return (
      <div className={styles.drop_menu}>
        <Link href="/">Home</Link>
        <span onClick={handleLogout}>Logout</span>
      </div>
    );
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.menu_icon_div}>
        <i
          className={`fa-solid fa-bars ${styles.menu_icon} ${
            isAside && styles.active_aside
          }`}
          onClick={() => {
            setIsAside(!isAside);
          }}
        ></i>
        <Link href="/">
          <div className={styles.logo_div}>
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              priority
              placeholder="blur"
              className={styles.logo}
            />
            <h1>Form Fiesta</h1>
          </div>
        </Link>
      </div>
      <div className={styles.search_div}>
        <i className="fa-solid fa-bell"></i>
        <i className="fa-solid fa-user" onClick={handleMenuDisplay}></i>
        {isMenuDisplayed && isLoggedIn ? <DrobMenu /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
