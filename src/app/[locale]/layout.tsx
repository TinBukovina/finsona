import { routing } from "i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import AppContent from "./AppContent";

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
    <div className="w-100% h-dvh">
      <NextIntlClientProvider>
        <AppContent>{children}</AppContent>
      </NextIntlClientProvider>
    </div>
  );
}
