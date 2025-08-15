"use client";

import React from "react";

import { Button, cn, edit_r_400, IconTemplate } from "@/6_shared";

interface EditTableBtn {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export function EditTableBtn({ isActive, setIsActive }: EditTableBtn) {
  return (
    <Button
      className={cn("p-2 w-fit h-fit cursor-pointer hover:scale-103", {
        "bg-secondary fill-secondary-foreground hover:bg-secondary/80":
          !isActive,
        "bg-primary fill-primary-foreground hover:bg-primary/80": isActive,
      })}
      onClick={() => setIsActive((prev) => !prev)}
    >
      <IconTemplate svg={edit_r_400()} width="24px" height="24px" />
    </Button>
  );
}
