import { useTranslations } from "next-intl";

import AdamoPayHero from "@/components/sections/AdamoPayHero";
import ExchangeBanner from "@/components/sections/ExchangeBanner";
import FeatureBlock from "@/components/sections/FeatureBlock";

export default function Page() {
  const t = useTranslations("adamoPay");

  return (
    <>
      <AdamoPayHero />
      <FeatureBlock
        className="my-10"
        title={t("feature1.title")}
        description={t("feature1.description")}
      />
      <ExchangeBanner />
      <FeatureBlock
        className="my-10"
        title={t("feature2.title")}
        description={t("feature2.description")}
      />
    </>
  );
}
