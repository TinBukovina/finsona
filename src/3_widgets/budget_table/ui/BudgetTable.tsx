"use client";

import React, { useState } from "react";

import {
  Button,
  IconTemplate,
  keyboard_arrow_down_r_400,
  keyboard_arrow_up_r_400,
} from "@/6_shared";
import { RemoveTableBtn } from "./RemoveTableBtn";
import { EditTableBtn } from "./EditTableBtn";

export function BudgetTable() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isInEditingMode, setIsInEditingMode] = useState<boolean>(false);

  return (
    <div className="flex items-start gap-4 w-full">
      {/*TABLE*/}
      <div className="w-full bg-card border border-border rounded-card text-card-foreground fill-card-foreground">
        {/*HEADER*/}
        <div
          className={"grid grid-cols-[1fr_120px_120px]  items-center px-6 py-4"}
        >
          {/*NAME*/}
          <button
            className={
              "flex gap-1 items-center w-fit cursor-pointer" +
              " " +
              "hover:text-primary hover:fill-primary"
            }
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p className="text-h6 font-bold">Income</p>
            <IconTemplate
              width="24px"
              height="24px"
              svg={
                !isOpen
                  ? keyboard_arrow_down_r_400()
                  : keyboard_arrow_up_r_400()
              }
            />
          </button>

          {/*COLUMNS*/}
          <p className="text-muted-foreground text-sm text-right">Planned</p>
          <p className="text-muted-foreground text-sm text-right">Received</p>
        </div>

        {isOpen && (
          <>
            {/*ROWS*/}
            <div className="flex flex-col gap-0 px-4 py-4">
              {/*SINGLE ROW*/}
              <div className="grid grid-cols-[1fr_120px_120px] justify-end items-center px-2 py-3 border-b-2 border-border">
                <p>Paycheck 1</p>
                <p className="text-right">$200.00</p>
                <p className="text-right">$100.00</p>
              </div>
              {/*SINGLE ROW*/}
              <div className="grid grid-cols-[1fr_120px_120px] justify-end items-center px-2 py-3 border-b-2 border-border">
                <p>Paycheck 1</p>
                <p className="text-right">$200.00</p>
                <p className="text-right">$100.00</p>
              </div>
              {/*SINGLE ROW*/}
              <div className="grid grid-cols-[1fr_120px_120px] justify-end items-center px-2 py-3 border-b-2 border-border">
                <p>Paycheck 1</p>
                <p className="text-right">$200.00</p>
                <p className="text-right">$100.00</p>
              </div>
            </div>
          </>
        )}
        {/*FOOTER*/}
        <div className="flex justify-start items-center gap-4 px-4 py-4">
          <Button variant={"secondary"}>Add Income</Button>
        </div>
      </div>

      {/*EDITING BTNS*/}
      <div className="flex flex-col gap-2 ">
        <RemoveTableBtn />
        <EditTableBtn
          isActive={isInEditingMode}
          setIsActive={setIsInEditingMode}
        />
      </div>
    </div>
  );
}
