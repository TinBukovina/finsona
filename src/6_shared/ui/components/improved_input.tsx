"use client";

import { useState, useLayoutEffect, useRef } from "react";

interface IinputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  initialInputWidth?: number;
  placeholder?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
}

export function Iinput({
  value,
  setValue,
  initialInputWidth = 130,
  placeholder,
  ref,
}: IinputProps) {
  const [inputWidth, setInputWidth] = useState<number>(initialInputWidth);

  const spanForCalculatingInputWidth = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!spanForCalculatingInputWidth.current) return;

    if (!value || value.length <= 0) {
      setInputWidth(initialInputWidth);
      return;
    }

    setInputWidth(spanForCalculatingInputWidth.current.offsetWidth + 5);
  }, [value, initialInputWidth]);

  return (
    <>
      <span
        ref={spanForCalculatingInputWidth}
        className="absolute invisible whitespace-pre px-4"
      >
        {value}
      </span>
      <input
        ref={ref}
        placeholder={placeholder ? placeholder : ""}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") e.currentTarget.blur();
        }}
        style={{ width: `${inputWidth}px` }}
        className="px-4 py-2 border border-border rounded-max"
      />
    </>
  );
}
