"use client";

import React, { PropsWithChildren, useRef } from "react";

import { BottomNav, Navigation, Sidebar } from "@/3_widgets";

export default function Layout({ children }: PropsWithChildren) {
  const scrollableContentRef = useRef<HTMLElement | null>(null);

  return (
    <div
      className={
        `flex gap-0 w-full h-dvh bg-background overflow-auto ` +
        " " +
        `touch-none sm:touch-auto` /*This is to prevent zoom on protected pages*/
      }
    >
      <Sidebar />
      <div className="flex flex-col gap-2 sm:gap-0 w-full h-full min-w-0">
        <Navigation />
        <main
          ref={scrollableContentRef}
          className="w-full h-full overflow-auto transparent"
        >
          {/* Div for preventing flickering in hidding nav on scroll */}
          <div className="w-full h-fit sm:h-full pb-[71px] sm:pb-0">
            {children}
          </div>
        </main>
        <BottomNav scrollableElementRef={scrollableContentRef} />
      </div>
    </div>
  );
}
