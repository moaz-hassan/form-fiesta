import styles from "./createForm.module.css";
import Input from "@/app/dashboard/_components/Input";
import Select from "@/app/dashboard/_components/Select";
import deleteQs from "@/app/dashboard/forms/create/_QuestionsFunctions/deleteQs";
import qsTitleOnchange from "@/app/dashboard/forms/create/_QuestionsFunctions/changeQsTitle";
import qsTypeOnchange from "@/app/dashboard/forms/create/_QuestionsFunctions/changeQsType";
import QsAnswersInputs from "@/app/dashboard/forms/create/_createFormComponents/qsAnswersInputs";

const QuestionContainer = ({ index, qs, questions, setQuestions, ...rest }) => {
  return (
    <div className={styles.form_container} {...rest}>
      <div className={styles.form_question}>
      <span onClick={() => deleteQs(index, setQuestions, questions)}>X</span>
        <Input
          type="text"
          placeholder="Write the question here..."
          value={qs.title}
          onChange={(e) =>
            qsTitleOnchange(index, e.target.value, setQuestions, questions)
          }
        />
        <QsAnswersInputs
          index={index}
          qs={qs}
          questions={questions}
          setQuestions={setQuestions}
        />
      </div>
      <Select
        options={["multy-choices", "text"]}
        value={qs.type}
        onChange={(e) =>
          qsTypeOnchange(index, e.target.value, setQuestions, questions)
        }
        selectLabel="Select Type"
      />
    </div>
  );
};

export default QuestionContainer;
