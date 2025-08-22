"use client";

import React, { useRef, useLayoutEffect, useState } from "react";

interface RowNameProps {
  value: string;
  isEditing: boolean;
  onValueChange: (newValue: string) => void;
  onClick: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  onUpdate: (previusMode) => void;
}

export function RowName({
  value,
  isEditing,
  onValueChange,
  onClick,
  onUpdate,
}: RowNameProps) {
  const [inputWidth, setInputWidth] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 10);
    }
  }, [value, isEditing]);

  if (!isEditing) {
    return (
      <p className="cursor-pointer" onClick={onClick}>
        {value}
      </p>
    );
  }

  return (
    <>
      <span ref={spanRef} className="absolute invisible whitespace-pre px-4">
        {value}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onValueChange(e.target.value)}
        onBlur={onUpdate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") e.currentTarget.blur();
        }}
        autoFocus
        style={{ width: `${inputWidth}px` }}
        className="px-4 py-2 border border-border rounded-max bg-background"
      />
    </>
  );
}
