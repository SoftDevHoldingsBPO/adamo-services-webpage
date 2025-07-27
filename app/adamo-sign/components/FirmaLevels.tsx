import { useTranslations } from "next-intl";

function FirmaCard({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: string;
}) {
  return (
    <div className="p-8 lg:px-10 rounded-4xl bg-neutral-100">
      <div className="flex items-center gap-6">
        <h4 className="text-neutral-700 font-display font-semibold text-[17px] leading-[21px]">
          {title}
        </h4>

        <div className="py-2.5 px-4 bg-neutral-200 rounded-xl text-neutral-900 font-medium text-sm">
          {type}
        </div>
      </div>

      <p className="mt-[22px]">{description}</p>
    </div>
  );
}

export function FirmaLevels() {
  const t = useTranslations("adamoSign.firma");

  const levels = ["simple", "robust", "integrity"];

  return (
    <section className="py-16 lg:pt-[120px] lg:pb-[160px]">
      <div className="container">
        <div className="grid lg:grid-cols-2">
          <h2 data-inview className="heading-2">
            {t("title")}
          </h2>
        </div>

        <div className="mt-10 lg:mt-14 grid md:grid-cols-2 gap-8">
          {levels.map((level, index) => (
            <div
              data-inview
              data-inview-delay={index % 2 === 1 ? 0.2 : 0}
              key={level}
              className={index === 2 ? "md:col-span-2" : ""}
            >
              <FirmaCard
                key={level}
                title={t(`${level}.title`)}
                description={t(`${level}.description`)}
                type={t(`${level}.type`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
