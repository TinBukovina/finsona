import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { CreateBudgetButton } from "@/4_features/create_budget";

interface NoBudgetThisMonthFuturePageProps {
  customMonth: number;
}

export function NoBudgetThisMonthFuturePage({
  customMonth,
}: NoBudgetThisMonthFuturePageProps) {
  const t = useTranslations("no_budget_this_month_future_page");

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

          <p className="text-h6">{t("text")}</p>
        </div>
        <CreateBudgetButton
          customMonth={
            customMonth && customMonth > 0 && customMonth <= 12
              ? customMonth
              : null
          }
          className="px-4 bg-primary text-primary-foreground fill-primary-foreground font-semibold hover:bg-primary/90 hover:fill-primary-foreground hover:scale-103"
        >
          {t("button")}
        </CreateBudgetButton>
      </div>
    </div>
  );
}
