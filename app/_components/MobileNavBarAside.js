import Image from "next/image";
import styles from "./components.module.css";
import Link from "next/link";

const MobileNavBarAside = ({ isOpen, onClose }) => {
  return (
    <>
      <aside className={`${styles.mobileAside} ${isOpen ? styles.open : ""}`}>
        <Image
          className={styles.aside_logo}
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
          priority
        />
        <nav className={styles.mobileNav}>
          <Link
            href="/"
            className={styles.navLink}
            onClick={() => {
              onClose(!isOpen);
            }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={styles.navLink}
            onClick={() => {
              onClose(!isOpen);
            }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={styles.navLink}
            onClick={() => {
              onClose(!isOpen);
            }}
          >
            Contact
          </Link>
        </nav>
      </aside>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={() => {
          onClose(!isOpen);
        }}
      ></div>
    </>
  );
};

export default MobileNavBarAside;
