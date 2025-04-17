'use client'
import { useState } from "react";
import Link from "next/link";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileStats from "./_components/ProfileStats";
import ProfileSettings from "./_components/ProfileSettings";
import styles from "./userProfile.module.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample user data - in a real app, this would come from a database or API
  const userData = {
    id: "123456",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    role: "Pro Member",
    joined: "Jan 2023",
    lastActive: "Today",
  };

  // Sample stats data
  const statsData = {
    formsCreated: 28,
    submissions: 1245,
    conversionRate: "68%",
    activeUsers: 126,
    savedTemplates: 7,
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.backLink}>
        <Link href="/dashboard">← Back to Dashboard</Link>
      </div>

      <ProfileHeader userData={userData} />

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "overview" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "forms" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("forms")}
        >
          My Forms
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "settings" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      <div className={styles.contentContainer}>
        {activeTab === "overview" && (
          <div className={styles.overviewContent}>
            <ProfileStats statsData={statsData} />
            <div className={styles.recentActivity}>
              <h3>Recent Activity</h3>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <span className={styles.activityDate}>Today</span>
                  <span className={styles.activityText}>
                    Created a new form &quot;Customer Feedback&quot;
                  </span>
                </div>
                <div className={styles.activityItem}>
                  <span className={styles.activityDate}>Yesterday</span>
                  <span className={styles.activityText}>
                    Received 35 new form submissions
                  </span>
                </div>
                <div className={styles.activityItem}>
                  <span className={styles.activityDate}>3 days ago</span>
                  <span className={styles.activityText}>
                    Updated profile information
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "forms" && (
          <div className={styles.formsContent}>
            <h3>My Forms</h3>
            <p>
              This section would display a list of the user&apos;s created forms.
            </p>
            {/* Form list would go here */}
          </div>
        )}

        {activeTab === "settings" && <ProfileSettings userData={userData} />}
      </div>
    </div>
  );
};

export default Profile;
