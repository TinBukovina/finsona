"use client";

import React, { useState, useEffect, useRef } from "react";
import { BudgetItemInterface, useSettings } from "@/5_entities";
import { RemoveTableBtn } from "./RemoveTableBtn";
import { RowName } from "./RowName";
import { RowValue } from "./RowValue";
import { getReplaceCalmaWithDot, getRightFormatedNumber } from "./utils";

export interface BudgetTableRowProps {
  data: BudgetItemInterface;
  actualAmount: number;
  displayMode: "planned" | "remaining" | "spent" | "income";
  isSelected: boolean;
  onSelect: (unselect?: boolean) => void;
  onClose?: () => void;
  onUpdate: (
    itemId: string,
    updatedData: { name?: string; planned_amount?: string }
  ) => void;
}

type RowMode = "view" | "open" | "editingName" | "editingPlannedValue";

const unformatValue = (value: string | number, valueSeparator: string) => {
  return String(value).replace(new RegExp(`\\${valueSeparator}`, "g"), "");
};

export function BudgetTableRow({
  data,
  actualAmount,
  displayMode,
  isSelected,
  onSelect,
  onClose,
  onUpdate,
}: BudgetTableRowProps) {
  const [mode, setMode] = useState<RowMode>("view");
  const [editingValue, setEditingValue] = useState<string>("");
  const { getValueSeparator, getDecimalSeparator, getActiveCurrency } =
    useSettings();

  useEffect(() => {
    if (!isSelected) {
      setMode("view");
    }
  }, [isSelected]);

  useEffect(() => {
    if (mode === "view") {
      onSelect(true);
    } else {
      onSelect();
    }
  }, [mode]);

  const handleStartEditing = (
    currentValue: string | number,
    editMode: RowMode
  ) => {
    if (isSelected) {
      const cleanValue = unformatValue(currentValue, getValueSeparator());
      setEditingValue(cleanValue);
      setMode(editMode);
    }
  };

  const handleUpdate = (previusMode?: RowMode) => {
    let hasChanged = false;
    let valueToSend: { name?: string; planned_amount?: string } = {};

    if (mode === "editingName") {
      hasChanged =
        editingValue.trim() !== data.name && editingValue.trim().length > 0;
      valueToSend = { name: editingValue.trim() || data.name };
    } else if (mode === "editingPlannedValue") {
      const cleanOriginal = unformatValue(
        data.planned_amount,
        getValueSeparator()
      ).replace(",", ".");
      const cleanNew = editingValue.replace(",", ".");
      hasChanged = cleanOriginal !== cleanNew;
      valueToSend = { planned_amount: cleanNew };
    }

    if (hasChanged) {
      onUpdate(data.id, valueToSend);
    }

    setMode(previusMode || "view");
  };

  let thirdColumnValue: number;
  if (displayMode === "remaining") {
    const planned = parseFloat(
      getReplaceCalmaWithDot(String(data.planned_amount))
    );
    thirdColumnValue = planned - actualAmount;
  } else {
    thirdColumnValue = actualAmount;
  }

  return (
    <div
      className="grid grid-cols-[1fr_80px] sm:grid-cols-[1fr_80px_80px] items-center px-2 py-3 border-b-2 border-border cursor-pointer hover:bg-accent"
      onClick={() => {
        console.log(mode);
        if (mode === "view") {
          setMode("open");
          onSelect();
        } else if (mode === "open") {
          setMode("view");
          onSelect(true);
        } else {
          onSelect(true);
          handleUpdate();
        }
      }}
    >
      <div className="flex gap-4 items-center">
        {isSelected && onClose && <RemoveTableBtn handleClick={onClose} />}
        <RowName
          value={mode === "editingName" ? editingValue : data.name}
          isEditing={mode === "editingName"}
          onValueChange={setEditingValue}
          onClick={(e) => {
            e.stopPropagation();
            handleStartEditing(data.name, "editingName");
          }}
          onUpdate={() => handleUpdate()}
        />
      </div>

      {/*EDITABLE VALUE*/}
      {/*-DESKTOP*/}
      <div className="hidden sm:block">
        <RowValue
          value={
            mode === "editingPlannedValue"
              ? editingValue
              : String(data.planned_amount)
          }
          isEditing={mode === "editingPlannedValue"}
          onValueChange={setEditingValue}
          onClick={(e) => {
            e.stopPropagation();
            handleStartEditing(data.planned_amount, "editingPlannedValue");
          }}
          onUpdate={() => handleUpdate(mode)}
        />
      </div>
      {/*-MOBILE*/}
      {(displayMode === "planned" || displayMode === "income") && (
        <div className="sm:hidden">
          <RowValue
            value={
              mode === "editingPlannedValue"
                ? editingValue
                : String(data.planned_amount)
            }
            isEditing={mode === "editingPlannedValue"}
            onValueChange={setEditingValue}
            onClick={(e) => {
              e.stopPropagation();
              handleStartEditing(data.planned_amount, "editingPlannedValue");
            }}
            onUpdate={() => handleUpdate(mode)}
          />
        </div>
      )}

      {/*DISPLAY VALUES*/}
      {/*-DESKTOP*/}
      <p className="hidden sm:block w-full text-right">
        {getActiveCurrency()}
        {getRightFormatedNumber(
          String(thirdColumnValue),
          getDecimalSeparator(),
          getValueSeparator()
        )}
      </p>
      {/*-MOBILE*/}
      {displayMode !== "planned" && displayMode !== "income" && (
        <p className="sm:hidden w-full text-right">
          {getActiveCurrency()}
          {getRightFormatedNumber(
            String(thirdColumnValue),
            getDecimalSeparator(),
            getValueSeparator()
          )}
        </p>
      )}
    </div>
  );
}
