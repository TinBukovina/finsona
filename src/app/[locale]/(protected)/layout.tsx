import React, { PropsWithChildren } from "react";

import { BottomNav, Navigation, Sidebar } from "@/3_widgets";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div
      className={
        `flex gap-0 h-dvh bg-background overflow-auto` +
        " " +
        `touch-none sm:touch-auto` /*This is to prevent zoom on protected pages*/
      }
    >
      <Sidebar />
      <div className="flex flex-col gap-4 w-full h-full">
        <Navigation />
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
