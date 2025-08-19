import { add_r_400, IconTemplate } from "@/6_shared";
import React from "react";

interface CreateBudgetTableBtnProps {
  text?: string;
  handleClick?: () => void;
}

export function CreateBudgetTableBtn({
  text = "Add group",
  handleClick,
}: CreateBudgetTableBtnProps) {
  return (
    <div
      className={
        "flex items-center gap-2 w-full bg-card border border-border rounded-max px-4 py-2 text-bg-foreground fill-card-foreground cursor-pointer" +
        " " +
        "hover:bg-card/80"
      }
      onClick={handleClick}
    >
      <IconTemplate svg={add_r_400()} width="24px" height="24px" />
      <p>{text}</p>
    </div>
  );
}
