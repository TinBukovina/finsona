"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { RemoveTableBtn } from "./RemoveTableBtn";
import { EditRowName } from "./EditRowName";
import { RowValue } from "./RowValue";

type RowMode = "view" | "selected" | "editingName" | "editingValue";

interface BudgetTableRowProps {
  data: { id: number; name: string; value: string; received: string };
  isSelected: boolean;
  onSelect: () => void;
}

export function BudgetTableRow({
  data,
  isSelected,
  onSelect,
}: BudgetTableRowProps) {
  const [mode, setMode] = useState<RowMode>("view");
  const [name, setName] = useState("Paycheck 1");
  const [value, setValue] = useState("200.00");

  const [keepFromClosing, setKeepFromClosing] = useState<boolean>(false);

  const isClickedInside = useRef<boolean>(false);

  useEffect(() => {
    if (!isSelected) {
      setMode("view");
    } else {
      setMode("selected");
    }
  }, [isSelected]);

  const handleRowClick = (keep = false) => {
    if (mode === "editingName" || mode === "editingValue") return;

    if (!keepFromClosing) onSelect();
    else {
      setKeepFromClosing(false);
    }
  };

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setKeepFromClosing(true);

    if (isSelected) {
      setMode("editingName");
    } else {
      onSelect();
    }
  };

  const handleValueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setKeepFromClosing(true);

    if (isSelected) {
      setMode("editingValue");
    } else {
      onSelect();
    }
  };

  return (
    <div
      className="grid grid-cols-[1fr_120px_120px] items-center px-2 py-3 border-b-2 border-border cursor-pointer hover:bg-accent"
      onClick={() => handleRowClick()}
      onMouseDown={() => {
        isClickedInside.current = true;
      }}
      onMouseUp={() => {
        setTimeout(() => {
          isClickedInside.current = false;
        }, 0);
      }}
    >
      <div className="flex gap-4 items-center">
        {(mode === "selected" ||
          mode === "editingName" ||
          mode === "editingValue") && <RemoveTableBtn />}

        <EditRowName
          name={name}
          isEditing={mode === "editingName"}
          isClickInside={isClickedInside}
          onNameChange={setName}
          onClick={handleNameClick}
          onBlurAfterEdit={() => {
            setMode("selected");
          }}
        />
      </div>
      <RowValue
        value={value}
        isEditing={mode === "editingValue"}
        isClickInside={isClickedInside}
        onValueChange={setValue}
        onClick={handleValueClick}
        onBlurAfterEdit={() => {
          setMode("selected");
        }}
      />
      <p className="text-right">$100.00</p>
    </div>
  );
}
