import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/6_shared";

export default function PayheckCard() {
  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      <h2 className="text-h6 font-semibold">Financial month start</h2>
      <p className="text-muted-foreground">
        Choose the day in a month when you want to start your budget.
      </p>

      <Select>
        <SelectTrigger className="w-fit text-normal">
          <SelectValue
            placeholder="Date"
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
