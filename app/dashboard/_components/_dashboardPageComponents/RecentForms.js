"use client";
import { useEffect, useState } from "react";
import styles from "./dashboardComponents.module.css";
import getFormsByUserId from "@/services/getFormsByUserId";
import { toast } from "react-toastify";
import convertDateFromSeconds from "@/services/convertDateFromSeconds";
import Link from "next/link";
const RecentForms = () => {
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
        Recent Forms
      </h2>
      <div>
        {formsData?.map((form, index) => (
          <Link
            href={`/dashboard/forms/display/${form.formId}`}
            key={index}
            className={styles.recent_form_link}
          >
            <div className={styles.recent_forms_item}>
              <div className={styles.recent_forms_icon}>
                <i className="fas fa-check"></i>
              </div>
              <div className={styles.recent_forms_content}>
                <p className={styles.recent_forms_text}>
                  You <strong>Created a new form</strong> &quot;
                  {form.title}&quot;
                </p>
                <div className={styles.recent_forms_details}>
                  <span className={styles.activityDate}>
                    {convertDateFromSeconds(form?.createdAt.seconds)}
                  </span>
                  <span className={styles.recent_forms_submissions}>
                    <strong>{form.attributes.submissions.length}</strong>
                    Submissions
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {(formsData?.length === 0 && <h2 className={styles.no_forms_error}>No Forms Created</h2>)}
      </div>
    </section>
  );
};

export default RecentForms;
