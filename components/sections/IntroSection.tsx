import { cn } from "@/lib/utils";

interface IntroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

const IntroSection = ({ title, description, className }: IntroSectionProps) => {
  return (
    <section className={cn("container", className)}>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <h2 className="heading-2 lg:py-10">{title}</h2>
        <p className="text-gray-600 py-6 lg:py-10">{description}</p>
      </div>
    </section>
  );
};
export default IntroSection;
