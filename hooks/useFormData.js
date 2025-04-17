import { useState, useEffect } from "react";
import { getFormById } from "@/services/getFormById";

export function useFormData(formId) {
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formData = await getFormById(formId);
        setForm(formData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  return { form, isLoading, error };
}
