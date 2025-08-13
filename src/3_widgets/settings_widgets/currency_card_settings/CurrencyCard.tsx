import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/6_shared";

export default function CurrencyCard() {
  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      <h2 className="text-h6 font-semibold">Currency Settings</h2>
      <p className="text-muted-foreground">Change currency of your account.</p>

      <Select>
        <SelectTrigger className="w-fit text-normal">
          <SelectValue
            placeholder="Currency"
            className="placeholder:card-foreground "
          />
        </SelectTrigger>
        <SelectContent className="bg-popover p-[2px]">
          <SelectItem value="light" className="">
            EUR
          </SelectItem>
          <SelectItem value="dark" className="">
            USD
          </SelectItem>
          <SelectItem value="system" className="">
            GBP
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
