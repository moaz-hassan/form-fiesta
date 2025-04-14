import styles from "../FormStyles.module.css";

export default function MultiChoiceQuestion({ question, value, onChange }) {
  return (
    <>
      <h3 className={styles.questionTitle}>{question.title}</h3>
      <div className={styles.choices}>
        {question.choices.map((choice, index) => (
          <label
            key={index}
            className={styles.choice}
          >
            <input
              type="radio"
              name={`question_${question.id}`}
              checked={value === index}
              onChange={() => onChange(index)}
              className={styles.radioInput}
            />
            <span className={styles.choiceText}>{choice}</span>
          </label>
        ))}
      </div>
    </>
  );
}
