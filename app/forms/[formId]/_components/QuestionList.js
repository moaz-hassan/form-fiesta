'use client';
import QuestionItem from './QuestionItem';
import { useFormStorage } from '@/hooks/useFormStorage';
import styles from '../FormStyles.module.css';

export default function QuestionList({ questions, formId }) {
  const { answers, updateAnswer } = useFormStorage(formId, questions);

  return (
    <div className={styles.questionsContainer}>
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          value={answers[index]?.answer}
          onChange={(value) => updateAnswer(index, value)}
        />
      ))}
    </div>
  );
}