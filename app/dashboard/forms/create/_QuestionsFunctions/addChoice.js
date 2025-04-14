// Add a new choice to a question (limit to 6 choices)
export default function addChoice(qsIndex, setQuestions, questions) {
  const updatedQuestions = questions.map((question, index) => {
    if (index === qsIndex && question.choices.length < 6) {
      return {
        ...question,
        choices: [...question.choices, ""],
      };
    }
    return question;
  });
  setQuestions(updatedQuestions);
}
