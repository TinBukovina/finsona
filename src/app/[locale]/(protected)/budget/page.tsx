"use client";

import { useAppContext } from "@/1_app";
import {
  NoBudgetPage,
  NoBudgetThisMonthFuturePage,
  NoBudgetThisMonthPastPage,
  NoWalletSelected,
  SomethingWentWrong,
} from "@/2_Pages";
import { BudgetMonthPicker } from "@/3_widgets/budget_month_picker";
import { useBudgets } from "@/5_entities/budgets/model/useBudgets";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { appState, setSelectedBudget } = useAppContext();
  const { activeWalletId } = appState;

  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  const { data, isLoading, error } = useBudgets(activeWalletId);

  const { budgets } = data || {};

  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const latestBudget = budgets[0];
      setSelectedBudget(latestBudget.id);
    } else {
      setSelectedBudget(null);
    }
  }, [budgets, setSelectedBudget]);

  console.log("Budgets", budgets);
  if (!activeWalletId) {
    return <NoWalletSelected />;
  }

  if (isLoading) {
    return <div>Loading budgets...</div>;
  }

  if (error) {
    console.error("Error loading budgets:", error);
    return <SomethingWentWrong />;
  }

  if (!budgets || budgets.length <= 0) {
    return <NoBudgetPage />;
  }

  const selectedBudget = budgets.find(
    (b) => b.id === appState.selectedBudgetId
  );

  return (
    <div className="px-6 py-4 w-full min-w-0 flex flex-col gap-4 h-full overflow-hidden">
      <BudgetMonthPicker
        selectedBudget={selectedBudget}
        budgets={budgets}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        handleBudgetChange={setSelectedBudget}
      />

      {!selectedBudget ? (
        selectedMonth < new Date(budgets[0].start_date).getMonth() ? (
          <NoBudgetThisMonthPastPage
            handleBtnClick={() => {
              setSelectedBudget(budgets[0].id);
            }}
          />
        ) : (
          <NoBudgetThisMonthFuturePage customMonth={selectedMonth} />
        )
      ) : (
        <div>{selectedBudget?.name || "No budget for that month"}</div>
      )}
    </div>
  );
}
