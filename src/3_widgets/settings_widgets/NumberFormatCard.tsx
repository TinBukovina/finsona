"use client";

import React from "react";

import {
  NumberFormatCardLoader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/6_shared";
import { UserSettings, useSettings } from "@/5_entities/user";
import { useTranslations } from "next-intl";

export default function NumberFormatCard() {
  const t = useTranslations("settings_application_page");
  const { settings, updateUser, isSyncing, getActiveCurrency } = useSettings();
  const { addToast } = useToast();

  const handleFormatChange = async (
    newFormat: UserSettings["number_format"]
  ) => {
    const result = await updateUser({ number_format: newFormat });

    if (result.success) {
      addToast("Number format updated!", "success");
    } else {
      console.log(result.error);
      addToast("Failed to update format.", "error");
    }
  };

  if (isSyncing) {
    return <NumberFormatCardLoader />;
  }

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      <h2 className="text-h6 font-semibold">{t("number_format_title")}</h2>
      <p className="text-muted-foreground">{t("number_format_description")}</p>

      <Select value={settings.number_format} onValueChange={handleFormatChange}>
        <SelectTrigger className="w-fit text-normal">
          <SelectValue
            placeholder={t("number_format_placeholder")}
            className="placeholder:card-foreground "
          />
        </SelectTrigger>
        <SelectContent className="bg-popover p-[2px]">
          <SelectItem value="EU" className="">
            {getActiveCurrency()}1.234,56
          </SelectItem>
          <SelectItem value="US" className="">
            {getActiveCurrency()}$1,234.56
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
