"use client";

import React from "react";
import {
  Button,
  capitalizeFirstLetter,
  cn,
  DatePicker,
  Iinput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/6_shared";
import { BudgetItemInterface, useSettings } from "@/5_entities";
import { useAddTransactionForm } from "./useAddTransactionForm";

type AddTransactionsFormProps = ReturnType<typeof useAddTransactionForm> & {
  onClose?: () => void;
};

export function AddTransactionsForm({
  amount,
  date,
  budgetItem,
  description,
  transactionType,
  availableBudgetItems,
  isLoading,
  setAmount,
  setDate,
  setBudgetItem,
  setDescription,
  setTransactionType,
  handleSubmit,
  onClose,
}: AddTransactionsFormProps) {
  const { getDecimalSeparator } = useSettings();

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-card px-4 py-3">
      {/* HEADER */}
      <div className="flex flex-none justify-between items-center">
        <h6 className="text-h6 font-bold">Add Transaction</h6>

        {/* TOGGLE ELEMENT */}
        <div
          className="flex justify-between items-center px-3 py-2 w-[144px] bg-primary rounded-max cursor-pointer"
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
            className={`flex ${
              transactionType === "expense" ? "justify-start" : "justify-end"
            } w-[40px] bg-primary-foreground rounded-max p-1 transition-all`}
          >
            <div className="w-4 h-4 bg-primary rounded-max" />
          </div>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col grow justify-between gap-4 mt-6 min-h-0"
      >
        <div className="flex flex-col gap-4">
          <Iinput
            value={amount}
            setValue={setAmount}
            placeholder={"0" + getDecimalSeparator() + "00"}
            disableAutoWidth={true}
            className="bg-input/30"
            type="text"
            disabled={isLoading}
          />
          <DatePicker value={date!} setValue={setDate} disabled={isLoading} />
          <Iinput
            value={description}
            setValue={setDescription}
            placeholder="Description (e.g., Groceries)"
            disableAutoWidth={true}
            className="bg-input/30"
            disabled={isLoading}
          />
          <Select
            value={budgetItem}
            onValueChange={setBudgetItem}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full text-normal justify-between">
              <SelectValue placeholder="Choose Budget Category" />
            </SelectTrigger>
            <SelectContent>
              {availableBudgetItems.map((item: BudgetItemInterface) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.category} - {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            type="button" // Važno: type="button" da ne submituje formu
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Saving..." : "Confirm"}
          </Button>
        </div>
      </form>
    </div>
  );
}
