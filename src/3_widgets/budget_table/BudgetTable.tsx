// src/3_widgets/budget_tables/BudgetCategoryTable.tsx

"use client";

import React, { useState, useRef } from "react";
import {
  Button,
  cn,
  IconTemplate,
  Iinput,
  keyboard_arrow_down_r_400,
  keyboard_arrow_up_r_400,
  useToast,
} from "@/6_shared";
import {
  BudgetItemInterface,
  useCreateBudgetItem,
  useDeleteBudgetCategory,
  useDeleteBudgetItem,
  useUpdateBudgetCategory,
  useUpdateBudgetItem,
} from "@/5_entities";
import { BudgetTableRow } from "./BudgetTableRow";
import { useOnClickOutside } from "@/6_shared/lib/hooks/useOnClickOutside";
import { RemoveTableBtn } from "./RemoveTableBtn";
import { EditTableBtn } from "./EditTableBtn";

export interface BudgetCategoryTableProps {
  category: string;
  type: "income" | "expense";
  items: BudgetItemInterface[];
  budgetId: string;
  onMutate: () => void;
  transactionSums: { [key: string]: number };
  swapActionsBtns?: boolean;
}

export function BudgetCategoryTable({
  category,
  type,
  items,
  budgetId,
  onMutate,
  transactionSums,
  swapActionsBtns = false,
}: BudgetCategoryTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isInEditingMode, setIsInEditingMode] = useState<boolean>(false);
  const [tableName, setTableName] = useState<string>(category);
  const [isEnteringNewRow, setIsEnteringNewRow] = useState<boolean>(false);
  const [newRowName, setNewRowName] = useState<string>("");
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [lastRowData, setLastRowData] = useState<"spent" | "remaining">(
    "spent"
  );

  const tableNameRefInput = useRef<HTMLInputElement>(null);
  const editingZoneRef = useRef<HTMLDivElement>(null);

  // --- HOOKS ---
  const { addToast } = useToast();
  const { createBudgetItem, isCreating } = useCreateBudgetItem(budgetId);
  const { deleteBudgetItem, isDeleting } = useDeleteBudgetItem();
  const { updateBudgetCategory } = useUpdateBudgetCategory();
  const { deleteBudgetCategory } = useDeleteBudgetCategory();
  const { updateBudgetItem, isUpdating } = useUpdateBudgetItem();

  // --- EVENT HANDLERS ---
  const handleCreateItem = async () => {
    if (!newRowName || newRowName.length < 4) {
      addToast("Name is too short (min 4 chars).", "error");
      return;
    }
    try {
      await createBudgetItem({ name: newRowName, planned_amount: 0, category });
      addToast("Item added!", "success");
      onMutate();
      setIsEnteringNewRow(false);
      setNewRowName("");
    } catch (error) {
      console.log(error);
      addToast("Something went wrong.", "error");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await deleteBudgetItem(itemId);
      addToast("Item removed!", "success");
      onMutate();
    } catch (error) {
      console.log(error);
      addToast("Seomthing went wrong.", "error");
    }
  };

  const handleRenameCategory = async () => {
    if (!tableName.trim() || tableName === category) {
      setIsInEditingMode(false);
      setTableName(category);
      return;
    }
    try {
      await updateBudgetCategory({
        budgetId,
        oldName: category,
        newName: tableName.trim(),
      });
      addToast("Category renamed!", "success");
      onMutate();
    } catch (error) {
      console.log(error);
      addToast("Something went wrong.", "error");
      setTableName(category);
    } finally {
      setIsInEditingMode(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteBudgetCategory({ budgetId, name: category });
      addToast("Category deleted!", "success");
      onMutate();
    } catch (error) {
      console.log(error);
      addToast("Something went wrong.", "error");
    }
  };

  const handleUpdateItem = async (
    itemId: string,
    updatedData: { name?: string; planned_amount?: string }
  ) => {
    try {
      await updateBudgetItem({ itemId, data: updatedData });
      addToast("Item updated!", "success");
      onMutate();
    } catch (error) {
      console.log(error);
      addToast("Something went wrong.", "error");
    }
  };

  useOnClickOutside(editingZoneRef, () => {
    if (isInEditingMode) handleRenameCategory();
  });

  const addButtonText = type === "income" ? "Add Income" : "Add Expense";

  return (
    <div
      ref={editingZoneRef}
      className={`flex ${swapActionsBtns && "flex-row-reverse"} items-start gap-4 w-full`}
    >
      {/* TABLE */}
      <div className="w-full bg-card border border-border rounded-card text-card-foreground fill-card-foreground">
        {/* HEADER */}
        <div className="grid grid-cols-[1fr_80px_80px] items-center px-6 py-4">
          {!isInEditingMode ? (
            <button
              className="flex gap-1 items-center w-fit cursor-pointer hover:text-primary hover:fill-primary"
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
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameCategory();
                if (e.key === "Escape") setIsInEditingMode(false);
              }}
              onBlur={handleRenameCategory}
              autoFocus
            />
          )}
          <p className="text-muted-foreground text-sm text-right">Planned</p>
          {type === "income" ? (
            <p className="text-muted-foreground text-sm text-right">Received</p>
          ) : (
            <div
              className="text-muted-foreground cursor-pointer hover:text-primary text-sm text-right"
              onClick={() =>
                setLastRowData((prev) =>
                  prev === "spent" ? "remaining" : "spent"
                )
              }
            >
              {lastRowData === "spent" ? "Spent" : "Remaining"}
            </div>
          )}
        </div>

        {/* ROWS */}
        {isOpen && (
          <div className="flex flex-col gap-0 px-4 py-4">
            {items.map((item, index) => {
              const actualAmount = transactionSums[item.id] || 0;
              const displayMode = type === "income" ? "income" : lastRowData;

              return (
                <BudgetTableRow
                  key={item.id}
                  data={item}
                  actualAmount={actualAmount}
                  displayMode={displayMode}
                  isSelected={index === selectedRowIndex}
                  onSelect={(unselect = false) =>
                    setSelectedRowIndex(unselect ? null : index)
                  }
                  onClose={() => handleDeleteItem(item.id)}
                  onUpdate={handleUpdateItem}
                />
              );
            })}
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-start items-center gap-4 px-4 py-4">
          {!isEnteringNewRow ? (
            <Button
              variant="secondary"
              onClick={() => {
                setIsEnteringNewRow(true);
                setIsOpen(true);
              }}
            >
              {addButtonText}
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setIsEnteringNewRow(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleCreateItem}
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Confirm"}
              </Button>
              <Iinput
                value={newRowName}
                setValue={setNewRowName}
                placeholder="Enter name..."
                initialInputWidth={150}
              />
            </>
          )}
        </div>
      </div>

      {/*BUTTON FOR EDITING EXPENSES TABLE*/}
      <div
        className={`flex flex-col gap-2 ${type === "income" && "invisible"}`}
      >
        <RemoveTableBtn handleClick={handleDeleteCategory} />
        <EditTableBtn
          isActive={isInEditingMode}
          handleClick={() => {
            const newEditMode = !isInEditingMode;
            setIsInEditingMode(newEditMode);
            if (newEditMode) {
              setTimeout(() => tableNameRefInput.current?.focus(), 0);
            } else {
              handleRenameCategory();
            }
          }}
        />
      </div>
    </div>
  );
}
