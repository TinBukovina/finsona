import {
  capitalizeFirstLetter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/6_shared";
import React from "react";

interface TransactionsFilterProps {
  text: string;
  values: string[];
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
}

export function TransactionsFilter({
  text,
  values,
  value,
  onChange,
}: TransactionsFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value === "all") {
          onChange(undefined);
          return;
        }
        onChange(value);
      }}
      disabled={false}
    >
      <SelectTrigger
        svgClr={"foreground"}
        className="w-fit bg-transparent dark:bg-transparent text-normal"
      >
        <SelectValue placeholder={text} />
      </SelectTrigger>
      <SelectContent className="bg-popover p-[2px]">
        {values.map((el) => (
          <SelectItem key={el} value={el}>
            {capitalizeFirstLetter(el)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
