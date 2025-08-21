"use client";

import React, { useEffect, useState } from "react";

import { useAppContext } from "@/1_app";
import {
  NoBudgetPage,
  NoBudgetThisMonthFuturePage,
  NoBudgetThisMonthPastPage,
  NoWalletSelected,
  SomethingWentWrong,
} from "@/2_Pages";
import {
  AddTransactionsComponent,
  AddTransactionsPopup,
  BudgetMonthPicker,
} from "@/3_widgets";
import { BudgetInterface, useBudgets, useWallets } from "@/5_entities";
import { capitalizeFirstLetter, SpinnerLoader } from "@/6_shared";
import { BudgetTables } from "./BudgetTables";

export function BudgetView() {
  const { appState, setSelectedBudget } = useAppContext();
  const { isLoading: isWalletLoading } = useWallets(); // Need this to see when is active wallet selected
  const { activeWalletId } = appState;

  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [defaultBudgetSelect, setDefaultBudgetSelect] =
    useState<BudgetInterface | null>(null);

  const [displayTransactionSection, setDidsplayTransactionSection] =
    useState<boolean>(false);

  const { data, isLoading, error, mutateBudgets } = useBudgets(activeWalletId);

  const { budgets } = data || {};
  console.log(budgets);

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
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      <p className={"text-h6 font-bold"}>
        {capitalizeFirstLetter(selectedBudget.name)}
      </p>
      {budgetPickerVar}
      <div
        className={`flex ${displayTransactionSection ? "gap-4" : "gap-0"} relative flex-1 min-h-0`}
      >
        {/*BUDGET PART*/}
        <BudgetTables
          selectedBudget={selectedBudget}
          displayingTransactions={displayTransactionSection}
          /* setBudgetTableData={setBudgetTableData} */
          onAddtransactionClick={() => setDidsplayTransactionSection(true)}
        />

        {/*TRANSACTION PART*/}
        <div>
          {displayTransactionSection && (
            <>
              <div className="hidden xl:block h-full">
                <AddTransactionsComponent
                  onClose={() => {
                    setDidsplayTransactionSection(false);
                    window.location.reload();
                  }}
                />
              </div>
              <div className="hidden sm:block xl:hidden h-full">
                <AddTransactionsPopup
                  onClose={() => {
                    setDidsplayTransactionSection(false);
                    window.location.reload();
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
