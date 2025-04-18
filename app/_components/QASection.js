"use client";
import { useState } from "react";
import styles from "./components.module.css";
import { ChevronDown } from "lucide-react";

const QASection = () => {
  const [activeId, setActiveId] = useState();

  const toggleItem = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const qaData = [
    {
      id: 1,
      question: "How do I create a new form?",
      answer:
        "Click the 'Add New Form' button on your dashboard. You can then customize your form with different question types and settings.",
    },
    {
      id: 2,
      question: "Can I share my forms with others?",
      answer: "Yes! Every form you create gets a unique shareable link.",
    },
    {
      id: 3,
      question: "What types of questions can I add?",
      answer:
        "We support multiple choice, text answers for now. New question types are added regularly.",
    },
    {
      id: 4,
      question: "How do I view responses?",
      answer:
        "All responses are collected in your dashboard. You can view them individually",
    },
    // {
    //   id: 5,
    //   question: "Is my data secure?",
    //   answer:
    //     "Absolutely. We use end-to-end encryption and comply with GDPR regulations. Your data never leaves our secure servers without your permission.",
    // },
  ];

  return (
    <section className={styles.qs_section} id="faq">
      <div className={styles.qs_container}>
        <div className={styles.qs_header}>
          <h2 className={styles.qs_title}>Frequently Asked Questions</h2>
          <p className={styles.qs_subtitle}>
            Everything you need to know about creating and managing forms.
            Can&apos;t find the answer you&apos;re looking for? Contact our
            support team.
          </p>
        </div>

        <div className={styles.qs_accordion}>
          {qaData.map((item) => (
            <div
              key={item.id}
              className={`${styles.qs_item} ${
                activeId === item.id ? styles.qs_active : ""
              }`}
            >
              <div
                className={styles.qs_itemHeader}
                onClick={() => toggleItem(item.id)}
              >
                <h3 className={styles.qs_question}>{item.question}</h3>
                <ChevronDown className={styles.icon} size={20} />
              </div>
              <div className={styles.qs_answer}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QASection;
