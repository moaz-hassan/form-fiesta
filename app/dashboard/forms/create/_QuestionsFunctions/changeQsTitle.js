// Update the title of a question
export default function qsTitleOnchange(
  qsIndex,
  value,
  setQuestions,
  questions
) {
  const updatedQuestions = questions.map((question, index) =>
    index === qsIndex ? { ...question, title: value } : question
  );
  setQuestions(updatedQuestions);
}
