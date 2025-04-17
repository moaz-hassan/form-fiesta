"use client";
import { useEffect, useState } from "react";
import styles from "./dashboardComponents.module.css";
import getFormsByUserId from "@/services/getFormsByUserId";
import { toast } from "react-toastify";
import convertDateFromSeconds from "@/services/convertDateFromSeconds";
import Link from "next/link";
// const user = {
//   name: "Alex Johnson",
//   role: "Form Builder Pro",
//   email: "alex.johnson@example.com",
//   avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//   stats: {
//     formsCreated: 47,
//     responsesCollected: 1286,
//     teams: 3,
//   },
//   formStats: [
//     { title: "Active Forms", value: 12, trend: "↑ 2 from last month" },
//     { title: "Response Rate", value: "68%", trend: "↑ 5%" },
//     { title: "Avg. Completion", value: "2.4 min", trend: "↓ 0.3 min" },
//   ],
//   recentForms: [
//     {
//       id: 1,
//       title: "Customer Feedback Survey",
//       lastEdited: "2 hours ago",
//       responses: 124,
//     },
//     {
//       id: 2,
//       title: "Employee Onboarding",
//       lastEdited: "1 day ago",
//       responses: 42,
//     },
//     {
//       id: 3,
//       title: "Product Interest Form",
//       lastEdited: "3 days ago",
//       responses: 89,
//     },
//   ],
//   activities: [
//     {
//       id: 1,
//       action: "published",
//       formTitle: "Customer Feedback Survey",
//       time: "2 hours ago",
//     },
//     {
//       id: 2,
//       action: "received 42 responses",
//       formTitle: "Employee Onboarding",
//       time: "1 day ago",
//     },
//     {
//       id: 3,
//       action: "created a new form",
//       formTitle: "Event Registration",
//       time: "3 days ago",
//     },
//   ],
// };
const RecentResponses = () => {
  const [formsData, setFormsData] = useState();
  useEffect(() => {
    async function getFormsData() {
      try {
        const res = await getFormsByUserId(
          JSON.parse(sessionStorage.getItem("userInfo")).uid
        );
        if (formsData > 3) {
          res.length = 3;
        }
        setFormsData(res);
      } catch (error) {
        toast.error(error);
      }
    }
    getFormsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={styles.recent_forms_section}>
      <h2 className={styles.sectionTitle}>
        <i className="fas fa-history"></i>
        Recent Responses
      </h2>
      <div>
        {formsData?.map((form, index) => (
          <Link
            href={`/dashboard/forms/forms-responses/${form.formId}`}
            key={index}
            className={styles.recent_form_link}
          >
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <i className="fas fa-check"></i>
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>
                  You{" "}
                  <strong>
                    received {form.attributes.submissions.length} responses
                  </strong>{" "}
                  &quot;
                  {form.title}&quot;
                </p>
                <div className={styles.recentResponsesDetails}>
                  <span className={styles.activityDate}>
                    {convertDateFromSeconds(form?.createdAt.seconds)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {formsData?.length === 0 && (
          <h2 className={styles.no_responses_error}>No Responses</h2>
        )}
      </div>
    </section>
  );
};

export default RecentResponses;
