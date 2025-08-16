"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  IconTemplate,
  Iinput,
  keyboard_arrow_down_r_400,
  keyboard_arrow_up_r_400,
} from "@/6_shared";
import { RemoveTableBtn } from "./RemoveTableBtn";
import { EditTableBtn } from "./EditTableBtn";
import { BudgetTableRow } from "./BudgetTableRow";
import { useSettings } from "@/5_entities";
import { useOnClickOutside } from "@/6_shared/lib/hooks/useOnClickOutside";

const data = [
  { id: 1, name: "Paycheck 1", value: "200.00", received: "100.00" },
  { id: 2, name: "Side Hustle", value: "500.00", received: "500.00" },
  { id: 3, name: "Freelance", value: "150.00", received: "120.50" },
];

const INCOM_TABLE_NAME = "Income";

export function BudgetTable() {
  const { getDecimalSeparator } = useSettings();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [isInEditingMode, setIsInEditingMode] = useState<boolean>(false);
  const [tableName, setTableName] = useState<string>(INCOM_TABLE_NAME);
  const tableNameRefInput = useRef<HTMLInputElement>(null);

  const [isEnteringNewRow, setIsEnteringNewRow] = useState<boolean>(false);
  const [newRowName, setNewRowName] = useState<string>("");

  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const [mockBudgetData, setMockBudgetData] = useState(data);

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

  return (
    <div ref={editingZoneRef} className="flex items-start gap-4 w-full">
      {/*TABLE*/}
      <div className="w-full bg-card border border-border rounded-card text-card-foreground fill-card-foreground">
        {/*HEADER*/}
        <div
          className={"grid grid-cols-[1fr_120px_120px]  items-center px-6 py-4"}
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
                  onClose={() => {
                    setMockBudgetData((data) =>
                      data.filter((r) => r.id !== row.id)
                    );
                  }}
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
              }}
            >
              Add Income
            </Button>
          ) : (
            <>
              <Iinput
                value={newRowName}
                setValue={setNewRowName}
                placeholder="Enter income..."
                initialInputWidth={150}
              />
              <Button
                variant={"default"}
                onClick={() => {
                  setMockBudgetData((prev) => [
                    ...prev,
                    {
                      id: prev[prev.length - 1].id + 1,
                      name: newRowName,
                      value: "0" + getDecimalSeparator() + "0",
                      received: "0" + getDecimalSeparator() + "0",
                    },
                  ]);
                  setIsEnteringNewRow(false);
                }}
              >
                Confirm
              </Button>
              <Button
                variant={"secondary"}
                onClick={() => {
                  setIsEnteringNewRow(false);
                }}
              >
                Cancle
              </Button>
            </>
          )}
        </div>
      </div>

      {/*EDITING BTNS*/}
      <div className="flex flex-col gap-2 ">
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
