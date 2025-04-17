import FormHeader from "./_components/FormHeader";
import QuestionList from "./_components/QuestionList";
import FormSubmission from "./_components/FormSubmission";
import { getFormById } from "@/services/getFormById";
import styles from "./FormStyles.module.css";
import { getForms } from "@/services/getForms";
import { headers } from "next/headers";

export async function generateStaticParams() {
  const forms = await getForms();
  return forms?.map((form) => ({ formId: form.formId }));
}

async function checkIsSubmitted() {
  try {
    const headersList = await headers(); // ✅ await here
    const referer = headersList.get("referer");

    if (referer) {
      const refererUrl = new URL(referer);
      const refererIsSubmitted = refererUrl.searchParams.get("isSubmitted");
      if (refererIsSubmitted === "true") {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking submission status:", error);
    return false;
  }
}

export default async function FormPage({ params, searchParams }) {
  const asyncParams = await params; // ✅ await the params object
  const asyncSearchParams = await searchParams; // ✅ await the searchParams object

  const { formId } = asyncParams;

  // ✅ First try query param
  const isSubmitted =
    asyncSearchParams?.isSubmitted === "true"
      ? true
      : await checkIsSubmitted();

  const form = await getFormById(formId);

  if (!form) {
    return (
      <div className={styles.formContainer}>
        <h1 className={styles.form_not_found}>Form Not Found</h1>
      </div>
    );
  }

  if (form.isLocked) {
    return (
      <div className={styles.formContainer}>
        <h1 className={styles.form_not_found}>Form Is Locked</h1>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.thankYouMessage}>
          <h2>Thank You for Your Submission!</h2>
          <p>Your response has been recorded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <FormHeader
        title={form.title}
        description={form.description}
        isLocked={form.isLocked}
      />
      <InteractiveForm form={form} formId={formId} />
    </div>
  );
}

function InteractiveForm({ form, formId }) {
  return (
    <>
      <QuestionList questions={form.questions} formId={formId} />
      <FormSubmission formId={formId} isLocked={form.isLocked} />
    </>
  );
}
