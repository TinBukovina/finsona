"use client";

import {
  arrow_back_IOS_r_400,
  Button,
  IconTemplate,
  Iinput,
  Input,
} from "@/6_shared";
import { format } from "date-fns";
import React, { useState } from "react";

interface GoalProps {
  goalData: {
    name: string;
    target_date: Date;
    target_amount: number;
  };
  currentAmount?: number;
}

export function Goal({ goalData, currentAmount = 5000 }: GoalProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  console.log("CURRENT AMOUNT: ", currentAmount);
  console.log("TOTAL: ", goalData.target_amount);
  console.log((currentAmount / goalData.target_amount) * 100);
  return (
    <div
      className={
        "flex flex-col gap-6 px-5 py-2 w-full bg-secondary border border-border mb-4 " +
        `${isOpened ? "rounded-card" : "rounded-max"}`
      }
    >
      {/*HEDER (NAME AND DEADLINE)*/}
      <div className="flex justify-between items-center">
        {/*NAME*/}
        <div
          className="flex items-center gap-2 w-fit text-secondary-foreground fill-secondary-foreground hover:cursor-pointer hover: hover:text-primary hover:fill-primary"
          onClick={() => {
            console.log(isOpened);
            setIsOpened((prev) => !prev);
          }}
        >
          <p className="text-h6">{goalData.name} </p>
          <div
            className={
              "w-fit h-fit " + `${isOpened ? "rotate-90" : "rotate-270"}`
            }
          >
            <IconTemplate
              svg={arrow_back_IOS_r_400()}
              width="12px"
              height="12px"
            />
          </div>
        </div>
        {/*DEADLINE*/}
        <p className="text-muted-foreground">
          Deadline: {format(goalData.target_date, "dd/MM/yyyy")}
        </p>
      </div>

      {/*CONTENT*/}
      {isOpened && (
        <div className="flex flex-col gap-6">
          {/*AMOUNT*/}
          <div className="flex flex-col gap-2">
            <p className="text-center">
              ${currentAmount}.00 / ${goalData.target_amount}.00
            </p>
            <div className="bg-card w-full h-4 border border-border rounded-max">
              <div
                className="bg-primary border border-transparent rounded-max h-[14px]"
                style={{
                  width: `${(currentAmount / goalData.target_amount) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          {/*LIST*/}
          {/*ACTIONS*/}
          <div className="flex flex-col gap-3">
            <Iinput
              placeholder="Enter amount"
              value={""}
              setValue={() => {}}
              disableAutoWidth={true}
            />
            <div className="flex gap-3">
              <Button>Add amount</Button>
              <Button>Remove amount</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
