import { cn } from "@/lib/utils";

import ScrollAnimation from "../ScrollAnimation";

interface IntroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

const IntroSection = ({
  title,
  description,
  className,
  ...rest
}: IntroSectionProps) => {
  return (
    <ScrollAnimation>
      <section className={cn("container", className)} {...rest}>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <h2 data-scroll-animation="fade-up" className="heading-2 lg:py-10">
            {title}
          </h2>
          <p
            data-scroll-animation="fade-up"
            className="py-6 lg:py-10 md:text-lg"
          >
            {description}
          </p>
        </div>
      </section>
    </ScrollAnimation>
  );
};
export default IntroSection;
