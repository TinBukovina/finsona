"use client";

import React, { useMemo, useState } from "react";
import {
  BudgetInterface,
  TransactionInterface,
  useBudgetItems,
  useCreateBudgetItem,
} from "@/5_entities";
import { SpinnerLoader, Button, useToast } from "@/6_shared";
import { CreateBudgetTableBtn } from "@/4_features";
import { SomethingWentWrong } from "../../2_Pages/SomethingWentWrong";
import { BudgetCategoryTable } from "@/3_widgets/budget_table/BudgetTable";
import { useAppContext } from "@/1_app";
import { useRouter } from "@/i18n/navigation";

interface BudgetTablesProps {
  selectedBudget: BudgetInterface;
  transactions: TransactionInterface[];
  displayingTransactions: boolean;
  onAddTransactionClick: () => void;
  onItemsMutate: () => void;
}

export function BudgetTables({
  selectedBudget,
  transactions,
  displayingTransactions,
  onAddTransactionClick,
}: BudgetTablesProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const { appState } = useAppContext();
  const {
    data: budgetItems,
    isLoading,
    error,
    mutateBudgetItems,
  } = useBudgetItems(selectedBudget.id);
  const { createBudgetItem } = useCreateBudgetItem(appState.selectedBudgetId);

  const [lastRowData, setLastRowData] = useState<
    "planned" | "remaining" | "spent"
  >("planned");

  const transactionSums = useMemo(() => {
    const sums: { [key: string]: number } = {};

    for (const transaction of transactions) {
      if (!transaction.budget_item_id) continue;

      if (!sums[transaction.budget_item_id]) {
        sums[transaction.budget_item_id] = 0;
      }

      sums[transaction.budget_item_id] += Number(transaction.amount) || 0;
    }
    return sums;
  }, [transactions]);

  const handleCreateTable = async () => {
    const newCategoryName = "Category Name";

    if (
      tableNames.some(
        (name) => name.toLowerCase() === newCategoryName.trim().toLowerCase()
      )
    ) {
      addToast(`Category "${newCategoryName}" already exists.`, "error");
      return;
    }

    try {
      await createBudgetItem({
        name: "New Expense",
        planned_amount: 0,
        category: newCategoryName.trim(),
      });
      addToast(`Category "${newCategoryName}" created!`, "success");
      mutateBudgetItems();
    } catch (error) {
      console.log(error);
      addToast("Something went wrong.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full ">
        <SpinnerLoader className="w-[80px] h-[80px]" />
      </div>
    );
  }

  if (error || !budgetItems) {
    return <SomethingWentWrong />;
  }

  if (budgetItems.length === 0) {
    return <div>There are no budget items for this month.</div>;
  }

  const tableNames = Array.from(
    new Set(budgetItems.map((b) => b.category))
  ).sort((a, b) => {
    if (a.toLowerCase() === "income") return -1;
    if (b.toLowerCase() === "income") return 1;
    return a.localeCompare(b);
  });

  return (
    <div
      className={
        "flex flex-col flex-1 min-w-0 overflow-auto scrollbar-none" +
        " " +
        "gap-4 sm:gap-4"
      }
    >
      {/*ROW SELECT ON MOBILE*/}
      <div
        className={
          "flex items-center justify-between p-1 bg-card border border-border rounded-max" +
          " " +
          "sm:hidden"
        }
      >
        <button
          className={
            "flex-1 px-3 py-2 bg-transaprent rounded-max text-center" +
            " " +
            `${lastRowData === "planned" ? "bg-primary font-semibold text-background" : "text-card-foreground"}`
          }
          onClick={() => setLastRowData("planned")}
        >
          Planned
        </button>
        <button
          className={
            "flex-1 px-3 py-2 bg-transaprent rounded-max text-center" +
            " " +
            `${lastRowData === "remaining" ? "bg-primary font-semibold text-background" : "text-card-foreground"}`
          }
          onClick={() => setLastRowData("remaining")}
        >
          Remaining
        </button>
        <button
          className={
            "flex-1 px-3 py-2 bg-transaprent rounded-max text-center" +
            " " +
            `${lastRowData === "spent" ? "bg-primary font-semibold text-background" : "text-card-foreground"}`
          }
          onClick={() => setLastRowData("spent")}
        >
          Spent
        </button>
      </div>

      {/*TABLES*/}
      {tableNames.map((tableName) => {
        const itemsForTable = budgetItems.filter(
          (bi) => bi.category === tableName
        );
        const type =
          tableName.toLowerCase() === "income" ? "income" : "expense";

        return (
          <BudgetCategoryTable
            key={tableName}
            category={tableName}
            type={type}
            items={itemsForTable}
            budgetId={selectedBudget.id}
            onMutate={mutateBudgetItems}
            transactionSums={transactionSums}
            swapActionsBtns={displayingTransactions}
            lastRowData={lastRowData}
          />
        );
      })}

      <div
        className={`flex items-center gap-2 sm:gap-4 ${displayingTransactions ? "flex-row-reverse" : ""}`}
      >
        <CreateBudgetTableBtn
          text="Add table"
          handleClick={handleCreateTable}
        />
        <div className={displayingTransactions ? "hidden" : "block"}>
          <div className="hidden sm:block">
            <Button onClick={onAddTransactionClick}>Add transaction</Button>
          </div>
          <div className="sm:hidden">
            <Button onClick={() => router.push("/transactions")}>Add</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
