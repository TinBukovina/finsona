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
  BudgetExpenseTable,
  BudgetIncomeTable,
  BudgetMonthPicker,
} from "@/3_widgets";
import { BudgetInterface, useBudgets, useWallets } from "@/5_entities";
import {
  Button,
  capitalizeFirstLetter,
  SpinnerLoader,
  useToast,
} from "@/6_shared";
import { CreateBudgetTableBtn } from "@/4_features";
import { useBudgetItems } from "@/5_entities/budget_items";

interface TestBudgetTableDataInterfac {
  name: string;
  planned_amount: number;
  category: string;
}

const testBudgetTableData = [
  { name: "Paycheck 1", planned_amount: 200.0, category: "Income" },
  { name: "Side hustle", planned_amount: 500.0, category: "Income" },
  { name: "Freelance", planned_amount: 150.0, category: "Income" },
  { name: "Morgage/Rent", planned_amount: 200.0, category: "Housing" },
  { name: "Water", planned_amount: 500.0, category: "Housing/Utils" },
  { name: "Electricity", planned_amount: 150.0, category: "Housing/Utils" },
  /* { name: "Electricity", planned_amount: 150.0, category: "Charity" }, */
];

export function BudgetView() {
  const [budgetTableData, setBudgetTableData] = useState(testBudgetTableData);

  const { addToast } = useToast();

  const { appState, setSelectedBudget } = useAppContext();
  const { isLoading: isWalletLoading } = useWallets(); // Need this to see when is active wallet selected
  const { activeWalletId } = appState;

  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [defaultBudgetSelect, setDefaultBudgetSelect] =
    useState<BudgetInterface | null>(null);

  const [displayTransactionSection, setDidsplayTransactionSection] =
    useState<boolean>(false);

  const { data, isLoading, error } = useBudgets(activeWalletId);

  const { budgets } = data || {};

  const {
    data: budgetItems,
    isLoading: isLoadingBudgetItems,
    error: errorBudgetItems,
  } = useBudgetItems(appState.selectedBudgetId);

  const getDifferentTableNames = (
    budgetsData: TestBudgetTableDataInterfac[]
  ): string[] => {
    const result: string[] = [];
    for (const category of budgetsData.map((b) => b.category) as string[]) {
      if (!result.includes(category)) {
        result.push(category);
      }
    }

    return result;
  };

  const tableNames = getDifferentTableNames(budgetTableData);

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

  console.log(budgetItems);
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
        <div className="flex flex-col flex-1 gap-4 min-w-0 overflow-auto scrollbar-none scrollbar-w-8  scroll-thumb-rounded-max scrollbar-thumb-secondary scrollbar-track-transparent hide-scrollbar-arrows">
          <p className="text-h5 hidden">
            {capitalizeFirstLetter(selectedBudget?.name) ||
              "No budget for that month"}
          </p>

          {tableNames.map((tableName) => {
            if (tableName === "Income") {
              return (
                <BudgetIncomeTable
                  key={tableName}
                  swapActionsBtns={displayTransactionSection}
                />
              );
            } else {
              return (
                <BudgetExpenseTable
                  key={tableName}
                  tableName={tableName}
                  swapActionsBtns={displayTransactionSection}
                  handleDeleteClick={() => {
                    setBudgetTableData((prev) =>
                      prev.filter((b) => b.category !== tableName)
                    );
                  }}
                />
              );
            }
          })}

          <div
            className={`flex items-center gap-4 ${displayTransactionSection ? "flex-row-reverse" : ""}`}
          >
            <CreateBudgetTableBtn
              text="Add table"
              handleClick={() => {
                setBudgetTableData((prev) => {
                  if (prev.find((b) => b.category === "Category")) {
                    addToast(
                      "You already have table with name Cateogry",
                      "error"
                    );

                    return prev;
                  }

                  return [
                    ...prev,
                    {
                      name: "Expense",
                      planned_amount: 0,
                      category: "Category",
                    },
                  ];
                });
              }}
            />
            <div className={displayTransactionSection ? "hidden" : "block"}>
              <Button onClick={() => setDidsplayTransactionSection(true)}>
                Add transaction
              </Button>
            </div>

            <div className={`w-[40px] h-[40px] invisible`}></div>
          </div>
        </div>
        {/*TRANSACTION PART*/}
        <div>
          {displayTransactionSection && (
            <>
              <div className="hidden xl:block h-full">
                <AddTransactionsComponent
                  onClose={() => {
                    setDidsplayTransactionSection(false);
                  }}
                />
              </div>
              <div className="hidden sm:block xl:hidden h-full">
                <AddTransactionsPopup
                  onClose={() => {
                    setDidsplayTransactionSection(false);
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
