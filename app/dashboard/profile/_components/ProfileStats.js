import styles from '../userProfile.module.css';
import { FileText, Users, BarChart, Bookmark, PieChart } from "lucide-react";

const ProfileStats = ({ statsData }) => {
  return (
    <div className={styles.statsContainer}>
      <h3 className={styles.statsTitle}>Your Stats</h3>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconContainer}>
            <FileText size={20} className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{statsData.formsCreated}</span>
            <span className={styles.statLabel}>Forms Created</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconContainer}>
            <Users size={20} className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{statsData.submissions}</span>
            <span className={styles.statLabel}>Total Submissions</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconContainer}>
            <BarChart size={20} className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{statsData.conversionRate}</span>
            <span className={styles.statLabel}>Conversion Rate</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconContainer}>
            <PieChart size={20} className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{statsData.activeUsers}</span>
            <span className={styles.statLabel}>Active Users</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconContainer}>
            <Bookmark size={20} className={styles.statIcon} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{statsData.savedTemplates}</span>
            <span className={styles.statLabel}>Saved Templates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
