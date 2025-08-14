import React, { PropsWithChildren } from "react";

import { SettingsNavigation } from "@/3_widgets";
import { useTranslations } from "next-intl";

export default function Layout({ children }: PropsWithChildren) {
  const t = useTranslations("settings_page");

  return (
    <div className="flex flex-col gap-4 w-full h-full px-4 py-3 overflow-auto">
      {/*Title*/}
      <h1 className="text-foreground text-h5 font-semibold">{t("title")}</h1>

      <SettingsNavigation />

      {children}
    </div>
  );
}
