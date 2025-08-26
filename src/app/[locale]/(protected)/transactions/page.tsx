import React from "react";

import { TransactionPageClientView } from "@/2_Pages";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("transactions_page");

  return (
    <div className="flex-1 flex flex-col gap-6 w-full h-full p-3 sm:px-6 sm:py-4 scrollbar-none sm:mb-0 overflow-auto">
      {/*TITLE*/}
      <h4 className="hidden sm:block text-h4 font-bold">{t("title")}</h4>

      <TransactionPageClientView />
    </div>
  );
}
