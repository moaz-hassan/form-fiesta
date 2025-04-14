"use client";
import { useState } from "react";
import Button from "@/app/dashboard/_components/Button";
import styles from "./createForm.module.css";
import FormInfo from "@/app/dashboard/forms/create/_createFormComponents/formInfo";
import addQs from "@/app/dashboard/forms/create/_QuestionsFunctions/addQs";
import QuestionContainer from "@/app/dashboard/forms/create/_createFormComponents/questionContainer";

function AddQuestion() {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  return (
    <div className={styles.add_qs_container}>
      {createForm ? (
        <>
          <FormInfo
            setFormTitle={setFormTitle}
            setFormDescription={setFormDescription}
            formTitle={formTitle}
            formDescription={formDescription}
            questions={questions}
          />
          {questions.map((qs, index) => (
            <QuestionContainer
              index={index}
              qs={qs}
              key={qs.id}
              questions={questions}
              setQuestions={setQuestions}
            />
          ))}
          <Button
          className={styles.add_qs_btn}
            onClick={() => {
              addQs(questions, setQuestions);
            }}
            style={{ backgroundColor: "#333333" }}
          >
            Add Question
          </Button>
        </>
      ) : (
        <Button
          className={styles.add_form_btn}
          onClick={() => {
            setCreateForm(true);
          }}
        >
          Create Form
        </Button>
      )}
    </div>
  );
}

export default AddQuestion;
