import { useTranslations } from "next-intl";
import Player from "next-video/player";

const ContactHero = () => {
  const t = useTranslations("contact");

  return (
    <div
      data-animation-opacity
      className="h-screen min-h-[890px] max-h-[960px] md:px-4 lg:px-6 md:mt-[88px] md:pb-6 md:h-[calc(100vh-88px)] relative"
    >
      <div
        className="h-full px-4 md:rounded-4xl overflow-hidden relative pt-32 lg:pt-48 bg-primary"
        style={{
          background:
            "linear-gradient(180deg, rgba(17, 25, 39, 0.95) 32.99%, rgba(17, 25, 39, 0.00) 97.98%)",
        }}
      >
        <div className="max-w-3xl mx-auto md:text-center text-white space-y-12">
          <h1 data-animation="1" className="heading-2">
            {t("title")}
          </h1>
          <p data-animation="2" className="md:text-lg">
            {t("description")}
          </p>
        </div>

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

export default ContactHero;
