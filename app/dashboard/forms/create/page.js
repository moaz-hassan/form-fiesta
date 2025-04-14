"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AddQuestionContainer from "./_createFormComponents/addQuestionContainer";

function CreateForm() {
  const navigate = useRouter();

  useEffect(() => {
    if (localStorage.getItem("userInfo") === null) {
      navigate("/");
      toast.error("You are not authorized to view this page.");
      return;
    }
  }, [navigate]);
  return (
    <>
      <AddQuestionContainer />
    </>
  );
}

export default CreateForm;
