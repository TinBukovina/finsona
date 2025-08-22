"use client";

import React, { useState } from "react";

import { ThemeBtn } from "@/4_features";
import { cn, IconTemplate, person_r_400 } from "@/6_shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/6_shared/ui/components/dropdown-menu";
import { CreateWalletButton } from "@/4_features/create_wallet";

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isActiveAccountButton, setIsActiveAccountButton] =
    useState<boolean>(false);

  return (
    <div
      className={
        "flex bg-background border-b-2 border-border justify-between items-center w-full  text-sidebar-foreground px-2 py-2" +
        " " +
        `sm:px-8 sm:bg-sidebar-background sm:border-b-0`
      }
    >
      <div className="flex items-center gap-4">
        {/*ACTIVE WALLET SELECTION*/}
        {children}
        {/*OPEN WALLET MODAL BTN*/}
        <CreateWalletButton />
      </div>

      {/*ADD WALLET BTN*/}

      {/*_ACTIONS IN NAVIGATION_*/}
      <div className="hidden sm:flex gap-3">
        {/*_ACCOUNT BTN_*/}
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            // 2. Dodajemo event handlere za mousedown i mouseup
            onMouseDown={() => setIsActiveAccountButton(true)}
            onMouseUp={() => setIsActiveAccountButton(false)}
            // onMouseLeave se dodaje kao osigurač ako korisnik odvuče miš s gumba
            onMouseLeave={() => setIsActiveAccountButton(false)}
          >
            <button
              className={cn(
                // Osnovni stilovi
                "flex justify-center items-center p-2 bg-secondary fill-secondary-foreground rounded-max border border-border transition-transform duration-150 ease-in-out",
                // Hover stilovi
                "hover:bg-primary hover:fill-primary-foreground hover:cursor-pointer",
                // 3. Uvjetno primjenjujemo scale na temelju našeg ručnog stanja
                {
                  "scale-93": isActiveAccountButton,
                }
              )}
            >
              <IconTemplate svg={person_r_400()} width="24px" height="24px" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/*_THEME BTN_*/}
        <ThemeBtn />
      </div>
    </div>
  );
}
