"use client";

import React, { useState } from "react";

interface LoginInputProps {
  placeholder?: string;
}

export default function LoginInput({ placeholder = "" }: LoginInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative pt-2">
      <p
        className={`absolute top-0 left-4 px-1 bg-card  text-xs ${
          isFocused ? "block" : "hidden"
        }`}
      >
        {placeholder}
      </p>
      <input
        className="px-4 py-2 w-full border border-solid border-border rounded-max"
        placeholder={isFocused ? "" : placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
