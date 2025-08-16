"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { RemoveTableBtn } from "./RemoveTableBtn";
import { EditRowName } from "./EditRowName";
import { RowValue } from "./RowValue";
import { set } from "date-fns";

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
}

export function BudgetTableRow({
  data,
  isSelected,
  onSelect,
  onClose,
}: BudgetTableRowProps) {
  const [mode, setMode] = useState<RowMode>("view");
  const [name, setName] = useState(data.name);
  const [plannedValue, setPlannedValue] = useState(data.value);
  const [receivedValue, setReceivedValue] = useState(data.received);

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
      className="grid grid-cols-[1fr_120px_120px] items-center px-2 py-3 border-b-2 border-border cursor-pointer hover:bg-accent"
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

        <EditRowName
          name={name}
          isEditing={mode === "editingName"}
          isClickInside={isClickedInside}
          onNameChange={setName}
          onClick={handleNameClick}
          onBlurAfterEdit={handleAfterBlur}
        />
      </div>
      <RowValue
        value={plannedValue}
        isEditing={mode === "editingPlannedValue"}
        isClickInside={isClickedInside}
        onValueChange={setPlannedValue}
        onClick={handlePlannedValueClick}
        onBlurAfterEdit={handleAfterBlur}
      />
      <RowValue
        value={receivedValue}
        isEditing={mode === "editingReceivedValue"}
        isClickInside={isClickedInside}
        onValueChange={setReceivedValue}
        onClick={handleReceivedValueClick}
        onBlurAfterEdit={handleAfterBlur}
      />
    </div>
  );
}
