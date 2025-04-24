import { mainLinks } from "@/constants/navigation";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { Logo } from "../icon";

const Footer = () => {
  const t = useTranslations("nav");

  return (
    <footer className="container py-10 flex flex-col gap-10 md:flex-row md:justify-between">
      <div className="flex flex-col items-start gap-6">
        <Link href="/">
          <Logo className="w-[26.76px] h-6" />
        </Link>

        <p className="text-sm">
          Adamo Services Todos los derechos reservados &copy;
        </p>

        <ul className="flex gap-6 flex-wrap">
          {mainLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm transition-colors text-neutral-500 hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>lang</div>
    </footer>
  );
};

export default Footer;
