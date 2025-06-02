import Providers from "@/providers/providers";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

import Preloader from "@/components/layout/Preloader";
import MouseFollowerCursor from "@/components/ui/MouseFollowerCursor";
import WaButton from "@/components/ui/WaButton";

import { inter, sora } from "./fonts";
import "./globals.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/mouse-follower@1/dist/mouse-follower.min.css"
        />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} antialiased flex flex-col min-h-dvh`}
      >
        <MouseFollowerCursor />
        <Providers>
          <NextIntlClientProvider>
            <Preloader />
            {children}
            <WaButton />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
