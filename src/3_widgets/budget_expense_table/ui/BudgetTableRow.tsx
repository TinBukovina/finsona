"use client";

import React, { useEffect, useRef, useState } from "react";
import { RemoveTableBtn } from "./RemoveTableBtn";
import { RowName } from "./RowName";
import { RowValue } from "./RowValue";
import {
  BudgetItemInterface,
  TransactionInterface,
  useSettings,
} from "@/5_entities";
import { useToast } from "@/6_shared";
import { set } from "date-fns";
import { getReplaceCalmaWithDot, getRightFormatedNumber } from "../uitls";
import { useAppContext } from "@/1_app";

type RowMode =
  | "view"
  | "selected"
  | "editingName"
  | "editingPlannedValue"
  | "editingReceivedValue";

interface BudgetTableRowProps {
  data: BudgetItemInterface;
  isSelected: boolean;
  type: "spent" | "remaining";
  onSelect: (unselect?: boolean) => void;
  onClose?: () => void;
}

export function BudgetTableRow({
  data,
  isSelected,
  type,
  onSelect,
  onClose,
}: BudgetTableRowProps) {
  const { addToast } = useToast();
  const { getDecimalSeparator, getValueSeparator } = useSettings();

  const [mode, setMode] = useState<RowMode>("view");
  const [spentRemainValue, setSpentRemainValue] = useState("spent");

  const [keepFromClosing, setKeepFromClosing] = useState<boolean>(false);

  const isClickedInside = useRef<boolean>(false);

  const [budgetItem, setBudgetItem] = useState<BudgetItemInterface>(data);

  const [
    trigerBudgetItemUpdateInDatabase,
    setTrigerBudgetItemUpdateInDatabase,
  ] = useState<boolean>(false);
  const [hasChangeHappened, setHasChangeHappened] = useState<boolean>(false);

  const [receivedAmount, setReceivedAmount] = useState<string>("0");

  useEffect(() => {
    if (!isSelected) {
      setMode("view");
    } else {
      setMode("selected");
    }
  }, [isSelected]);

  const handleRowClick = () => {
    console.log(budgetItem);
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

  const handleAfterBlur = () => {
    setMode("view");
    setKeepFromClosing(false);
    if (!isClickedInside.current) {
      onSelect(false);
    }
  };

  useEffect(() => {
    if (trigerBudgetItemUpdateInDatabase && hasChangeHappened) {
      (async () => {
        try {
          const result = await fetch(`/api/budget-items/${budgetItem.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: budgetItem.name,
              planned_amount: String(budgetItem.planned_amount).replace(
                ",",
                "."
              ),
            }),
          });

          const resultData = await result.json();
          if (!result.ok) {
            console.log("Error occured: ", resultData.message);
            addToast("Something went wrong!", "error");
          } else {
            console.log(resultData);
            addToast("Successfully updated row!", "success");
          }
        } catch (error) {
          console.error(error);
          addToast("There was a error!", "error");
        }

        setTrigerBudgetItemUpdateInDatabase(false);
        setHasChangeHappened(false);
      })();
    }
  }, [
    budgetItem,
    addToast,
    trigerBudgetItemUpdateInDatabase,
    setTrigerBudgetItemUpdateInDatabase,
    hasChangeHappened,
    setHasChangeHappened,
  ]);

  useEffect(() => {
    (async () => {
      try {
        if (!budgetItem.id) return;

        const response = await fetch(`/api/transactions/${budgetItem.id}`, {
          method: "GET",
        });

        const responseData = await response.json();
        if (!response.ok) {
          addToast("Something went wrong!", "error");
        } else {
          const sumAmount = responseData
            .filter(
              (el: TransactionInterface) => el.type.toLowerCase() === "expense"
            )
            .map((el: TransactionInterface) => el.amount)
            .reduce((a: number, b: number) => a + b, 0);
          setReceivedAmount(String(sumAmount));
        }
      } catch (error) {
        console.error(error);
        addToast("Something went wrong!", "error");
      }
    })();
  }, [budgetItem.id, addToast]);

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
          name={budgetItem.name}
          isEditing={mode === "editingName"}
          isClickInside={isClickedInside}
          onNameChange={(newName: string) => {
            setBudgetItem((prev) => {
              if (prev.name !== newName) {
                setHasChangeHappened(true);
              }

              return {
                ...prev,
                name: newName,
              };
            });
          }}
          onClick={handleNameClick}
          onBlurAfterEdit={() => {
            setTrigerBudgetItemUpdateInDatabase(true);
            handleAfterBlur();
          }}
        />
      </div>
      <RowValue
        value={budgetItem.planned_amount}
        isEditing={mode === "editingPlannedValue"}
        isClickInside={isClickedInside}
        onValueChange={(newPlannedAmount: string) => {
          setBudgetItem((prev) => {
            if (String(prev.planned_amount) !== String(newPlannedAmount)) {
              setHasChangeHappened(true);
            }

            return {
              ...prev,
              planned_amount: newPlannedAmount,
            };
          });
        }}
        onClick={handlePlannedValueClick}
        onBlurAfterEdit={() => {
          setTrigerBudgetItemUpdateInDatabase(true);
          handleAfterBlur();
        }}
      />
      <p className="w-full text-right">
        $
        {type === "spent"
          ? getRightFormatedNumber(
              receivedAmount,
              getDecimalSeparator(),
              getValueSeparator()
            )
          : getRightFormatedNumber(
              String(
                Number(getReplaceCalmaWithDot(budgetItem.planned_amount)) -
                  Number(getReplaceCalmaWithDot(receivedAmount))
              ),
              getDecimalSeparator(),
              getValueSeparator()
            )}
      </p>
    </div>
  );
}
