"use client";

import { useAppContext } from "@/1_app";
import { AddTransactions, SearchTransactions } from "@/3_widgets";
import { getRightFormatedNumber } from "@/3_widgets/budget_table/utils";
import { TransactionsFilter } from "@/3_widgets/transaction_table_actions/TransactionsFilter";
import {
  BudgetItemInterface,
  useBudgetItems,
  useBudgets,
  useSettings,
  useTransactions,
} from "@/5_entities";
import { Button, DivLoader } from "@/6_shared";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";

export function TransactionPageClientView() {
  const [searchParam, setSearchParam] = useState<string>("");
  const [type, setType] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [isAddingTransaction, setIsAddingTransactions] =
    useState<boolean>(false);

  const { appState, setSelectedBudget } = useAppContext();
  const { selectedBudgetId, activeWalletId } = appState;
  const { getDecimalSeparator, getValueSeparator } = useSettings();

  const { data: budgetData } = useBudgets(activeWalletId);
  const budgets = budgetData?.budgets;

  const { data: transactions, isLoading: areTransactionsLoading } =
    useTransactions(selectedBudgetId || null);
  const { data: budgetItems, isLoading: areItemsLoading } = useBudgetItems(
    selectedBudgetId || null
  );

  useEffect(() => {
    if (budgets && budgets.length > 0 && !selectedBudgetId) {
      setSelectedBudget(budgets[0].id);
    }
  }, [budgets, selectedBudgetId, setSelectedBudget]);

  const budgetItemsMap = useMemo(() => {
    if (!budgetItems) return new Map<string, BudgetItemInterface>();
    return new Map(budgetItems.map((item) => [item.id, item]));
  }, [budgetItems]);

  const isLoading = areTransactionsLoading || areItemsLoading;

  const availableCategories = useMemo(() => {
    if (!budgetItems) return [];

    return [...new Set(budgetItems.map((item) => item.category))];
  }, [budgetItems]);

  const filteredTransactions = useMemo(() => {
    let res = transactions;

    // Search filter
    if (searchParam) {
      res = res?.filter((tr) =>
        tr.description.toLowerCase().includes(searchParam.toLowerCase())
      );
    }

    // Type filter
    if (type) {
      res = res?.filter((tr) => tr.type === type);
    }

    // Category filter
    if (category) {
      res = res?.filter((tr) => {
        if (!tr.budget_item_id) return false;
        const item = budgetItemsMap.get(tr.budget_item_id);
        return item ? item.category === category : false;
      });
    }

    return res;
  }, [transactions, searchParam, type, category, budgetItemsMap]);

  console.log(filteredTransactions);

  return (
    <div className="flex gap-4 flex-1 min-h-0">
      <div
        className={
          "flex flex-col gap-4 flex-1 min-h-0" +
          " " +
          `${isAddingTransaction && "hidden sm:block"}`
        }
      >
        <div className="flex flex-col gap-3">
          {/*SEARCH AND ADD BTN*/}
          <div className="flex justify-between items-center">
            {/*SEARCH*/}
            <SearchTransactions onEnter={setSearchParam} />

            {/*ADD BTN*/}
            <div className={isAddingTransaction ? "hidden" : "block"}>
              <Button
                onClick={() => {
                  setIsAddingTransactions(true);
                }}
              >
                Add
              </Button>
            </div>
          </div>

          {/*FILTER SECTION*/}
          <div className="flex items-center gap-3">
            <TransactionsFilter
              text="Type"
              values={["all", "expense", "income"]}
              value={type}
              onChange={(newType: string | undefined) => setType(newType)}
            />
            <TransactionsFilter
              text="Category"
              values={["all", ...availableCategories]}
              value={category}
              onChange={(newCategory: string | undefined) =>
                setCategory(newCategory)
              }
            />
          </div>
        </div>

        {/*TABLE*/}
        <div className="flex-1 flex flex-col gap-0 rounded-card">
          {/*TABLE HEADER*/}
          <div className="grid grid-cols-4 gap-4 pr-7 px-6 py-4 bg-card rounded-t-card border border-border border-b-0">
            <div className="text-card-foreground font-semibold">Category</div>
            <div className="text-card-foreground font-semibold">Amount</div>
            <div className="text-card-foreground font-semibold">Date</div>
            <div className="text-card-foreground font-semibold">Type</div>
          </div>

          {/*TABLE BODY*/}
          <div className="flex-1 min-h-0 flex flex-col gap-0 justify-start items-center sm:overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-transparent border border-border">
            {/*TABLE ROWS*/}
            {isLoading ? (
              <div className="flex-1 h-min-0 flex flex-col gap-4 px-4 py-4 w-full">
                {Array.from({ length: 7 }).map((_, index) => (
                  <DivLoader
                    key={index}
                    width="100%"
                    height="7%"
                    className="px-4"
                    bg="secondary"
                  />
                ))}
              </div>
            ) : (
              filteredTransactions?.map((tr) => {
                const item = tr.budget_item_id
                  ? budgetItemsMap.get(tr.budget_item_id)
                  : null;

                return (
                  <div
                    key={tr.id}
                    className="flex-1 w-full flex-col gap-4  justify-start items-center"
                  >
                    {/*DESKTOM ROW VERSION*/}
                    <div
                      key={tr.id + "desktop"}
                      className="flex-1 hidden sm:grid grid-cols-4 gap-4 px-6 py-4 w-full border-b border-border"
                    >
                      <span>
                        {item
                          ? `${item.category} - ${item.name}`
                          : "Uncategorized"}
                      </span>
                      <span>
                        $
                        {getRightFormatedNumber(
                          String(tr.amount),
                          getDecimalSeparator(),
                          getValueSeparator()
                        )}
                      </span>
                      <span>
                        {new Date(tr.transaction_date).toLocaleDateString()}
                      </span>
                      <span>{tr.type}</span>
                    </div>

                    {/*Mobile ROW VERSION*/}
                    <div
                      key={tr.id + "mobile"}
                      className="sm:hidden flex-1 flex gap-4 w-full px-4 py-2 items-center border-b border-border"
                    >
                      <div className="flex flex-col justify-center items-center gap-0 text-sm">
                        <p className="font-semibold">
                          {format(tr.transaction_date, "dd")}
                        </p>
                        <p className="text-muted-foreground">
                          {format(tr.transaction_date, "MMM").toUpperCase()}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="text-h6">
                          {item
                            ? `${item.category} - ${item.name}`
                            : "Uncategorized"}
                        </div>
                        <div className="text-muted-foreground">
                          {tr.description}.
                        </div>
                      </div>
                      <p
                        className={
                          `${
                            tr.type === "expense"
                              ? "text-destructive"
                              : "text-success"
                          }` +
                          " " +
                          "font-semibold"
                        }
                      >
                        {tr.type === "expense" ? "-" : "+"} ${tr.amount}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/*TABLE FOOTER*/}
          <div className="flex items-center gap-4 px-6 py-3 bg-card border border-border border-t-0 rounded-b-card">
            {/*NUMBER OF TRANSACTION SELECT*/}
            <div className="flex items-center gap-2 w-fit px-3 py-1 pr-4 bg-secondary border border-border rounded-max text-secondary-foreground fill-secondary-foreground">
              {filteredTransactions?.length || 0}
              {/* <IconTemplate
                svg={keyboard_arrow_down_r_400()}
                width="24px"
                height="24px"
              /> */}
            </div>

            {/*DESCRIPTION OF A BTN*/}
            <p className="text-muted-foreground">Number of transactions</p>
          </div>
          <div className={"h-[74px] bg-transaprent sm:hidden"}></div>
        </div>
      </div>
      {isAddingTransaction && (
        <AddTransactions
          onClose={() => {
            setIsAddingTransactions(false);
          }}
        />
      )}
    </div>
  );
}
