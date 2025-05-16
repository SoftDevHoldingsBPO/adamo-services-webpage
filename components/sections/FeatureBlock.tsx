import { cn } from "@/lib/utils";

interface FeatureBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

const FeatureBlock = ({ title, description, className }: FeatureBlockProps) => {
  return (
    <section className={cn("container py-10 lg:py-12", className)}>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <h2 className="heading-2 lg:py-10">{title}</h2>
        <p className="text-gray-600 py-6 lg:py-10">{description}</p>
      </div>
    </section>
  );
};
export default FeatureBlock;
