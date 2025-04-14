import Image from "next/image";
import styles from "@/app/_components/components.module.css";
import headerImage from "@/public/header_image.png";
import Link from "next/link";
function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header_div}>
        <h2>
          Unlock the power of seamless form creation with just a few clicks!
        </h2>
        <p>
          Effortlessly design and customize forms for any purpose, whether
          it&apos;s for surveys, feedback, or lead generation. Our intuitive
          form builder ensures a smooth experience with flexible features that
          meet your needs. Build professional-looking forms in minutes, and
          deploy them easily. Save time and focus on what matters most – growing
          your business.
        </p>
        <div>
          <div className={styles.auth}>
            <Link href="/login" className={styles.auth_link3}>
              Login
            </Link>
            <Link href="/sign-up" className={styles.auth_link4}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <Image
        className={styles.img}
        src={headerImage}
        alt="header img"
        placeholder="blur"
        quality={100}
        width={500}
        height={300}
      />
    </div>
  );
}

export default Header;
