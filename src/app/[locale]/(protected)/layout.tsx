import React, { PropsWithChildren } from "react";

import { BottomNav, Sidebar } from "@/3_widgets";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div
      className={
        `flex flex-col gap-2 h-dvh bg-background overflow-auto` +
        " " +
        `sm:flex sm:flex-row sm:gap-4`
      }
    >
      <Sidebar />
      <BottomNav />
      {children}
    </div>
  );
}
