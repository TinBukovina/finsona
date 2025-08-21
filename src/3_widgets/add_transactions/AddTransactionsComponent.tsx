"use client";

import React, { useEffect, useState } from "react";

import {
  Button,
  capitalizeFirstLetter,
  close_r_400,
  cn,
  DatePicker,
  IconTemplate,
  Iinput,
  isStringValidDecimal,
  last_page_r_400,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/6_shared";
import { BudgetItemInterface, useSettings } from "@/5_entities";
import { useAppContext } from "@/1_app";

interface AddTransactionsComponentProps {
  flowing?: boolean;
  onClose?: () => void;
}

/* wallet_id: 010b3bb7-56c8-4557-b83c-8e05cc6642fb 
  budget_id: 38cb81ce-ab73-4660-a1bd-7f477d9323db
*/
const lastDate = new Date("2025-08-01");

export function AddTransactionsComponent({
  flowing = false,
  onClose,
}: AddTransactionsComponentProps) {
  const { getDecimalSeparator } = useSettings();
  const { addToast } = useToast();
  const { appState } = useAppContext();

  const [hideContent, setHideContent] = useState<boolean>(false);

  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );

  const [expenses, setExpenses] = useState<BudgetItemInterface[]>([]);

  // Form state
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [budgetItem, setBudgetItem] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const resetInputs = () => {
    setAmount("");
    setDate(undefined);
    setBudgetItem("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (
        !amount ||
        amount === "" ||
        !date ||
        !budgetItem ||
        budgetItem === "" ||
        !description ||
        description === ""
      ) {
        addToast("Please fill all fields!", "error");
        return;
      }

      // Check if the string is valid number
      if (!isStringValidDecimal(amount)) {
        addToast("Please enter valid amount!", "error");
        return;
      }

      // Check if date is not in the future or is not before lastDate (data when the budget started)
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (date > today) {
        addToast("The selected date cannot be in the future!", "error");
        return;
      }

      if (lastDate && date < lastDate) {
        addToast(
          "The selected date cannot be before selected budget!",
          "error"
        );
        return;
      }

      if (!appState.selectedBudgetId) {
        addToast("Please select a budget!", "error");
        return;
      }

      if (!appState.activeWalletId) {
        addToast("Please select a wallet!", "error");
        return;
      }

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_id: appState.activeWalletId,
          budget_item_id: budgetItem, // budgetItem == budgetItemId
          type: transactionType,
          amount: amount,
          description: description,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        addToast(responseData.message, "error");
      } else {
        addToast("Successfuly created transaction!", "success");
        if (onClose) onClose();
        resetInputs();
      }
    } catch (error) {
      console.log(error);
      addToast("Something went wrong.", "error");
    }
  };

  useEffect(() => {
    if (!appState.selectedBudgetId) return;

    const handleExpensesFetch = async () => {
      try {
        const response = await fetch(
          `/api/budget-items/getAll/${appState.selectedBudgetId}`,
          {
            method: "GET",
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          console.log(responseData);
          addToast("Error loading expenses!", "error");
        } else {
          setExpenses(responseData);
        }
      } catch (error) {
        console.error("Error:", error);
        addToast("Something went wrong.", "error");
      }
    };

    handleExpensesFetch();
  }, [addToast, appState.selectedBudgetId]);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-4 py-3 bg-card border border-border rounded-card  ",
        {
          "fixed bottom-0 right-2 w-[500px] rounded-b-none": flowing,
          "min-w-[450px] h-full": !flowing,
        }
      )}
    >
      {/*CONTENT*/}
      {!hideContent && (
        <div className="flex flex-col h-full">
          {/*HEADER*/}
          <div className="flex flex-none justify-between items-center">
            <h6 className="text-h6 font-bold">Add expense</h6>

            {/*TOGGLE ELEMENT*/}
            <div
              className="flex justify-between px-3 py-2 w-[144px] bg-primary rounded-max"
              onClick={() =>
                setTransactionType((prev) =>
                  prev === "income" ? "expense" : "income"
                )
              }
            >
              <p className="text-primary-foreground font-semibold">
                {capitalizeFirstLetter(transactionType)}
              </p>

              <div
                className={`flex ${transactionType === "expense" ? "justify-start" : "justify-end"} w-[40px] bg-primary-foreground rounded-max p-1`}
              >
                <div className="w-4 h-4 bg-primary rounded-max" />
              </div>
            </div>
          </div>

          {/*FORM*/}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col grow justify-between gap-4 mt-6 min-h-0"
          >
            <div className="flex flex-col gap-4">
              <Iinput
                value={amount !== "" ? "$" + amount : ""}
                setValue={setAmount}
                placeholder={"$0" + getDecimalSeparator() + "00"}
                disableAutoWidth={true}
                className="bg-input/30"
              />
              <DatePicker value={date} setValue={setDate} />
              <Iinput
                value={description}
                setValue={setDescription}
                placeholder={"Where did you spent this money?"}
                disableAutoWidth={true}
                className="bg-input/30"
              />
              <Select value={budgetItem} onValueChange={setBudgetItem}>
                <SelectTrigger className="w-full text-normal justify-between fill-primary bg-red-500">
                  <SelectValue placeholder={"Choose Budget category"} />
                </SelectTrigger>
                <SelectContent className="bg-popover p-[2px]">
                  {expenses
                    .filter((el) => {
                      if (transactionType === "income") {
                        return el.category.toLowerCase() === "income";
                      } else {
                        return el.category.toLowerCase() !== "income";
                      }
                    })
                    .map((expense) => (
                      <SelectItem key={expense.id} value={expense.id}>
                        {expense.category + " - " + expense.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant={"secondary"}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  if (onClose) {
                    onClose();
                  }
                }}
                className="flex-1"
              >
                Cancle
              </Button>
              <Button className="flex-1">Confirm</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
