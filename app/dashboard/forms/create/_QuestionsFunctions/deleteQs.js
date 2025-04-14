// Delete a question
export default function deleteQs(qsIndex, setQuestions, questions) {
  const updatedQuestions = questions.filter((_, index) => index !== qsIndex);
  setQuestions(updatedQuestions);
}
