import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/6_shared";

export default function NumberFormatCard() {
  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      <h2 className="text-h6 font-semibold">Number format</h2>
      <p className="text-muted-foreground">
        Choose number format for your account.
      </p>

      <Select>
        <SelectTrigger className="w-fit text-normal">
          <SelectValue
            placeholder="Number Format"
            className="placeholder:card-foreground "
          />
        </SelectTrigger>
        <SelectContent className="bg-popover p-[2px]">
          <SelectItem value="eu" className="">
            $1.234,56
          </SelectItem>
          <SelectItem value="us" className="">
            $1,234.56
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
