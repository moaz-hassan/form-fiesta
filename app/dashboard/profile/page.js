'use client'
import { ArrowLeft, Camera, Edit } from "lucide-react";
import Link from "next/link";
import styles from "./userProfile.module.css";
import ProfileInfo from "./ProfileInfo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getFormsByUserId from "@/services/getFormsByUserId";

const Profile = () => {
  const [formsData, setFormsData] = useState({});
  useEffect(() => {
    async function getFormsData() {
      let totalResponses = 0;
      let totalForms = 0;
      let activeForms = 0;
      let nonActiveForms = 0;
      try {
        const res = await getFormsByUserId(
          JSON.parse(sessionStorage.getItem("userInfo")).uid
        );
        totalForms = res.length;
        for (let i = 0; i < res.length; i++) {
          if (!res[i].isLocked) {
            activeForms++;
          } else {
            nonActiveForms++;
          }
          totalResponses += res[i].attributes.submissions.length;
        }
        
        
      } catch (error) {
        toast.error(error);
      }
      setFormsData({
        totalForms: totalForms,
        activeForms: activeForms,
        totalResponses: totalResponses,
        nonActiveForms: nonActiveForms,
      });
    }
    getFormsData();
  }, []);
  const stats = [
    { label: "Forms Created", value: formsData?.totalForms, icon: "📋" },
    { label: "Total Submissions", value: formsData?.totalResponses, icon: "👥" },
    // { label: "Conversion Rate", value: "68%", icon: "📈" },
    // { label: "Active Users", value: "126", icon: "⏱️" },
    // { label: "Saved Templates", value: "7", icon: "📑" },
  ];

  return (
    <div className={styles.container}>
      <Link href="/dashboard" className={styles.backLink}>
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>

      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <div className={styles.avatarContent}>
              <Camera className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <button className={styles.cameraButton}>
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className={styles.profileInfo}>
          <ProfileInfo />
        </div>
      </div>

      <div className={styles.statsSection}>
        <h2 className={styles.statsTitle}>Your Stats</h2>
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statContent}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statInfo}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
