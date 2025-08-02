import { ThemeBtn } from "@/4_features";
import {
  IconTemplate,
  keyboard_arrow_down_r_400,
  person_r_400,
  sunny_r_400,
} from "@/6_shared";
import React from "react";

export default function Navigation() {
  return (
    <div className="flex justify-between items-center w-full bg-sidebar-background text-sidebar-foreground px-8 py-2">
      {/*_ACCOUNT SELECTION_*/}
      <div className="shrink-0 flex justify-between items-center px-4 py-2 max-w-[200px] w-full bg-secondary rounded-max text-secondary-foreground fill-secondary-foreground">
        <p className="text-normal font-medium">Personal wallet</p>
        <IconTemplate
          svg={keyboard_arrow_down_r_400()}
          width="24px"
          height="24px"
        />
      </div>

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
