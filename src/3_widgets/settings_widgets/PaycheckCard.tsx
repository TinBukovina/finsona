"use client";

import React from "react";

import {
  PaycheckCardLoader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/6_shared";
import { useSettings } from "@/5_entities/user";
import { useTranslations } from "next-intl";

export default function PayheckCard() {
  const t = useTranslations("settings_application_page");
  const { settings, updateUser, isSyncing } = useSettings();
  const { addToast } = useToast();

  const handlePaycheckChange = async (new_month_start_day: string) => {
    const result = await updateUser({
      month_start_day: Number(new_month_start_day),
    });

    if (result.success) {
      addToast("Month start day updated!", "success");
    } else {
      console.log(result.error);
      addToast("Failed to update month start day.", "error");
    }
  };

  if (isSyncing) {
    return <PaycheckCardLoader />;
  }

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      <h2 className="text-h6 font-semibold">{t("paycheck_start_title")}</h2>
      <p className="text-muted-foreground">{t("paycheck_start_description")}</p>

      <Select
        value={String(settings.month_start_day)}
        onValueChange={handlePaycheckChange}
      >
        <SelectTrigger className="w-fit text-normal">
          <SelectValue
            placeholder={t("paycheck_start_placeholder")}
            className="placeholder:card-foreground "
          />
        </SelectTrigger>
        <SelectContent className="bg-popover p-[2px]">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <SelectItem key={day} value={String(day)} className="">
              {String(day).padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
