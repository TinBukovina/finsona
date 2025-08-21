"use client";

import React, { useEffect, useState } from "react";

import { BudgetExpenseTable, BudgetIncomeTable } from "@/3_widgets";
import {
  BudgetInterface,
  BudgetItemInterface,
  useBudgetItems,
} from "@/5_entities";
import {
  Button,
  capitalizeFirstLetter,
  SpinnerLoader,
  useToast,
} from "@/6_shared";
import { useAppContext } from "@/1_app";
import { SomethingWentWrong } from "../SomethingWentWrong";
import { set } from "date-fns";
import { CreateBudgetTableBtn } from "@/4_features";

interface BudgetTablesProps {
  selectedBudget: BudgetInterface;
  displayingTransactions: boolean;
  onAddtransactionClick: () => void;
  refreshData?: boolean;
}

export function BudgetTables({
  selectedBudget,
  displayingTransactions,
  onAddtransactionClick,
  refreshData,
}: BudgetTablesProps) {
  const { addToast } = useToast();
  const { appState } = useAppContext();

  const {
    data: budgetItems,
    isLoading,
    error,
    mutateBudgetItems,
  } = useBudgetItems(appState.selectedBudgetId);

  const [budgetItemsState, setBudgetItemsState] = useState<
    BudgetItemInterface[]
  >(budgetItems || []);

  useEffect(() => {
    setBudgetItemsState(budgetItems || []);
  }, [budgetItems]);

  const handleCreateTable = async () => {
    setBudgetItemsState((prev) => {
      if (prev.find((b) => b.category === "Category")) {
        addToast("You already have table with name Cateogry", "error");

        return prev;
      }

      return [
        ...prev,
        {
          id: "",
          budget_id: "",
          name: "Expense",
          planned_amount: "0",
          category: "Category",
        },
      ];
    });

    try {
      const response = await fetch("/api/budget-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget_id: appState.selectedBudgetId,
          name: "Expense",
          planned_amount: "0",
          category: "New Category",
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        addToast("Something went wrong", "error");
        return;
      } else {
        addToast("Item created", "success");
        mutateBudgetItems();
        return;
      }
    } catch (error) {
      console.log(error);
      addToast("Something went wrong", "error");
      return;
    }
  };

  useEffect(() => {
    if (refreshData) {
      mutateBudgetItems();
    }
  }, [refreshData, mutateBudgetItems]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full ">
        <SpinnerLoader className="w-[80px] h-[80px]" />
      </div>
    );
  }

  if (error) {
    console.error("Error loading budgets:", error);
    return <SomethingWentWrong />;
  }

  if (!budgetItems || budgetItems.length <= 0) {
    return <div>There is no budget_items</div>;
  }

  const tableNames = Array.from(
    new Set(budgetItemsState.map((b) => b.category))
  ).sort((name) => (name.toLowerCase() === "income" ? -1 : 1));
  /*   console.log(budgetItems);
  console.log(tableNames); */

  return (
    <div className="flex flex-col flex-1 gap-4 min-w-0 overflow-auto scrollbar-none scrollbar-w-8  scroll-thumb-rounded-max scrollbar-thumb-secondary scrollbar-track-transparent hide-scrollbar-arrows">
      <p className="text-h5 hidden">
        {capitalizeFirstLetter(selectedBudget?.name) ||
          "No budget for that month"}
      </p>

      {tableNames.map((tableName) => {
        if (tableName.toLowerCase() === "income") {
          return (
            <BudgetIncomeTable
              key={tableName}
              data={budgetItemsState.filter(
                (bi) => bi.category.toLowerCase() === tableName.toLowerCase()
              )}
              category={tableName}
              budget_id={budgetItemsState.at(0)?.budget_id}
              swapActionsBtns={displayingTransactions}
            />
          );
        } else {
          return (
            <BudgetExpenseTable
              key={tableName}
              data={budgetItemsState.filter(
                (bi) => bi.category.toLowerCase() === tableName.toLowerCase()
              )}
              category={tableName}
              budget_id={budgetItemsState.at(0)?.budget_id}
              swapActionsBtns={displayingTransactions}
              setBudgetItemsState={setBudgetItemsState}
              handleDeleteClick={() => {
                mutateBudgetItems();
              }}
            />
          );
        }
      })}

      <div
        className={`flex items-center gap-4 ${displayingTransactions ? "flex-row-reverse" : ""}`}
      >
        <CreateBudgetTableBtn
          text="Add table"
          handleClick={handleCreateTable}
        />
        <div className={displayingTransactions ? "hidden" : "block"}>
          <Button onClick={onAddtransactionClick}>Add transaction</Button>
        </div>

        <div className={`w-[40px] h-[40px] invisible`}></div>
      </div>
    </div>
  );
}
