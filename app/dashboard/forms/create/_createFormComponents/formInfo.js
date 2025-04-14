"use client";
import Input from "@/app/dashboard/_components/Input";
import styles from "./createForm.module.css";
import addForm from "@/app/_services/addForm";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import createRandomString from "@/app/_services/generateRandomValue";

const FormInfo = ({
  setFormTitle,
  setFormDescription,
  formTitle,
  formDescription,
  questions,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setFormData({
          formId: createRandomString(),
          title: formTitle,
          description: formDescription,
          userId: JSON.parse(storedUserInfo).uid,
          questions: questions,
        });
      }
    }
  }, [formDescription, formTitle, questions]);

  const validateQuestions = () => {
    if (!questions || questions.length === 0) {
      toast.error("Please add at least one question.");
      return false;
    }

    for (const question of questions) {
      // Validate question title
      if (!question.title || question.title.trim() === "") {
        toast.error(`Question ${question.id} title cannot be empty.`);
        return false;
      }

      // Validate based on question type
      if (question.type === "multy-choices") {
        // Check choices exist and have at least 2 options
        if (!question.choices || question.choices.length < 2) {
          toast.error(`Question ${question.id} needs at least 2 choices.`);
          return false;
        }

        // Check no empty choices
        if (question.choices.some((choice) => !choice.trim())) {
          toast.error(`Question ${question.id} has empty choices.`);
          return false;
        }

        // Check answer is selected
        if (question.answer === undefined || question.answer === null) {
          toast.error(
            `Please select a correct answer for question ${question.id}.`
          );
          return false;
        }
      } else if (question.type === "text") {
        // For text questions, answer should be a string (could be empty as it's user input)
        if (typeof question.answer !== "string") {
          toast.error(`Question ${question.id} answer format is invalid.`);
          return false;
        }
      }
    }

    return true;
  };

  const validateForm = () => {
    // Validate form title and description
    if (!formTitle || formTitle.trim() === "") {
      toast.error("Form title cannot be empty.");
      return false;
    }

    if (!formDescription || formDescription.trim() === "") {
      toast.error("Form description cannot be empty.");
      return false;
    }

    // Validate questions
    return validateQuestions();
  };

  const handlePublish = async () => {
    if (validateForm()) {
      try {
        await addForm(formData);
        toast.success("Form published successfully!");
      } catch (error) {
        toast.error("Failed to publish form. Please try again.");
      }
    }
  };

  return (
    <div className={styles.form_info}>
      <button onClick={handlePublish} className={styles.publish_btn}>
        Publish
      </button>

      <div className="form-title">
        <Input
          type="text"
          onChange={(e) => setFormTitle(e.target.value)}
          value={formTitle}
          required
          placeholder="Write form title"
        />
      </div>

      <div className="form-desc">
        <textarea
          onChange={(e) => setFormDescription(e.target.value)}
          value={formDescription}
          placeholder="Write form description"
        ></textarea>
      </div>
    </div>
  );
};

export default FormInfo;
