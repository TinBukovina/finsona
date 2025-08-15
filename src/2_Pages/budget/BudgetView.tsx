"use client";

import { useAppContext } from "@/1_app";
import {
  NoBudgetPage,
  NoBudgetThisMonthFuturePage,
  NoBudgetThisMonthPastPage,
  NoWalletSelected,
  SomethingWentWrong,
} from "@/2_Pages";
import { BudgetTable } from "@/3_widgets";
import { BudgetMonthPicker } from "@/3_widgets/budget_month_picker";
import { BudgetInterface, useWallets } from "@/5_entities";
import { useBudgets } from "@/5_entities/budgets/model/useBudgets";
import { SpinnerLoader } from "@/6_shared";
import React, { useEffect, useState } from "react";

export function BudgetView() {
  const { appState, setSelectedBudget } = useAppContext();
  const { isLoading: isWalletLoading } = useWallets(); // Need this to see when is active wallet selected
  const { activeWalletId } = appState;

  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [defaultBudgetSelect, setDefaultBudgetSelect] =
    useState<BudgetInterface | null>(null);

  const { data, isLoading, error } = useBudgets(activeWalletId);

  const { budgets } = data || {};

  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const latestBudget =
        budgets
          .filter(
            (b) => new Date(b.start_date).getMonth() === new Date().getMonth()
          )
          .at(0) || budgets[0];
      setDefaultBudgetSelect(latestBudget);
    }
  }, [budgets]);

  // Logic for slecting an active budget
  useEffect(() => {
    setSelectedBudget(defaultBudgetSelect?.id || null);
  }, [defaultBudgetSelect, setSelectedBudget]);

  if (!activeWalletId && !isWalletLoading) {
    return <NoWalletSelected />;
  }

  if (isWalletLoading || isLoading) {
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

  if (!budgets || budgets.length <= 0) {
    return <NoBudgetPage />;
  }

  // Getting budget object from ID which we set in useEffect
  // We placing it there because we alredy check that selectBudget is not null
  const selectedBudget = budgets.find(
    (b) => b.id === appState.selectedBudgetId
  );

  const budgetPickerVar = (
    <BudgetMonthPicker
      selectedBudget={selectedBudget}
      budgets={budgets}
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
      handleBudgetChange={setSelectedBudget}
    />
  );

  // If user has active budget but doens't have budets in past or future
  if (!selectedBudget) {
    if (selectedMonth < new Date(budgets[0].start_date).getMonth()) {
      return (
        <>
          {budgetPickerVar}

          <NoBudgetThisMonthPastPage
            handleBtnClick={() => {
              setSelectedBudget(defaultBudgetSelect?.id || null);
            }}
          />
        </>
      );
    } else {
      return (
        <>
          {budgetPickerVar}
          <NoBudgetThisMonthFuturePage customMonth={selectedMonth} />;
        </>
      );
    }
  }

  return (
    <>
      {budgetPickerVar}

      <div>{selectedBudget?.name || "No budget for that month"}</div>

      <BudgetTable />
    </>
  );
}
