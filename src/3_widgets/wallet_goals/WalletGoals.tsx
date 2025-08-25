"use client";

import { GoalInterface, useGoals } from "@/5_entities";
import { Button, DatePicker, Iinput } from "@/6_shared";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Separator } from "./Separator";
import { Goal } from "./Goal";
import { CreateGoalForm } from "./CreateGoalForm";
import { useCreateGoalForm } from "./useCreateGoalForm";

type ComponentStateType = "empty" | "create" | "view" | "loaindg";

export function GoalsWidget() {
  const { data: goalsData, isLoading, error } = useGoals();
  const goals = useMemo(() => goalsData || [], [goalsData]);

  const createForm = useCreateGoalForm({
    onSuccess: () => setViewState(goals.length > 0 ? "view" : "empty"),
  });

  const [viewState, setViewState] = useState<ComponentStateType>("view");

  useEffect(() => {
    if (isLoading) {
      setViewState("loaindg");
    } else if (error) {
      console.log(error);
    } else if (goals.length > 0) {
      setViewState("view");
    } else {
      setViewState("empty");
    }
  }, [goals, error, isLoading]);

  useEffect(() => {
    if (viewState === "view" && goals.length <= 0) {
      setViewState("empty");
    }
  }, [goals, viewState]);

  return (
    <div className="flex flex-col gap-0 bg-card rounded-card border border-border p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-h5 font-semibold">Goals</h5>

        {viewState === "view" && (
          <Button onClick={() => setViewState("create")}>Add</Button>
        )}
      </div>

      <div className="flex-1 h-min-0 flex justify-center items-center">
        {/*NO GOALS*/}
        {viewState === "empty" && (
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
                setViewState("create");
              }}
            >
              Create one
            </Button>
          </div>
        )}

        {/*ADDING GOALS*/}
        {viewState === "create" && (
          <CreateGoalForm
            {...createForm}
            onBack={() => setViewState(goals.length > 0 ? "view" : "empty")}
          />
        )}

        {/*DISPLAYING GOALS*/}
        {viewState === "view" && (
          <div className="mt-4 flex-1 flex flex-col justify-start gap-4 h-full ">
            {/*GOALS*/}
            {goals.map((goal) => (
              <Goal key={goal.id} goalData={goal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
