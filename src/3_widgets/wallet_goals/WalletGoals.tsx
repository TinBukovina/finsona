"use client";

import { GoalInterface } from "@/5_entities";
import { Button, DatePicker, Iinput } from "@/6_shared";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Separator } from "./Separator";
import { Goal } from "./Goal";

interface GoalsWidgetProps {}

type ComponentStateType = "empty" | "create" | "view";

export function GoalsWidget({}: GoalsWidgetProps) {
  const [state, setState] = useState<ComponentStateType>("view");
  const [goals, setGoals] = useState<Partial<GoalInterface>[]>([
    {
      name: "Test goal",
      target_amount: 10000,
      start_date: new Date(),
      target_date: new Date(),
    },
  ]);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (state === "view" && goals.length <= 0) {
      setState("empty");
    }
  }, [state, goals]);

  return (
    <div className="flex flex-col gap-0 bg-card rounded-card border border-border p-4 h-full">
      <h5 className="text-h5 font-semibold">Goals</h5>

      <div className="flex-1 h-min-0 flex justify-center items-center">
        {/*NO GOALS*/}
        {goals.length <= 0 && state === "empty" && (
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col gap-1 items-center">
              <Image
                src={`/imgs/no_goal.svg`}
                alt={`No goals`}
                width={150}
                height={150}
              />
              <p className="text-h6">Need a goal?</p>
            </div>
            <Button
              onClick={() => {
                setState("create");
              }}
            >
              Create one
            </Button>
          </div>
        )}

        {/*ADDING GOALS*/}
        {state === "create" && (
          <div className="flex flex-col gap-6 flex-1 min-h-0 h-full">
            <div className="flex gap-0 flex-1 min-h-0 h-full relative">
              {/*NUMBERING*/}
              <div className="flex flex-col gap-1.5 items-center py-1">
                <div className="flex justify-center items-center w-8 h-8 bg-secondary rounded-max">
                  1
                </div>
                {Array.from({ length: 3 }, (_, index) => (
                  <Separator key={index} />
                ))}
                <div className="flex justify-center items-center w-8 h-8 bg-secondary rounded-max">
                  2
                </div>
                {Array.from({ length: 3 }, (_, index) => (
                  <Separator key={index} />
                ))}
                <div className="flex justify-center items-center w-8 h-8 bg-secondary rounded-max">
                  3
                </div>
              </div>
              {/*INPUTS*/}
              <div className="px-4 py-2">
                <div className="mb-6">
                  <p className="mb-3">Name your goal</p>
                  <Iinput
                    placeholder={"Summer"}
                    value={""}
                    setValue={() => {}}
                    disableAutoWidth={true}
                  />
                </div>

                <div className="mb-6.5">
                  <p className="mb-3">Enter target amount for your goal</p>
                  <Iinput
                    placeholder={"Summer"}
                    value={""}
                    setValue={() => {}}
                    disableAutoWidth={true}
                  />
                </div>

                <div>
                  <p className="mb-3">Enter deadline for your goal</p>
                  <DatePicker value={date} setValue={setDate} />
                </div>
              </div>
            </div>
            {/*BTNS*/}
            <div className="flex items-center gap-4">
              <Button
                variant={"secondary"}
                className="flex-1"
                onClick={() => setState("view")}
              >
                Back
              </Button>
              <Button className="flex-1">Confirm</Button>
            </div>
          </div>
        )}

        {/*DISPLAYING GOALS*/}
        {goals.length > 0 && state === "view" && (
          <div className="mt-4 flex-1 flex flex-col justify-start gap-4 h-full ">
            {/*GOALS*/}
            <Goal goalData={goals.at(0)} />
          </div>
        )}
      </div>
    </div>
  );
}
