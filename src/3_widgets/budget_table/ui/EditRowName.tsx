"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { useToast } from "@/6_shared";

interface EditableNameProps {
  name: string;
  isEditing: boolean;
  isClickInside: React.RefObject<boolean>;
  onNameChange: (newName: string) => void;
  onClick: (e: React.MouseEvent) => void;
  onBlurAfterEdit: () => void;
}

export function EditRowName({
  name,
  isEditing,
  isClickInside,
  onNameChange,
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
  }, [name, isEditing]);

  const handleBlur = () => {
    if (name.length < 6) {
      if (isClickInside.current) {
        addToast("Name must be at least 6 characters long!", "error");
        inputRef.current?.focus();
        return;
      }

      const neededChars = 6 - name.length;
      const padding = "_".repeat(neededChars);
      onNameChange(name + padding);
    }
    onBlurAfterEdit();
  };

  if (!isEditing) {
    return <p onClick={onClick}>{name}</p>;
  }

  return (
    <>
      <span ref={spanRef} className="absolute invisible whitespace-pre px-4">
        {name}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onBlur={handleBlur}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") e.currentTarget.blur();
        }}
        autoFocus
        style={{ width: `${inputWidth}px` }}
        className="px-4 py-2 border border-border rounded-max"
      />
    </>
  );
}
