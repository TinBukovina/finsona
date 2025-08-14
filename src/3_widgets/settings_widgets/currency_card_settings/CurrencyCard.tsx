"use client";

import React from "react";

import {
  CurrencyCardLoader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/6_shared";
import { UserSettings, useSettings } from "@/5_entities/user";

export default function CurrencyCard() {
  const { settings, updateUser, isSyncing } = useSettings();
  const { addToast } = useToast();

  const handleCurrencyChange = async (
    newCurrency: UserSettings["default_currency"]
  ) => {
    const result = await updateUser({
      default_currency: newCurrency,
    });

    if (result.success) {
      addToast("Currency updated!", "success");
    } else {
      console.log(result.error);
      addToast("Failed to update currency.", "error");
    }
  };

  if (isSyncing) {
    return <CurrencyCardLoader />;
  }

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      <h2 className="text-h6 font-semibold">Currency Settings</h2>
      <p className="text-muted-foreground">Change currency of your account.</p>

      <Select
        value={settings.default_currency || "EUR"}
        onValueChange={handleCurrencyChange}
      >
        <SelectTrigger className="w-fit text-normal">
          <SelectValue
            placeholder="Currency"
            className="placeholder:card-foreground "
          />
        </SelectTrigger>
        <SelectContent className="bg-popover p-[2px]">
          <SelectItem value="EUR" className="">
            EUR
          </SelectItem>
          <SelectItem value="USD" className="">
            USD
          </SelectItem>
          <SelectItem value="GBP" className="">
            GBP
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
