
import Link from 'next/link';
import styles from "@/app/_components/components.module.css";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>FormBuilder</h2>
          <p>Build forms fast. Share instantly.</p>
        </div>

        <div className={styles.links}>
          <div>
            <h4>Product</h4>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/templates">Templates</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} FormBuilder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
