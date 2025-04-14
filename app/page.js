import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
// import { createFormWithQuestions } from "@/app/_services/addForm";
// import { getForms } from "./_services/getForms";
// import { getFormById } from "./_services/getOneForm";
// import { addSubmissionToForm } from "./_services/addSubmissions";
// import Navbar from "./_components/Navbar";

export default function Home() {

  // getForms();
  // getFormById("nh2HMWq59KUgLmQfdcCf");
  // const submission = {
  //   userId: "user123",
  //   answers: [
  //     { questionId: "q1", answer: "John Doe" },
  //     { questionId: "q2", answer: "25" },
  //   ],
  // };
  // addSubmissionToForm("nh2HMWq59KUgLmQfdcCf", submission);

  return (
    <>
      <Navbar />
      <Header />
      <Footer />
    </>
  );
}
