"use client";
import styles from "../dashboard.module.css";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import getFormsByUserId from "@/app/_services/getFormsByUserId";
import { useEffect, useState } from "react";
import { changeIsLocked } from "@/app/_services/changeIsLocked";
import { toast } from "react-toastify";

const FormsList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function getForms() {
      const userId = JSON.parse(localStorage.getItem("userInfo")).uid;
      const formsData = await getFormsByUserId(userId);
      setForms(formsData);
    }
    getForms();
  }, [forms, setForms]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";

    try {
      const date =
        typeof timestamp === "string"
          ? parseISO(timestamp)
          : timestamp.toDate();

      return format(date, "MMMM d, yyyy 'at' h:mm a");
    } catch (error) {
      console.error("Error formatting date:", error, "Timestamp:", timestamp);
      return "Invalid date";
    }
  };

  const countQuestionsByType = (questions) => {
    const counts = { text: 0, "multy-choices": 0 };
    questions?.forEach((q) => {
      counts[q.type] = (counts[q.type] || 0) + 1;
    });
    return counts;
  };

  return (
    <div className={styles.formsGrid}>
      {Array.isArray(forms) &&
        forms.map((form) => {
          const questionCounts = countQuestionsByType(form.questions);

          return (
            <div
              key={form.id}
              className={`${styles.formCard} ${
                form.isLocked ? styles.locked : ""
              }`}
            >
              <div className={styles.cardHeader}>
                <h3>{form.title || "Untitled Form"}</h3>
                {form.isLocked && (
                  <span className={styles.lockBadge}>Locked</span>
                )}
              </div>

              <p className={styles.description}>
                {form.description || "No description provided"}
              </p>

              <div className={styles.metaData}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Created:</span>
                  <span>{formatDate(form.createdAt)}</span>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Questions:</span>
                  <span>
                    {form.questions?.length || 0} total
                    {questionCounts.text > 0 && `, ${questionCounts.text} text`}
                    {questionCounts["multy-choices"] > 0 &&
                      `, ${questionCounts["multy-choices"]} multiple-choice`}
                  </span>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Submissions:</span>
                  <span>{form.submissions?.length || 0}</span>
                </div>
              </div>
              <div className={styles.cardActions}>
                <Link
                  href={`forms/display/${form.formId}`}
                  className={styles.actionButton}
                >
                  View
                </Link>
                <button
                  className={styles.actionButton}
                  onClick={() => {
                    setForms([]);
                    changeIsLocked(form?.formId, !form?.isLocked);
                  }}
                >
                  {form.isLocked ? "Unlock" : "Lock"}
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => {
                    navigator.clipboard.writeText(`https://form-fiesta.vercel.app/forms/${form.formId}`);
                    toast("Form Link Copied Successfully!");
                  }}
                >
                  <i className={`fa-solid fa-share ${styles.share_icon}`}></i>
                  Share
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FormsList;
