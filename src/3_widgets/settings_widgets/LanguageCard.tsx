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

export default function LanguageCard() {
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
      <h2 className="text-h6 font-semibold">Language</h2>
      <p className="text-muted-foreground">
        Choose the preferred language for your account.
      </p>

      <Select
        value={String(settings.language)}
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className="w-fit text-normal">
          <SelectValue
            placeholder="Language"
            className="placeholder:card-foreground "
          />
        </SelectTrigger>
        <SelectContent className="bg-popover p-[2px]">
          <SelectItem value="en" className="">
            English
          </SelectItem>
          <SelectItem value="hr" className="">
            Croatian
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
