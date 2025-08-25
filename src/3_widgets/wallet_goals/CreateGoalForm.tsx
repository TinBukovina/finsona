import React from "react";
import { useCreateGoalForm } from "./useCreateGoalForm";
import { Separator } from "./Separator";
import { Button, DatePicker, Iinput } from "@/6_shared";

type CreateGoalFormProps = ReturnType<typeof useCreateGoalForm> & {
  onBack: () => void;
};

export function CreateGoalForm({
  name,
  setName,
  targetAmount,
  setTargetAmount,
  targetDate,
  setTargetDate,
  isLoading,
  handleSubmit,
  onBack,
}: CreateGoalFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 flex-1 w-full h-full"
    >
      <div className="flex gap-0 flex-1 min-h-0 h-full relative">
        {/* NUMBERING */}
        <div className="flex flex-col gap-1.5 items-center py-1">
          <div className="flex justify-center items-center w-8 h-8 bg-secondary rounded-max text-secondary-foreground">
            1
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <Separator key={index} />
          ))}
          <div className="flex justify-center items-center w-8 h-8 bg-secondary rounded-max text-secondary-foreground">
            2
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <Separator key={index} />
          ))}
          <div className="flex justify-center items-center w-8 h-8 bg-secondary rounded-max text-secondary-foreground">
            3
          </div>
        </div>

        {/* INPUTS */}
        <div className="px-4 py-2 flex-1 flex flex-col justify-start gap-7">
          <div>
            <p className="mb-2 font-medium">Name your goal</p>
            <Iinput
              placeholder="e.g., Summer Vacation"
              value={name}
              setValue={setName}
              disableAutoWidth={true}
              disabled={isLoading}
            />
          </div>
          <div className="mb-[2px]">
            <p className="mb-2 font-medium">Enter target amount</p>
            <Iinput
              placeholder="1500"
              value={targetAmount}
              setValue={setTargetAmount}
              disableAutoWidth={true}
              type="number"
              disabled={isLoading}
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Enter deadline</p>
            <DatePicker
              value={targetDate}
              setValue={setTargetDate}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* BTNS */}
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          type="button"
          className="flex-1"
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Creating..." : "Confirm"}
        </Button>
      </div>
    </form>
  );
}
