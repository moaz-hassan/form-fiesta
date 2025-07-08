import styles from "./form.module.css";
import Link from "next/link";
import { getFormById } from "@/services/getFormById";

export default async function FormViewer({ params }) {
  const { formId } = await params;

  try {
    const form = await getFormById(formId);    
    const formatDate = (timestamp) => {
      if (!timestamp) return "Unknown date";
      try {
        const date = timestamp.toDate
          ? timestamp.toDate()
          : new Date(timestamp);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
      }
    };

    const renderQuestion = (question) => {
      if (!question) return null;

      switch (question.type) {
        case "multy-choices":
          return (
            <div key={question.id} className={styles.questionContainer}>
              <h3 className={styles.questionTitle}>{question.title}</h3>
              <div className={styles.choicesContainer}>
                {question.choices?.map((choice, index) => (
                  <div key={index} className={styles.choiceItem}>
                    <input
                      type="radio"
                      checked={question.answer === index + 1}
                      readOnly
                      className={styles.radioInput}
                    />
                    <label className={styles.choiceLabel}>{choice}</label>
                    {question.answer === index + 1 && (
                      <span className={styles.correctBadge}>
                        &quot;Correct Answer&quot;
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        case "text":
          return (
            <div key={question.id} className={styles.questionContainer}>
              <h3 className={styles.questionTitle}>{question.title}</h3>
              <div className={styles.textAnswer}>
                <p>
                  Sample answer:{" "}
                  <em>{question.answer || "No answer provided"}</em>
                </p>
              </div>
            </div>
          );
        default:
          return (
            <div key={question.id} className={styles.questionContainer}>
              <h3 className={styles.questionTitle}>{question.title}</h3>
              <p className={styles.unknownType}>Unknown question type</p>
            </div>
          );
      }
    };

    return (
      <main className={styles.container}>
        <div className={styles.formViewer}>
          <header className={styles.formHeader}>
            <h1>{form.title}</h1>
            <p className={styles.formDescription}>{form.description}</p>
            <div className={styles.formMeta}>
              <span>Created: {formatDate(form.createdAt)}</span>
              {form.isLocked && (
                <span className={styles.lockedBadge}>Locked</span>
              )}
            </div>
          </header>

          <div className={styles.questionsSection}>
            <h2>Questions ({form.questions?.length || 0})</h2>
            {form.questions?.length > 0 ? (
              form.questions.map(renderQuestion)
            ) : (
              <p className={styles.noQuestions}>No questions in this form</p>
            )}
          </div>

          <div className={styles.formFooter}>
            <Link href="/dashboard/forms" className={styles.backButton}>
              &larr; Back to Forms
            </Link>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading form:", error);
    return (
      <div className={styles.error}>
        <h1>Error loading form</h1>
        <p>There was an error loading the requested form.</p>
        <Link href="/forms" className={styles.backButton}>
          &larr; Back to Forms
        </Link>
      </div>
    );
  }
}
