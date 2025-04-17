import styles from "./AboutPage.module.css";
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
import Image from "next/image";
import mission_image from "@/public/header_image.png";
import profile_img from "@/public/main_img.jpg";
import { getForms } from "@/services/getForms";
import { getAllUsers } from "@/services/getAllUsers";
export default async function Home() {

const forms=await getForms();
const users=await getAllUsers();

  return (
    <>
      <Navbar />
      <div className={styles.aboutPage}>
        <section className={styles.hero}>
          <h1>About</h1>
          <p>Empowering businesses to collect data effortlessly since 2023</p>
        </section>

        <section className={styles.mission}>
          <div className={styles.missionContent}>
            <h2>Our Mission</h2>
            <p>
              At FormBuilder, we believe form creation should be simple yet
              powerful. Our platform bridges the gap between complex data
              collection needs and intuitive user experiences.
            </p>
          </div>
          <div className={styles.missionImage}>
            <Image
              src={mission_image}
              alt="our mission"
              priority
            />
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.statItem}>
            <h3>{users[0].uNum}+</h3>
            <p>Users</p>
          </div>
          <div className={styles.statItem}>
            <h3>{forms.length - 1}+</h3>
            <p>Forms Created</p>
          </div>
          <div className={styles.statItem}>
            <h3>24/7</h3>
            <p>Customer Support</p>
          </div>
        </section>

        <section className={styles.team}>
          <h2>Contact Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.avatar}>
                <Image
                  src={profile_img}
                  alt="Profile img"
                  priority
                  placeholder="blur"
                />
              </div>
              <h3>Moaz Hassan</h3>
              <p>Software Engineer - NextJs & ReactJs Developer</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
