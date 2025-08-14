"use client";

import React from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/6_shared";
import { UserSettings, useSettings } from "@/5_entities/user";

export function ChangeLanguage() {
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations("settings_appearance_page");
  const { settings, updateUser, isSyncing } = useSettings();
  const { addToast } = useToast();

  const handleLanguageChange = async (
    newLanguage: UserSettings["language"]
  ) => {
    const result = await updateUser({ language: newLanguage });

    if (result.success) {
      addToast("Language updated!", "success");
      router.push(pathname, { locale: newLanguage });
    } else {
      addToast(result.error || "Failed to update language.", "error");
    }
  };

  return (
    <Select
      value={settings.language}
      onValueChange={handleLanguageChange}
      disabled={isSyncing}
    >
      <SelectTrigger className="w-fit text-normal">
        <SelectValue placeholder={t("language_placeholder")} />
      </SelectTrigger>
      <SelectContent className="bg-popover p-[2px]">
        <SelectItem value="en">{t("language_en_option")}</SelectItem>
        <SelectItem value="hr">{t("language_hr_option")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
