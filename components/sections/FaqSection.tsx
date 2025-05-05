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

  return (
    <section className="container py-8 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <h2 className="heading-2 mb-6 lg:mb-0 lg:py-10">{t("title")}</h2>
        <Accordion type="single" collapsible>
          {faqItems.map((item) => (
            <FaqAccordionItem key={item.question} item={item} />
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
