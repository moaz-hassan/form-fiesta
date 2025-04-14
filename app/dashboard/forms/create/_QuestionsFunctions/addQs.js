// Add a new question
export default function addQs(questions, setQuestions) {
  const newQuestion = {
    id: questions.length + 1,
    title: "",
    type: "multy-choices",
    choices: [],
    answer: null,
  };
  setQuestions([...questions, newQuestion]);
}
