"use client";

import { useAppContext } from "@/1_app";
import { NoBudgetPage, NoWalletSelected, SomethingWentWrong } from "@/2_Pages";
import { BudgetMonthPicker } from "@/3_widgets/budget_month_picker";
import { useBudgets } from "@/5_entities/budgets/model/useBudgets";
import React from "react";

export default function Page() {
  const { appState } = useAppContext();
  const { activeWalletId } = appState;

  const { data, isLoading, error } = useBudgets(activeWalletId);

  const { budgets } = data || {};

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

  return (
    <div className="px-6 py-4 w-full h-full">
      <BudgetMonthPicker />
    </div>
  );
}
