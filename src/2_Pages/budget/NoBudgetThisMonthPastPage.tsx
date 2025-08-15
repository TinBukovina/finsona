import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@/6_shared";

interface NoBudgetThisMonthPastPageProps {
  handleBtnClick: () => void;
}

export function NoBudgetThisMonthPastPage({
  handleBtnClick,
}: NoBudgetThisMonthPastPageProps) {
  const t = useTranslations("no_budget_this_month_past_page");

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center gap-3">
          <Image
            width={200}
            height={200}
            src="/imgs/piggy_bank.png"
            alt="Piggy Bank"
          />

          <div className="flex flex-col gap-1 text-center">
            <p className="text-h6">{t("text")}</p>
            <p className="text-normal text-muted-foreground">{t("sub_text")}</p>
          </div>
        </div>
        <Button onClick={handleBtnClick}>{t("button")}</Button>
      </div>
    </div>
  );
}
