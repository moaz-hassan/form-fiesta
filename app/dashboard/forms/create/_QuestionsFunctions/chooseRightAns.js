  // Choose the correct answer for a question
  export default function chooseRightAns(qsIndex, choiceIndex,setQuestions,questions) {
    const updatedQuestions = questions.map((question, index) => {
      if (index === qsIndex) {
        return { ...question, answer: choiceIndex + 1 };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  }