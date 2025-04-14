// Update the type of a question
export default function qsTypeOnchange(
  qsIndex,
  value,
  setQuestions,
  questions
) {
  const updatedQuestions = questions.map((question, index) => {
    if (index === qsIndex) {
      return {
        ...question,
        type: value,
        choices: value !== "multy-choices" ? [] : question.choices,
      };
    }
    return question;
  });
  setQuestions(updatedQuestions);
}
