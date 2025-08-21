"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { addSeparatorToStringNumber, useToast } from "@/6_shared";
import { useSettings } from "@/5_entities";
import { getRightFormatedNumber } from "@/3_widgets/budget_expense_table/uitls";

interface EditableNameProps {
  value: string;
  isEditing: boolean;
  isClickInside: React.RefObject<boolean>;
  onValueChange: (newValue: string) => void;
  onClick: (e: React.MouseEvent) => void;
  onBlurAfterEdit: () => void;
  setTrigerBudgetItemUpdateInDatabase: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export function RowValue({
  value,
  isEditing,
  isClickInside,
  onValueChange,
  onClick,
  onBlurAfterEdit,
  setTrigerBudgetItemUpdateInDatabase,
}: EditableNameProps) {
  const { addToast } = useToast();
  const { getDecimalSeparator, getValueSeparator } = useSettings();

  const [inputWidth, setInputWidth] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 5);
    }
  }, [value, isEditing]);

  const handleBlur = () => {
    // If value is empty
    let valueString = value;
    if (typeof valueString === "number") {
      valueString = String(value);
    }

    if (String(valueString).trim() === "") {
      if (isClickInside.current) {
        addToast("You need to eneter a number!", "error");
        inputRef.current?.focus();

        return;
      }

      onValueChange("0" + getDecimalSeparator() + "00");
      return;
    }

    // JS doesn't understand , in Number() function
    const normalizedValue = valueString.replace(",", ".");
    const numberRegex = /^-?\d+(\.\d+)?$/;

    if (!numberRegex.test(normalizedValue) && normalizedValue !== "") {
      if (isClickInside.current) {
        addToast("You need to enter a number!", "error");
        inputRef.current?.focus();

        return;
      }
      onValueChange("0" + getDecimalSeparator() + "00");
      return;
    }

    const parts = normalizedValue.split(".");
    const integerPart = parts[0] || "0";
    const decimalPart = parts[1];

    const formattedIntegerPart = addSeparatorToStringNumber(
      integerPart,
      getValueSeparator()
    );

    const formattedDecimalPart = (decimalPart || "").padEnd(2, "0").slice(0, 2);

    const finalFormattedValue =
      formattedIntegerPart + getDecimalSeparator() + formattedDecimalPart;

    console.log(finalFormattedValue);
    setTrigerBudgetItemUpdateInDatabase(true);

    onBlurAfterEdit();
  };

  if (!isEditing) {
    return (
      <p onClick={onClick} className="w-full text-right">
        $
        {getRightFormatedNumber(
          String(value),
          getDecimalSeparator(),
          getValueSeparator()
        )}
      </p>
    );
  }

  return (
    <>
      <span ref={spanRef} className="absolute invisible whitespace-pre px-4">
        {value}
      </span>
      <div className="w-fit justify-self-end">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onValueChange(e.target.value);
          }}
          onBlur={handleBlur}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") e.currentTarget.blur();
          }}
          autoFocus
          style={{ width: `${inputWidth}px` }}
          className="px-4 py-2 border border-border rounded-max"
        />
      </div>
    </>
  );
}
