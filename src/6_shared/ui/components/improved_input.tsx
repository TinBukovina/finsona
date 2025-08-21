"use client";

import { cn } from "@/6_shared/lib";
import { useState, useLayoutEffect, useRef } from "react";

interface IinputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  initialInputWidth?: number;
  placeholder?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  disableAutoWidth?: boolean;
  className?: string;
  type?: string;
  onKeyDown?: () => void;
}

export function Iinput({
  value,
  setValue,
  initialInputWidth = 130,
  placeholder,
  ref,
  disableAutoWidth = false,
  className,
  type = "text",
  onKeyDown,
}: IinputProps) {
  const [inputWidth, setInputWidth] = useState<number>(initialInputWidth);

  const spanForCalculatingInputWidth = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!spanForCalculatingInputWidth.current || disableAutoWidth) return;

    if (!value || value.length <= 0) {
      setInputWidth(initialInputWidth);
      return;
    }

    setInputWidth(spanForCalculatingInputWidth.current.offsetWidth + 5);
  }, [value, initialInputWidth, disableAutoWidth]);

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
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value.replace("$", ""));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") {
            e.currentTarget.blur();

            if (onKeyDown) onKeyDown();
          }
        }}
        style={{ width: `${disableAutoWidth ? "100%" : `${inputWidth}px`}` }}
        className={cn(
          "px-4 py-2 border border-border rounded-max hover:bg-secondary/70",
          className
        )}
        onBlur={() => {
          if (value.length <= 0) {
            setValue("Unknown");
          }

          if (onKeyDown) onKeyDown();
        }}
      />
    </>
  );
}
