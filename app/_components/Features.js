import { ClipboardCheck, Share2, BarChart2 } from "lucide-react";
import styles from "@/app/_components/components.module.css";
const Features = () => {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.features_title}>How It Works</h2>
      <div className={styles.container}>
        <div className={styles.featuresGrid}>
          {[
            {
              icon: (
                <ClipboardCheck
                  className={`${styles.icon} ${styles.iconCreate}`}
                />
              ),
              title: "Create Form",
              description:
                "Design professional forms with our intuitive drag-and-drop builder",
            },
            {
              icon: <Share2 className={`${styles.icon} ${styles.iconShare}`} />,
              title: "Share It",
              description:
                "Share your form with anyone through a simple link or embed it",
            },
            {
              icon: (
                <BarChart2
                  className={`${styles.icon} ${styles.iconResponses}`}
                />
              ),
              title: "Get Responses",
              description:
                "Collect and analyze responses in real-time with powerful analytics",
            },
          ].map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
