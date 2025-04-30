import { useTranslations } from "next-intl";

import { ArrowRight } from "../icon";
import { Button } from "../ui/button";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <section
      className="h-screen min-h-[720px] max-h-[960px] mx-auto md:px-4 lg:px-6 md:pt-[88px] md:pb-6"
      aria-labelledby="hero-title"
    >
      <div className="h-full px-4 md:rounded-4xl overflow-hidden relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-20 hero-gradient"
          role="presentation"
        >
          &nbsp;
        </div>
        <video
          aria-hidden="true"
          className="absolute inset-0 z-10 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          title="Background video"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          role="region"
          className="h-full relative z-30 max-w-[809px] mx-auto pt-32 md:text-center md:pt-48"
        >
          <h1 id="hero-title" className="heading-1 text-white">
            {t.rich("title", {
              accent: (chunks) => (
                <span className="text-tertiary">{chunks}</span>
              ),
            })}
          </h1>
          <p className="text-white text-lg mt-12">{t("subtitle")}</p>
          <div
            className="mt-28 flex flex-col items-start gap-8 md:flex-row md:justify-center"
            role="group"
            aria-label="Hero actions"
          >
            <Button variant="secondary" aria-label={t("button1")}>
              {t("button1")}
            </Button>
            <Button variant="ghost" aria-label={t("button2")}>
              {t("button2")} <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
