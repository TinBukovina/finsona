import React from "react";

import { ThemeBtn } from "@/4_features";
import { SelectAccountCombobox } from "@/4_features/SelectAccount";
import { IconTemplate, person_r_400 } from "@/6_shared";

export default function Navigation() {
  return (
    <div
      className={
        "flex bg-background border-b-2 border-border justify-between items-center w-full  text-sidebar-foreground px-2 py-2" +
        " " +
        `sm:px-8 sm:bg-sidebar-background sm:border-b-0`
      }
    >
      {/*_ACCOUNT SELECTION_*/}
      <SelectAccountCombobox />

      {/*_ACTIONS IN NAVIGATION_*/}
      <div className="hidden sm:flex gap-3">
        {/*_ACCOUNT BTN_*/}
        <div
          className={
            `flex justify-center items-center p-2 bg-secondary fill-secondary-foreground rounded-max` +
            " " +
            `hover:bg-primary hover:scale-103 hover:fill-primary-foreground hover:cursor-pointer active:scale-93 transition-all`
          }
        >
          <IconTemplate svg={person_r_400()} width="24px" height="24px" />
        </div>

        {/*_THEME BTN_*/}
        <ThemeBtn />
      </div>
    </div>
  );
}
