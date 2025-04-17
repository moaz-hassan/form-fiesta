import styles from "./ContactPage.module.css";
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.contactPage}>
        <section className={styles.hero}>
          <h1>Contact Us</h1>
          <p>We&apos;d love to hear from you!</p>
        </section>

        <div className={styles.contactContainer}>
          <section className={styles.contactForm}>
            <h2>Send Us a Message</h2>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" required></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </section>

          <section className={styles.contactInfo}>
            <h2>Contact Information</h2>
            <div className={styles.infoItem}>
              <h3>Email</h3>
              <p>moaz.hassan.mo@gmail.com</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Phone</h3>
              <p>+2011111111111</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Address</h3>
              {/* <p>123 Form Street, San Francisco, CA 94107</p> */}
            </div>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/moaz-hassan"
                className={styles.socialIcon}
                target="_blank"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.upwork.com/freelancers/~01178aa09c833babaa"
                className={styles.socialIcon}
                target="_blank"
              >
                <i className="fab fa-upwork"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/moaz-hassan"
                className={styles.socialIcon}
                target="_blank"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
