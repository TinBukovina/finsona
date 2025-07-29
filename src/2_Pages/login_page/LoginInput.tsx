"use client";

import React, { useState } from "react";
import zxcvbn from "zxcvbn";

interface LoginInputProps {
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
  passwordStrength?: boolean;
  disabled?: boolean;
}

export default function LoginInput({
  placeholder = "",
  value,
  setValue,
  type = "text",
  passwordStrength = false,
  disabled = false,
}: LoginInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const testResult = zxcvbn(value);
  const score = testResult.score;

  const generetingColorBasedOnPasswordStrength = (() => {
    switch (score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#F29F05";
      case 3:
        return "#02A676";
      case 4:
        return "#018C62";
      default:
        return "#828282";
    }
  })();

  const StyleForPasswordStrength =
    passwordStrength && value.length > 0
      ? {
          boxShadow: `0 0 0 2px ${generetingColorBasedOnPasswordStrength}E6`,
          borderColor: "transparent",
          outline: "none",
        }
      : {};

  return (
    <div className="relative pt-2 min-h-[50px]">
      <p
        className={`absolute top-0 left-4 px-1 bg-card  text-xs ${
          isFocused ? "block" : "hidden"
        }`}
      >
        {placeholder}
      </p>
      <input
        className={`px-4 py-2 w-full border border-solid border-border rounded-max focus:border-0 disabled:pointer-events-none disabled:opacity-50`}
        placeholder={isFocused ? "" : placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        style={StyleForPasswordStrength}
        disabled={disabled}
      />
    </div>
  );
}
