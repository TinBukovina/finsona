"use client";

import React, { useMemo } from "react";
import {
  BudgetInterface,
  BudgetItemInterface,
  TransactionInterface,
  useBudgetItems,
} from "@/5_entities";
import { SpinnerLoader, Button } from "@/6_shared";
import { CreateBudgetTableBtn } from "@/4_features";
import { SomethingWentWrong } from "../SomethingWentWrong";
import { BudgetCategoryTable } from "@/3_widgets/budget_table/BudgetTable";

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
  onItemsMutate,
}: BudgetTablesProps) {
  const {
    data: budgetItems,
    isLoading,
    error,
    mutateBudgetItems,
  } = useBudgetItems(selectedBudget.id);

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
    <div className="flex flex-col flex-1 gap-4 min-w-0 overflow-auto scrollbar-none">
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
          />
        );
      })}

      <div
        className={`flex items-center gap-4 ${displayingTransactions ? "flex-row-reverse" : ""}`}
      >
        <CreateBudgetTableBtn text="Add table" handleClick={() => {}} />
        <div className={displayingTransactions ? "hidden" : "block"}>
          <Button onClick={onAddTransactionClick}>Add transaction</Button>
        </div>
      </div>
    </div>
  );
}
