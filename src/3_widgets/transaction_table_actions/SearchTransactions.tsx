"use client";

import React, { useState } from "react";

import { cn, IconTemplate, search_r_400 } from "@/6_shared";

interface SearchTransactionsProps {
  onEnter: (value: string) => void;
}

export function SearchTransactions({ onEnter }: SearchTransactionsProps) {
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleBlur = () => {
    onEnter(value?.trim() || "");
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <label
      htmlFor="transaction-search"
      className={cn(
        "flex items-center gap-1 px-4 py-2 min-w-[330px]",
        "border border-border rounded-max",
        "text-muted-foreground fill-primary",
        "cursor-text transition-all",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
      )}
    >
      <IconTemplate svg={search_r_400()} width="24px" height="24px" />
      <input
        id="transaction-search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        placeholder="Search transactions by description"
        onKeyDown={handleOnKeyDown}
        onBlur={handleBlur}
      />
    </label>
  );
}
