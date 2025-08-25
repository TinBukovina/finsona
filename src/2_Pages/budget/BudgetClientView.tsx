// src/2_Pages/Budget/BudgetClientView.tsx

"use client";

import React, { useEffect, useState } from "react";

import { useAppContext } from "@/1_app";
import { AddTransactions, BudgetMonthPicker } from "@/3_widgets";
import { BudgetInterface, useBudgets, useTransactions } from "@/5_entities";
import { capitalizeFirstLetter } from "@/6_shared";
import { BudgetTables } from "../../3_widgets/budget_table/BudgetTables";
import {
  NoBudgetThisMonthFuturePage,
  NoBudgetThisMonthPastPage,
} from "@/2_Pages";

interface BudgetClientViewProps {
  initialBudgets: BudgetInterface[];
}

export function BudgetClientView({ initialBudgets }: BudgetClientViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );

  const { appState, setSelectedBudget } = useAppContext();
  const { activeWalletId, selectedBudgetId } = appState;

  const { data: budgetsData, mutateBudgets } = useBudgets(activeWalletId, {
    fallbackData: { budgets: initialBudgets, message: "Initial data" },
  });
  const budgets = budgetsData?.budgets;

  const { data: transactionsData } = useTransactions(selectedBudgetId);
  const transactions = transactionsData || [];

  console.log(transactions);
  const [displayTransactionSection, setDisplayTransactionSection] =
    useState<boolean>(false);

  useEffect(() => {
    if (budgets) {
      const budgetForCurrentMonth = budgets.find(
        (b) => new Date(b.start_date).getMonth() === selectedMonth
      );
      setSelectedBudget(budgetForCurrentMonth?.id || null);
    }
  }, [budgets, selectedBudgetId, setSelectedBudget, selectedMonth]);

  const selectedBudget = budgets?.find((b) => b.id === selectedBudgetId);

  if (!budgets) {
    return <div>Loading budgets...</div>;
  }

  if (!selectedBudget) {
    const defaultBudget = budgets[0];

    return (
      <>
        <BudgetMonthPicker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        {selectedMonth < new Date(defaultBudget.start_date).getMonth() ? (
          <NoBudgetThisMonthPastPage
            handleBtnClick={() => {
              setSelectedMonth(new Date().getMonth());
              setSelectedBudget(defaultBudget.id);
            }}
          />
        ) : (
          <NoBudgetThisMonthFuturePage customMonth={selectedMonth} />
        )}
      </>
    );
  }

  return (
    <div className={"flex flex-col flex-1 min-h-0" + " " + "gap-4 sm:gap-4"}>
      <p className={"text-h4 font-bold hidden sm:block"}>
        {capitalizeFirstLetter(selectedBudget.name)}
      </p>

      <BudgetMonthPicker
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <div
        className={`flex ${displayTransactionSection ? "gap-4" : ""} relative flex-1 min-h-0`}
      >
        <BudgetTables
          key={selectedBudget.id}
          selectedBudget={selectedBudget}
          transactions={transactions}
          displayingTransactions={displayTransactionSection}
          onAddTransactionClick={() => setDisplayTransactionSection(true)}
          onItemsMutate={() => mutateBudgets()}
        />

        {displayTransactionSection && (
          <AddTransactions
            onClose={() => {
              setDisplayTransactionSection(false);
              mutateBudgets();
            }}
          />
        )}
      </div>
    </div>
  );
}
