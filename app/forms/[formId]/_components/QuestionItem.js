import TextQuestion from "./TextQuestion";
import MultiChoiceQuestion from "./MultiChoiceQuestion";
import styles from "../FormStyles.module.css";

export default function QuestionItem({ question, value, error, onChange }) {
  const renderQuestion = () => {
    switch (question.type) {
      case "multy-choices":
        return (
          <MultiChoiceQuestion
            question={question}
            value={value}
            onChange={onChange}
          />
        );
      case "text":
        return (
          <TextQuestion question={question} value={value} onChange={onChange} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.question} ${error ? styles.hasError : ""}`}>
      {renderQuestion()}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
