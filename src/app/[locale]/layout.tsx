import { routing } from "i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import AppContent from "./AppContent";
import { Providers } from "@/1_app";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <div className="w-full h-dvh">
      <NextIntlClientProvider>
        <Providers>
          <AppContent>{children}</AppContent>
        </Providers>
      </NextIntlClientProvider>
    </div>
  );
}
