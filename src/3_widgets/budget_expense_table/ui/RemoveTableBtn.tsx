"use client";

import React from "react";

import { Button, delete_r_400, IconTemplate } from "@/6_shared";

interface RemoveTableBtnProps {
  handleClick?: () => void;
}

export function RemoveTableBtn({ handleClick }: RemoveTableBtnProps) {
  return (
    <Button
      className={
        "p-2 w-fit h-fit bg-destructive fill-destructive-foreground cursor-pointer" +
        " " +
        "hover:bg-destructive/80 hover:scale-103"
      }
      onClick={handleClick}
    >
      <IconTemplate svg={delete_r_400()} width="24px" height="24px" />
    </Button>
  );
}
