import Link from "next/link";
import styles from "@/app/_components/components.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>Form Fiesta</h2>
          <p>Build forms fast. Share instantly.</p>
        </div>

        <div className={styles.links}>
          <div>
            <h4>Get in touch</h4>
            <a
              href="https://github.com/moaz-hassan"
              className={styles.socialIcon}
              target="_blank"
            >
              <i className="fab fa-github"></i> Github
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01178aa09c833babaa"
              className={styles.socialIcon}
              target="_blank"
            >
              <i className="fab fa-upwork"></i> Upwork
            </a>
            <a
              href="https://www.linkedin.com/in/moaz-hassan"
              className={styles.socialIcon}
              target="_blank"
            >
              <i className="fab fa-linkedin"></i> Linkedin
            </a>
          </div>

          <div>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link href="/">Terms</Link>
            <Link href="/">Privacy</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          &copy; {new Date().getFullYear()} Form Fiesta. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
