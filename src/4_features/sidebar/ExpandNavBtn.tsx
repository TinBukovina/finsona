import React from "react";

import { IconTemplate, split_screen_left_r_400 } from "@/6_shared";

export default function ExpandNavBtn() {
  return (
    <div
      tabIndex={0}
      className={
        `flex items-center justify-center fill-sidebar-foreground p-2 rounded-max ` +
        "hover:bg-accent hover:cursor-pointer"
      }
    >
      <IconTemplate
        path={split_screen_left_r_400().path}
        viewBox={split_screen_left_r_400().viewBox}
        width="24px"
        height="24px"
      />
    </div>
  );
}
