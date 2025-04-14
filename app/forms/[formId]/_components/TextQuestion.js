import styles from "../FormStyles.module.css";

export default function TextQuestion({ question, value, onChange }) {
  return (
    <>
      <h3 className={styles.questionTitle}>{question.title}</h3>
      <textarea
        // value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={styles.textArea}
        placeholder="Type your answer here..."
        rows={4}
      />
    </>
  );
}