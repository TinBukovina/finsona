"use client";

import React, { useState } from "react";
import {
  Button,
  IconTemplate,
  Iinput,
  arrow_back_IOS_r_400,
  useToast,
} from "@/6_shared";
import { format } from "date-fns";
import { GoalInterface, useUpdateGoal, useGoals } from "@/5_entities/goal";
import { useSettings } from "@/5_entities";
interface GoalProps {
  goalData: GoalInterface;
}

export function Goal({ goalData }: GoalProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");

  const { addToast } = useToast();
  const { getActiveCurrency } = useSettings();
  const { updateGoal, isUpdating } = useUpdateGoal(goalData.id);

  const { mutate: mutateGoals } = useGoals();

  const handleAmountUpdate = async (operation: "add" | "remove") => {
    const value = parseFloat(amount.replace(",", "."));

    if (isNaN(value) || value <= 0) {
      addToast("Please enter a valid amount.", "error");
      return;
    }

    const amountToSend = operation === "add" ? value : -value;

    try {
      await updateGoal(amountToSend);
      addToast(
        `Amount ${operation === "add" ? "added" : "removed"} successfully!`,
        "success"
      );
      mutateGoals();
      setAmount("");
    } catch (error) {
      console.log(error);
      addToast("Something went wrong.", "error");
    }
  };

  const progressPercentage =
    (goalData.current_amount / goalData.target_amount) * 100;

  return (
    <div
      className={
        "flex flex-col gap-6 px-5 py-2 w-full bg-secondary border border-border mb-4 transition-all rounded-card "
      }
    >
      {/* HEDER */}
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-2 w-fit text-secondary-foreground fill-secondary-foreground hover:cursor-pointer hover:text-primary hover:fill-primary"
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <p className="text-h6">{goalData.name}</p>
          <div
            className={
              "w-fit h-fit transition-transform " +
              `${isOpened ? "rotate-90" : "rotate-[-90deg]"}`
            }
          >
            <IconTemplate
              svg={arrow_back_IOS_r_400()}
              width="12px"
              height="12px"
            />
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Deadline: {format(new Date(goalData.target_date), "dd/MM/yyyy")}
        </p>
      </div>

      {/* CONTENT */}
      {isOpened && (
        <div className="flex flex-col gap-6">
          {/*PROGRESS BAR*/}
          <div className="flex flex-col gap-2">
            <p className="text-center text-card-foreground">
              {getActiveCurrency()}
              {goalData.current_amount.toFixed(2)} / {getActiveCurrency()}
              {goalData.target_amount.toFixed(2)}
            </p>
            <div className="bg-card w-full h-4 border border-border rounded-max overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{
                  width: `${progressPercentage > 100 ? 100 : progressPercentage}%`,
                }}
              ></div>
            </div>
          </div>

          {/*ACTIONS (INPUT I GUMBI)*/}
          <div className="flex flex-col gap-3">
            <Iinput
              placeholder="Enter amount"
              value={amount}
              setValue={setAmount}
              disableAutoWidth={true}
              type="number"
              disabled={isUpdating}
            />
            <div className="flex gap-3">
              <Button
                onClick={() => handleAmountUpdate("add")}
                disabled={isUpdating}
                className="flex-1"
              >
                {isUpdating ? "Adding..." : "Add amount"}
              </Button>
              <Button
                onClick={() => handleAmountUpdate("remove")}
                disabled={isUpdating}
                variant="secondary"
                className="flex-1"
              >
                {isUpdating ? "Removing..." : "Remove amount"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
