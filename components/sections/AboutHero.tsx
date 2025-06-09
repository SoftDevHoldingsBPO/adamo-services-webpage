import { useTranslations } from "next-intl";
import Player from "next-video/player";

const AboutHero = () => {
  const t = useTranslations("about");

  return (
    <div data-inview className="md:px-4 lg:px-6 md:mt-[88px] md:pb-6 relative">
      <div className="h-full px-4 md:rounded-4xl overflow-hidden relative pt-32 pb-[138px] lg:pt-48 lg:pb-[106px] ">
        <div className="max-w-3xl mx-auto md:text-center text-white space-y-12 relative z-20">
          <h1 data-inview className="heading-2">
            {t("hero.title")}
          </h1>
          <p data-inview data-inview-delay={0.15} className="md:text-lg">
            {t("hero.description")}
          </p>
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(17, 25, 39, 0.9) 43.47%, rgba(17, 25, 39, 0.00) 100%)",
          }}
        />

        <Player
          src="/video/contact-hero.mp4"
          autoPlay
          muted
          loop
          controls={false}
          className="absolute inset-0 w-full h-full object-cover -z-10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default AboutHero;
