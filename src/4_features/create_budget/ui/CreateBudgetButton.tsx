"use client";

import React, { useState } from "react";
import { add_r_400, cn, IconTemplate } from "@/6_shared";
import { CreateBudgetModal } from "./CreateBudgetModal";

export function CreateBudgetButton({
  children,
  className,
}: React.ComponentProps<"button">) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        className={cn(
          "flex justify-center items-center p-2 bg-secondary fill-secondary-foreground rounded-max border border-border transition-transform duration-150 ease-in-out",
          "hover:bg-accent hover:fill-accent-foreground hover:cursor-pointer",
          { "scale-93": isActive },
          className
        )}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onClick={() => setIsOpen(true)}
      >
        {!children ? (
          <IconTemplate svg={add_r_400()} width="24px" height="24px" />
        ) : (
          <p>{children}</p>
        )}
      </button>

      <CreateBudgetModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
