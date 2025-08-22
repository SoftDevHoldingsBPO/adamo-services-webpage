import { auth } from "@/auth";
import { BlogProvider } from "@/providers/BlogProvider";
import { NavigationProvider } from "@/providers/NavigationProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { ZodI18nProvider } from "@/providers/ZodI18nProvider";
import Providers from "@/providers/providers";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

import { SessionExpirationHandler } from "@/components/SessionExpirationHandler";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
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
  const session = await auth();

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
        <NavigationProvider>
          <Providers>
            <SessionProvider session={session}>
              {/* <SessionExpirationHandler /> */}
              <NextIntlClientProvider>
                <ZodI18nProvider>
                  <BlogProvider>
                    <Navbar user={session?.user} />
                    <Preloader />
                    <main className="flex-auto">{children}</main>
                    <Footer />
                    <WaButton />
                  </BlogProvider>
                </ZodI18nProvider>
              </NextIntlClientProvider>
            </SessionProvider>
          </Providers>
        </NavigationProvider>
      </body>
    </html>
  );
}
