import { getFormById } from "@/services/getFormById";
import styles from "../../../dashboard.module.css";
import { format, parseISO } from "date-fns";
import Link from "next/link";

async function getFormWithResponses(formId) {
  const res = await getFormById(formId);
  // Only modify the data if needed for display purposes
  // if (res.attributes?.submissions) {
  //   res.attributes.submissions = res.attributes.submissions.map(submission => ({
  //     ...submission,
  //     answers: submission.answers.slice(0, 1) // Show only first answer for preview
  //   }));
  // }
  return res;
}

const FormResponsesGrid = async ({ params, searchParams }) => {
  const { formId } = await params; // No need for await here
  const formData = await getFormWithResponses(formId);
  const { submissionNum } = await searchParams;

  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";
    try {
      const date =
        typeof timestamp === "object"
          ? "seconds" in timestamp
            ? new Date(timestamp.seconds * 1000) // Firestore timestamp
            : new Date(timestamp) // Date object
          : parseISO(timestamp); // ISO string
      return format(date, "MMMM d, yyyy 'at' h:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  if (submissionNum) {
    const submissionIndex = parseInt(submissionNum) - 1;
    const submission = formData.attributes?.submissions?.[submissionIndex];

    if (!submission) {
      return (
        <div className={styles.errorContainer}>
          <h2>Submission not found</h2>
          <Link
            href={`/dashboard/forms/forms-responses/${formId}`}
            className={styles.actionButton}
          >
            Back to All Responses
          </Link>
        </div>
      );
    }

    return (
      <div className={styles.fullResponseContainer}>
        <div className={styles.fullResponseHeader}>
          <h2>Full Response #{submissionNum}</h2>
          <p className={styles.formId}>Form ID: {formData.formId}</p>
          <p className={styles.responseDate}>
            Submitted: {formatDate(submission.submittedAt)}
          </p>
        </div>

        <div className={styles.fullResponseDetails}>
          {formData.questions?.map((question, index) => {
            const answer = submission?.answers.find(
              (a) => a.questionId === question.id
            );
            return (
              <div key={question.id} className={styles.responseQuestion}>
                <h3 className={styles.questionTitle}>
                  {index + 1}- {question.title}
                </h3>
                <p className={styles.answerText}>
                  {question.choices[Number(answer?.answer)] || answer?.answer}
                </p>
              </div>
            );
          })}
        </div>

        <div className={styles.responseActions}>
          <Link
            href={`/dashboard/forms/forms-responses/${formId}`}
            className={styles.actionButton2}
          >
            Back to All Responses
          </Link>
        </div>
      </div>
    );
  }

  // Default view - show all responses in grid
  return (
    <div className={styles.responsesContainer}>
      <div className={styles.responsesHeader}>
        <p className={styles.formId}>Form ID: {formData.formId}</p>
        <h2>{formData.description || "Form Responses"}</h2>
        <p className={styles.form_description}>{formData.description}</p>
        <p className={styles.subtitle}>
          Number Of Submissions: {formData.attributes?.submissions?.length || 0}
        </p>
      </div>

      <div className={styles.responsesGrid}>
        {!formData.attributes?.submissions?.length ? (
          <div className={styles.noResponses}>No submissions yet</div>
        ) : (
          formData.attributes.submissions.map((submission, index) => (
            <div key={index} className={styles.responseCard}>
              <div className={styles.responseHeader}>
                <h3>Submission #{index + 1}</h3>
                <span className={styles.responseDate}>
                  {formatDate(submission.submittedAt)}
                </span>
              </div>
              <div className={styles.responseDetails}>
                {formData.questions?.slice(0, 1).map((question) => {
                  const answer = submission?.answers?.find(
                    (a) => a.questionId === question.id
                  );                  
                  return (
                    <div key={question.id} className={styles.responseQuestion}>
                      <p className={styles.questionText}>{question.title}</p>
                      <p className={styles.answerText}>
                        {answer?.answer ||
                          question.choices[Number(answer?.answer)]}
                      </p>
                    </div>
                  );
                })}
                <Link
                  href={`/dashboard/forms/forms-responses/${formId}?submissionNum=${
                    index + 1
                  }`}
                  className={styles.viewFullLink}
                >
                  See Full Response →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.backLink}>
        <Link href="/dashboard/forms" className={styles.actionButton}>
          Back to Forms
        </Link>
      </div>
    </div>
  );
};

export default FormResponsesGrid;
