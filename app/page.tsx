import BlogSlider from "@/components/sections/BlogSlider";
import FaqSection from "@/components/sections/FaqSection";
import FeatureCard from "@/components/sections/FeatureCard";
import Hero from "@/components/sections/Hero";
import QuickStartIntegration from "@/components/sections/QuickStartIntegration";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeatureCard />
      <FaqSection />
      <QuickStartIntegration />
      <BlogSlider />
    </>
  );
}
