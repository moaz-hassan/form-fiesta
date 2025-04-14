// Update the answer for a specific choice in a question
export default function answerOnchange(
  type = "multy-choices",
  qsIndex,
  choiceIndex,
  value,
  setQuestions,
  questions,
) {
  if (type === "multy-choices") {
    const updatedQuestions = questions.map((question, index) => {
      if (index === qsIndex) {
        const newChoices = question.choices.map((choice, cIndex) =>
          cIndex === choiceIndex ? value : choice
        );
        return { ...question, choices: newChoices };
      }
      return question;
    });
    setQuestions(updatedQuestions);

  } else if (type === "text") {
    const updatedQuestions = questions.map((question, index) => {
      if (index === qsIndex) {
        const newAnswer = (question.answer = value);
        return { ...question, answer: newAnswer };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  }
}
