import BlogSlider from "@/components/sections/BlogSlider";
import FaqSection from "@/components/sections/FaqSection";
import FeatureCard from "@/components/sections/FeatureCard";
import Hero from "@/components/sections/HomeHero";
import QuickStartIntegration from "@/components/sections/QuickStartIntegration";
import Services from "@/components/sections/Services";
import { SessionExpiredNotification } from "@/features/auth/components/session-expired-notification";

export default function Home() {
  return (
    <>
      <SessionExpiredNotification />
      <Hero />
      <Services />
      <FeatureCard />
      <FaqSection />
      <QuickStartIntegration />
      <BlogSlider />
    </>
  );
}
