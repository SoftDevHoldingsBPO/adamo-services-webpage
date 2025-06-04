"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define a type for FAQ items
interface FaqItem {
  question: string;
  answer: string;
}

const FaqAccordionItem = ({ item }: { item: FaqItem }) => (
  <AccordionItem key={item.question} value={item.question}>
    <AccordionTrigger
      aria-controls={`faq-answer-${item.question}`}
      aria-expanded={false}
      className="text-left"
    >
      {item.question}
    </AccordionTrigger>
    <AccordionContent
      id={`faq-answer-${item.question}`}
      role="region"
      aria-labelledby={`faq-question-${item.question}`}
      className="text-base"
    >
      {item.answer}
    </AccordionContent>
  </AccordionItem>
);

const FaqSection = () => {
  const t = useTranslations("faq");
  const faqItems = Array.isArray(t.raw("items"))
    ? (t.raw("items") as FaqItem[])
    : [];

  if (!faqItems.length) return null;

  useGSAP(() => {
    const items = document.querySelectorAll("[data-faq-item]");
    if (!items.length) return;
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
            // markers: true, // Uncomment for debugging
          },
          delay: i * 0.1,
        },
      );
    });
  });

  return (
    <section id="faqs" className="container py-8 md:py-10 scroll-mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <h2 data-faq-item className="heading-2 mb-6 lg:mb-0 lg:py-10">
          {t("title")}
        </h2>
        <Accordion type="single" collapsible>
          {faqItems.map((item) => (
            <div data-faq-item key={item.question}>
              <FaqAccordionItem item={item} />
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
