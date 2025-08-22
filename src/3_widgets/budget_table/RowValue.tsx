"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { useSettings } from "@/5_entities";
import { getRightFormatedNumber } from "@/3_widgets/budget_expense_table/uitls";

interface RowValueProps {
  value: string;
  isEditing: boolean;
  onValueChange: (newValue: string) => void;
  onClick: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  onUpdate: () => void;
}

export function RowValue({
  value,
  isEditing,
  onValueChange,
  onClick,
  onUpdate,
}: RowValueProps) {
  const { getDecimalSeparator, getValueSeparator } = useSettings();
  const [inputWidth, setInputWidth] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 15);
    }
  }, [value, isEditing, getDecimalSeparator, getValueSeparator]);

  if (!isEditing) {
    return (
      <p className="w-full text-right cursor-pointer" onClick={onClick}>
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
        {getRightFormatedNumber(
          String(value),
          getDecimalSeparator(),
          getValueSeparator()
        )}
      </span>
      <div className="w-fit justify-self-end">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onBlur={onUpdate}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") e.currentTarget.blur();
          }}
          autoFocus
          style={{ width: `${inputWidth}px` }}
          className="px-4 py-2 border border-border rounded-max bg-background text-right"
        />
      </div>
    </>
  );
}
