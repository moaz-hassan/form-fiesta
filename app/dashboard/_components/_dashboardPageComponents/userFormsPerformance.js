"use client";
import getFormsByUserId from "@/services/getFormsByUserId";
import styles from "./dashboardComponents.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserFormsPerformance = () => {
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
          if (res[i].isLocked === false) {
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
  const user = {
    formStats: [
      { title: "Total Forms", value: formsData?.totalForms },
      { title: "Active Forms", value: formsData?.activeForms },
      { title: "Non Active Forms", value: formsData?.nonActiveForms },
      { title: "Total Responses", value: formsData?.totalResponses },
    ],
  };
  return (
    <section>
      <h2 className={styles.sectionTitle}>
        <i className="fas fa-chart-bar"></i>
        Forms Performance
      </h2>
      <div className={styles.formStatsGrid}>
        {user.formStats.map((stat, index) => (
          <div key={index} className={styles.formStatCard}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserFormsPerformance;
