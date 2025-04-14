"use client";
import Button from "@/app/dashboard/_components/Button";
import Input from "@/app/dashboard/_components/Input";
import answerOnchange from "@/app/dashboard/forms/create/_QuestionsFunctions/changeChoiceAnswer";
import chooseRightAns from "@/app/dashboard/forms/create/_QuestionsFunctions/chooseRightAns";
import addChoice from "@/app/dashboard/forms/create/_QuestionsFunctions/addChoice";
import styles from "./createForm.module.css";
import { useRef } from "react";

const MultyChoiceInputs = ({ qs, index, setQuestions, questions }) => {
  const inputRef = useRef(null);
  return (
    <div className={styles.choices_div}>
      {qs.choices.map((choice, choiceIndex) => {
        return (
          <div key={choiceIndex} className={styles.choice_container}>
            <Input
              type="radio"
              checked={qs.answer === choiceIndex + 1}
              onChange={() =>
                chooseRightAns(index, choiceIndex, setQuestions, questions)
              }
            />
            <Input
              type="text"
              ref={inputRef}
              placeholder="Type the answer..."
              value={choice}
              onChange={(e) => {
                answerOnchange(
                  "multy-choices",
                  index,
                  choiceIndex,
                  e.target.value,
                  setQuestions,
                  questions,
                  inputRef
                );
              }}
            />
          </div>
        );
      })}
      <Button
        className={styles.add_choice_btn}
        onClick={() => addChoice(index, setQuestions, questions)}
        style={{ backgroundColor: "#333333" }}
      >
        Add Choice
      </Button>
    </div>
  );
};

const TextInputs = ({ index, setQuestions, questions }) => {
  return (
    <textarea
      className={styles.textarea_answer_input}
      type="text"
      placeholder="Type the answer or a hint (for yourself)..."
      onChange={(e) => {
        answerOnchange(
          "text",
          index,
          0,
          e.target.value,
          setQuestions,
          questions
        );
      }}
    />
  );
};

const QsAnswersInputs = ({ index, qs, questions, setQuestions }) => {
  return (
    <div className={styles.qs_container}>
      {qs.type === "multy-choices" ? (
        <MultyChoiceInputs
          qs={qs}
          index={index}
          setQuestions={setQuestions}
          questions={questions}
        />
      ) : qs.type === "text" ? (
        <TextInputs
          index={index}
          setQuestions={setQuestions}
          questions={questions}
        />
      ) : null}
    </div>
  );
};

export default QsAnswersInputs;
