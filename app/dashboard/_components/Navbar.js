"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import styles from "@/app/dashboard/dashboard.module.css";
import Search from "@/app/dashboard/_components/Search";
import Link from "next/link";
import { useEffect, useState } from "react";
import { logOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("userInfo")) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  function handleMenuDisplay(){
    setIsMenuDisplayed(!isMenuDisplayed);
  }

  function handleLogout() {
    logOut();
    localStorage.removeItem("userInfo");
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
      <Link href="/">
        <div className={styles.logo_div}>
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            priority
            placeholder="blur"
            className={styles.logo}
          />
          <h1>Formify</h1>
        </div>
      </Link>
      <div className={styles.search_div}>
        <Search />
        <i className="fa-solid fa-bell"></i>
        <i className="fa-solid fa-user" onClick={handleMenuDisplay}></i>
        {isMenuDisplayed && isLoggedIn ? <DrobMenu /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
