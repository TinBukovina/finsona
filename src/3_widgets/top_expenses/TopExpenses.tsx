"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/1_app";
import {
  useBudgetItems,
  useSettings,
  useTransactions,
  useBudgets,
} from "@/5_entities";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getRightFormatedNumber } from "../budget_table/utils";

// Definicija tipa za obrađene podatke radi čistoće koda
interface ProcessedExpenseData {
  totalExpenses: number;
  topExpenses: {
    category: string;
    amount: number;
  }[];
}

export function TopExpenses() {
  const { appState, setSelectedBudget } = useAppContext();
  const { selectedBudgetId, activeWalletId } = appState;
  const { getDecimalSeparator, getValueSeparator } = useSettings();

  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions(selectedBudgetId);
  const { data: budgetItems, isLoading: areItemsLoading } =
    useBudgetItems(selectedBudgetId);
  const { data: budgetsData, isLoading: areBudgetsLoading } =
    useBudgets(activeWalletId);
  const budgets = budgetsData?.budgets;

  useEffect(() => {
    if (selectedBudgetId) {
      return;
    }

    if (budgets && budgets.length > 0) {
      console.log(
        "Dashboard: Nije bilo odabranog budžeta, postavljam prvog dostupnog.",
        budgets[0].id
      );
      setSelectedBudget(budgets[0].id);
    }
  }, [budgets, selectedBudgetId, setSelectedBudget]);

  const isLoading =
    isTransactionsLoading || areItemsLoading || areBudgetsLoading;

  const processedData: ProcessedExpenseData = useMemo(() => {
    if (!transactions || !budgetItems) {
      return { totalExpenses: 0, topExpenses: [] };
    }

    const budgetItemsMap = new Map(budgetItems.map((item) => [item.id, item]));

    let totalExpenses = 0;
    const expenseTransactions = transactions.filter((tr) => {
      if (tr.type === "expense") {
        totalExpenses += Number(tr.amount);
        return true;
      }
      return false;
    });

    const categoryTotals: { [categoryName: string]: number } = {};
    for (const tr of expenseTransactions) {
      if (!tr.budget_item_id) continue;
      const item = budgetItemsMap.get(tr.budget_item_id);
      if (item) {
        if (!categoryTotals[item.category]) {
          categoryTotals[item.category] = 0;
        }
        categoryTotals[item.category] += Number(tr.amount);
      }
    }

    const sortedExpenses = Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

    return { topExpenses: sortedExpenses, totalExpenses };
  }, [budgetItems, transactions]);

  const COLORS = ["#6366f1", "#818cf8", "#a5b4fc"];

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm min-h-[250px] flex justify-center items-center">
        Učitavanje troškova...
      </div>
    );
  }

  console.log(processedData);

  if (!selectedBudgetId || processedData.topExpenses.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm min-h-[250px] flex flex-col justify-center items-center">
        <h3 className="font-semibold text-lg text-card-foreground">
          Top Expenses
        </h3>
        <p className="text-muted-foreground mt-4">
          No expense data for the selected budget.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-card rounded-lg border border-border pb-4 px-4 py-2 shadow-sm">
      {/*TITLE*/}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-h5 text-card-foreground">
          Top Expenses
        </h3>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-6">
        {/*EXPENSE LIST*/}
        <div className="flex-1 flex flex-col gap-4">
          {processedData.topExpenses.map((expense) => {
            const percentage =
              (expense.amount / processedData.totalExpenses) * 100;
            return (
              <div key={expense.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-card-foreground text-h6">
                    {expense.category}
                  </span>
                  <span className="font-medium text-primary text-normal">
                    $
                    {getRightFormatedNumber(
                      String(expense.amount),
                      getDecimalSeparator(),
                      getValueSeparator()
                    )}
                  </span>
                </div>
                <div className="w-full bg-secondary border border-border rounded-max h-3.5">
                  <div
                    className="bg-primary h-3.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pie Chart */}
        <div className="relative w-full sm:w-[160px] h-[160px] flex-shrink-0 flex justify-center items-center ">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "rgba(20, 20, 20, 0.8)",
                  border: "none",
                  borderRadius: "0.5rem",
                }}
              />
              <Pie
                data={processedData.topExpenses}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={70}
                paddingAngle={5}
                stroke="none"
              >
                {processedData.topExpenses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-2xl font-bold text-card-foreground">
              $
              {getRightFormatedNumber(
                String(processedData.totalExpenses),
                getDecimalSeparator(),
                getValueSeparator()
              )}
            </span>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
        </div>
      </div>
    </div>
  );
}
