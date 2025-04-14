'use client';
import { useState, useEffect, useCallback } from 'react';

export function useFormStorage(formId, questions = []) {
  // Memoize the initialization function
  const initializeAnswers = useCallback((questions) => {
    return questions.map(q => ({
      questionId: q.id,
      questionText: q.title,
      answer: null
    }));
  }, []);

  const [answers, setAnswers] = useState(() => {
    // Initialize state with either stored answers or default structure
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`form_${formId}_answers`);
      return stored ? JSON.parse(stored) : initializeAnswers(questions);
    }
    return initializeAnswers(questions);
  });

  useEffect(() => {
    if (answers.length > 0 && typeof window !== 'undefined') {
      localStorage.setItem(`form_${formId}_answers`, JSON.stringify(answers));
    }
  }, [answers, formId]);

  useEffect(() => {
    if (questions.length > 0 && answers.length === 0) {
      setAnswers(initializeAnswers(questions));
    }
  }, [questions, answers.length, initializeAnswers]);

  const updateAnswer = useCallback((index, value) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = { ...newAnswers[index], answer: value };
      return newAnswers;
    });
  }, []);

  const clearAnswers = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`form_${formId}_answers`);
    }
    setAnswers(initializeAnswers(questions));
  }, [formId, initializeAnswers, questions]);

  return { 
    answers, 
    updateAnswer, 
    clearAnswers 
  };
}
