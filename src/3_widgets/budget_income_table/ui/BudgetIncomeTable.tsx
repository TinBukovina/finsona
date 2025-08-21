"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  IconTemplate,
  Iinput,
  keyboard_arrow_down_r_400,
  keyboard_arrow_up_r_400,
  useToast,
} from "@/6_shared";
import { RemoveTableBtn } from "./RemoveTableBtn";
import { EditTableBtn } from "./EditTableBtn";
import { BudgetTableRow } from "./BudgetTableRow";
import { BudgetItemInterface, useSettings } from "@/5_entities";
import { useOnClickOutside } from "@/6_shared/lib/hooks/useOnClickOutside";

export function BudgetIncomeTable({
  data: budgetItems,
  budget_id,
  category,
  swapActionsBtns,
}: {
  data: BudgetItemInterface[];
  budget_id: string | undefined;
  category: string;
  swapActionsBtns: boolean;
}) {
  const { getDecimalSeparator } = useSettings();
  const { addToast } = useToast();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [isInEditingMode, setIsInEditingMode] = useState<boolean>(false);
  const [tableName, setTableName] = useState<string>(category);
  const tableNameRefInput = useRef<HTMLInputElement>(null);

  const [isEnteringNewRow, setIsEnteringNewRow] = useState<boolean>(false);
  const [newRowName, setNewRowName] = useState<string>("");

  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const [mockBudgetData, setMockBudgetData] = useState(budgetItems);

  /*   const [
    trigerBudgetItemUpdateInDatabase,
    setTrigerBudgetItemUpdateInDatabase,
  ] = useState<boolean>(false); */

  const handleRowSelect = (index: number, unselect: boolean) => {
    if (unselect) return setSelectedRowIndex(null);

    if (selectedRowIndex === index) {
      setSelectedRowIndex(null);
    } else {
      setSelectedRowIndex(index);
    }
  };

  const editingZoneRef = useRef<HTMLDivElement>(null);

  const handlerExitEditingMode = () => {
    setIsInEditingMode(false);
  };

  useOnClickOutside(editingZoneRef, handlerExitEditingMode);

  const handleAddIncome = async () => {
    if (!newRowName || newRowName.length === 0) {
      addToast("You need to enter a name!", "error");
      return;
    }

    if (newRowName.length < 4) {
      addToast("Name is too short, 4 characters at least!", "error");
      return;
    }

    setIsEnteringNewRow(false);
    setMockBudgetData((prev) => [
      ...prev,
      {
        id: "",
        budget_id: budget_id || "",
        name: newRowName,
        planned_amount: "0",
        category: category,
      },
    ]);

    try {
      const response = await fetch(`/api/budgets/${budget_id}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newRowName,
          planned_amount: 0,
          category,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        addToast("Something went wrong!", "error");
        setMockBudgetData((prev) => [
          ...prev.filter((item) => item.name !== newRowName),
        ]);
        setIsEnteringNewRow(true);
      } else {
        setMockBudgetData((prev) => [
          ...prev.filter((item) => item.name !== newRowName),
          responseData,
        ]);
        addToast("Item added!", "success");
        setIsEnteringNewRow(false);
        setNewRowName("");
      }
    } catch (error) {
      console.error(error);
      addToast("Something went wrong!", "error");
      setMockBudgetData((prev) => [
        ...prev.filter((item) => item.name !== newRowName),
      ]);
      setIsEnteringNewRow(true);
    }
  };

  const handleRemoveIncome = async (budgetItemId: string) => {
    const removedItem = mockBudgetData.find((item) => item.id === budgetItemId);

    setMockBudgetData((prev) =>
      prev.filter((item) => item.id !== budgetItemId)
    );

    try {
      const response = await fetch(`/api/budget-items/${budgetItemId}`, {
        method: "DELETE",
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        addToast("Something went wrong!", "error");
        if (!removedItem) return;
        setMockBudgetData((prev) => [...prev, removedItem]);
      } else {
        addToast("Item removed!", "success");
        setIsEnteringNewRow(false);
      }
    } catch (error) {
      console.error(error);
      addToast("Something went wrong!", "error");
      if (!removedItem) return;
      setMockBudgetData((prev) => [...prev, removedItem]);
    }
  };

  return (
    <div
      ref={editingZoneRef}
      className={`flex ${swapActionsBtns && "flex-row-reverse"} items-start gap-4 w-full`}
    >
      {/*TABLE*/}
      <div className="w-full bg-card border border-border rounded-card text-card-foreground fill-card-foreground">
        {/*HEADER*/}
        <div
          className={"grid grid-cols-[1fr_80px_80px]  items-center px-6 py-4"}
        >
          {/*NAME*/}
          {!isInEditingMode ? (
            <button
              className={
                "flex gap-1 items-center w-fit cursor-pointer" +
                " " +
                "hover:text-primary hover:fill-primary"
              }
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <p className="text-h6 font-bold">{tableName}</p>
              <IconTemplate
                width="24px"
                height="24px"
                svg={
                  !isOpen
                    ? keyboard_arrow_down_r_400()
                    : keyboard_arrow_up_r_400()
                }
              />
            </button>
          ) : (
            <Iinput
              ref={tableNameRefInput}
              value={tableName}
              setValue={setTableName}
            />
          )}

          {/*COLUMNS*/}
          <p className="text-muted-foreground text-sm text-right">Planned</p>
          <p className="text-muted-foreground text-sm text-right">Received</p>
        </div>

        {isOpen && (
          <>
            {/*ROWS*/}
            <div className="flex flex-col gap-0 px-4 py-4">
              {mockBudgetData.map((row, index) => (
                <BudgetTableRow
                  key={row.id}
                  data={row}
                  isSelected={index === selectedRowIndex}
                  onSelect={(unselect = false) => {
                    handleRowSelect(index, unselect);
                  }}
                  onClose={() => handleRemoveIncome(row.id)}
                />
              ))}
            </div>
          </>
        )}
        {/*FOOTER*/}
        <div className="flex justify-start items-center gap-4 px-4 py-4">
          {!isEnteringNewRow ? (
            <Button
              variant={"secondary"}
              onClick={() => {
                setIsEnteringNewRow(true);
                setIsOpen(true);
              }}
            >
              Add Income
            </Button>
          ) : (
            <>
              <Button
                variant={"secondary"}
                onClick={() => {
                  setIsEnteringNewRow(false);
                }}
              >
                Cancle
              </Button>
              <Button variant={"default"} onClick={handleAddIncome}>
                Confirm
              </Button>
              <Iinput
                value={newRowName}
                setValue={setNewRowName}
                placeholder="Enter income..."
                initialInputWidth={150}
              />
            </>
          )}
        </div>
      </div>

      {/*EDITING AND DELETE BTNS*/}
      <div className="flex flex-col gap-2 invisible">
        <RemoveTableBtn />
        <EditTableBtn
          isActive={isInEditingMode}
          handleClick={() => {
            setIsInEditingMode((prev) => !prev);
            if (!isInEditingMode) {
              setTimeout(() => {
                tableNameRefInput.current?.focus();
              }, 0);
            }
          }}
        />
      </div>
    </div>
  );
}
