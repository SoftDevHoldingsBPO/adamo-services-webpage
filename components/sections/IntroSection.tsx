import { cn } from "@/lib/utils";

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
    <section className={cn("container", className)} {...rest}>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <h2 data-inview className="heading-2 lg:py-10">
          {title}
        </h2>
        <p
          data-inview
          data-inview-delay={0.2}
          className="py-6 lg:py-10 md:text-lg"
        >
          {description}
        </p>
      </div>
    </section>
  );
};
export default IntroSection;
