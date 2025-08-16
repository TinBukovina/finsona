"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { useToast } from "@/6_shared";

interface EditableNameProps {
  value: string;
  isEditing: boolean;
  isClickInside: React.RefObject<boolean>;
  onValueChange: (newValue: string) => void;
  onClick: (e: React.MouseEvent) => void;
  onBlurAfterEdit: () => void;
}

export function RowValue({
  value,
  isEditing,
  isClickInside,
  onValueChange,
  onClick,
  onBlurAfterEdit,
}: EditableNameProps) {
  const { addToast } = useToast();
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
    if (value.trim() === "") {
      if (isClickInside.current) {
        addToast("You need to eneter a number!", "error");
        inputRef.current?.focus();

        return;
      }

      onValueChange("0");
      return;
    }

    // JS doesn't understand , in Number() function
    const normalizedValue = value.replace(",", ".");

    const numberRegex = /^-?\d+(\.\d+)?$/;
    if (numberRegex.test(normalizedValue)) {
      onValueChange(normalizedValue);
    } else {
      if (isClickInside.current) {
        addToast("You need to eneter a number!", "error");
        inputRef.current?.focus();

        return;
      }

      onValueChange("0");
    }

    onBlurAfterEdit();
  };

  if (!isEditing) {
    return (
      <p onClick={onClick} className="w-full text-right">
        ${value}
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
          onChange={(e) => onValueChange(e.target.value)}
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
