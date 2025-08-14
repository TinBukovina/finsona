"use client";

import React from "react";

import {
  LanguageCardLoader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/6_shared";
import { UserSettings, useSettings } from "@/5_entities/user";
import { useTranslations } from "next-intl";

export default function LanguageCard() {
  const t = useTranslations("settings_appearance_page");
  const { settings, updateUser, isSyncing } = useSettings();
  const { addToast } = useToast();

  const handleLanguageChange = async (
    newLanguage: UserSettings["language"]
  ) => {
    const result = await updateUser({
      language: newLanguage,
    });

    if (result.success) {
      addToast("Language updated!", "success");
    } else {
      console.log(result.error);
      addToast("Failed to update language.", "error");
    }
  };

  if (isSyncing) {
    return <LanguageCardLoader />;
  }

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      <h2 className="text-h6 font-semibold">{t("language_title")}</h2>
      <p className="text-muted-foreground">{t("language_description")}</p>

      <Select
        value={String(settings.language)}
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className="w-fit text-normal">
          <SelectValue
            placeholder={t("language_placeholder")}
            className="placeholder:card-foreground "
          />
        </SelectTrigger>
        <SelectContent className="bg-popover p-[2px]">
          <SelectItem value="en" className="">
            {t("language_en_option")}
          </SelectItem>
          <SelectItem value="hr" className="">
            {t("language_hr_option")}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
