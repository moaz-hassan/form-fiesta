"use client";
import { useFormStorage } from "@/hooks/useFormStorage";
import { submitForm } from "@/services/submitForm";
import { toast } from "react-toastify";
import Spinner from "@/app/_components/Spinner";
import styles from "../FormStyles.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormSubmission({ formId, isLocked }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { clearAnswers } = useFormStorage(formId);
  const [success, setSuccess] = useState(false);
  const navigate = useRouter();

  const handleSubmit = async () => {
    let ansNum = 0;
    const submissions = JSON.parse(
      localStorage.getItem(`form_${formId}_answers`)
    );

    for (let i = 0; i < submissions.length; i++) {
      if (submissions[i].answer === null || submissions[i].answer === "") {
        ansNum++;
      }
    }

    if (ansNum === 0) {
      setIsSubmitting(true);

      try {
        const submissionData = {
          answers: JSON.parse(localStorage.getItem(`form_${formId}_answers`)),
          submittedAt: new Date().toISOString(),
        };
        await submitForm(formId, submissionData);
        clearAnswers();
        setSuccess(true);
        navigate.push(`?isSubmitted=true`);
      } catch (error) {
        toast.error("Failed to submit answer");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please answer all questions!");
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={isLocked || isSubmitting || success}
      className={styles.submitButton}
    >
      {isSubmitting ? <Spinner size="small" position="center"/> : "Submit Form"}
    </button>
  );
}
