import styles from "../FormStyles.module.css";

export default function FormHeader({ title, description, isLocked }) {
  return (
    <header className={styles.formHeader}>
      <h1 className={styles.formTitle}>{title}</h1>
      {description && <p className={styles.formDescription}>{description}</p>}
      {isLocked && (
        <div className={styles.lockedBanner}>
          This form is locked and cannot be edited
        </div>
      )}
    </header>
  );
}
