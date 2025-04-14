import FormHeader from "./_components/FormHeader";
import QuestionList from "./_components/QuestionList";
import FormSubmission from "./_components/FormSubmission";
import Spinner from "@/app/_components/Spinner";
import { getFormById } from "@/app/_services/getFormById";
import styles from "./FormStyles.module.css";
import { getForms } from "@/app/_services/getForms";

export async function generateStaticParams() {
  const forms = await getForms();
  return forms?.map((form) => ({ formId: form.formId }));
}

export default async function FormPage({ params }) {
  const { formId } = await params;
  const form = await getFormById(formId);
console.log(form);

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
