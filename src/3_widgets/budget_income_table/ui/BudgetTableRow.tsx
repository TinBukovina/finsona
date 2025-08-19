"use client";

import React, { useEffect, useRef, useState } from "react";
import { RemoveTableBtn } from "./RemoveTableBtn";
import { RowName } from "./RowName";
import { RowValue } from "./RowValue";
import { on } from "events";
import { getRightFormatedNumber } from "@/3_widgets/budget_expense_table/uitls";
import { useSettings } from "@/5_entities";

type RowMode =
  | "view"
  | "selected"
  | "editingName"
  | "editingPlannedValue"
  | "editingReceivedValue";

interface BudgetTableRowProps {
  data: { id: number; name: string; value: string; received: string };
  isSelected: boolean;
  onSelect: (unselect?: boolean) => void;
  onClose?: () => void;
  onNameChange: (newName: string) => void;
  onPlannedChange: (newPlanned: string) => void;
  onReceivedChange: (newReceived: string) => void;
}

export function BudgetTableRow({
  data,
  isSelected,
  onSelect,
  onClose,
  onNameChange,
  onPlannedChange,
  onReceivedChange,
}: BudgetTableRowProps) {
  const { getDecimalSeparator, getValueSeparator } = useSettings();

  const [mode, setMode] = useState<RowMode>("view");

  const [keepFromClosing, setKeepFromClosing] = useState<boolean>(false);

  const isClickedInside = useRef<boolean>(false);

  useEffect(() => {
    if (!isSelected) {
      setMode("view");
    } else {
      setMode("selected");
    }
  }, [isSelected]);

  const handleRowClick = () => {
    if (
      mode === "editingName" ||
      mode === "editingPlannedValue" ||
      mode === "editingReceivedValue"
    )
      return;

    if (!keepFromClosing) {
      onSelect();
    } else {
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

  const handlePlannedValueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setKeepFromClosing(true);

    if (isSelected) {
      setMode("editingPlannedValue");
    } else {
      onSelect();
    }
  };

  const handleReceivedValueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setKeepFromClosing(true);

    if (isSelected) {
      setMode("editingReceivedValue");
    } else {
      onSelect();
    }
  };

  const handleAfterBlur = () => {
    setMode("view");
    setKeepFromClosing(false);
    if (!isClickedInside.current) {
      onSelect(false);
    }
  };

  return (
    <div
      className="grid grid-cols-[1fr_80px_80px] items-center px-2 py-3 border-b-2 border-border cursor-pointer hover:bg-accent"
      onClick={handleRowClick}
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
          mode === "editingPlannedValue" ||
          mode === "editingReceivedValue") && (
          <RemoveTableBtn handleClick={onClose} />
        )}

        <RowName
          name={data.name}
          isEditing={mode === "editingName"}
          isClickInside={isClickedInside}
          onNameChange={onNameChange}
          onClick={handleNameClick}
          onBlurAfterEdit={handleAfterBlur}
        />
      </div>
      <RowValue
        value={data.value}
        isEditing={mode === "editingPlannedValue"}
        isClickInside={isClickedInside}
        onValueChange={onPlannedChange}
        onClick={handlePlannedValueClick}
        onBlurAfterEdit={handleAfterBlur}
      />
      <p className="w-full text-right">
        $
        {getRightFormatedNumber(
          data.received,
          getDecimalSeparator(),
          getValueSeparator()
        )}
      </p>
    </div>
  );
}
