"use client";

import React, { useRef } from "react";
import { BottomNav } from "@/3_widgets";

export function MainContentClient({ children }: { children: React.ReactNode }) {
  const scrollableContentRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <main
        ref={scrollableContentRef}
        className="w-full h-full overflow-auto transparent"
      >
        <div className="w-full h-fit sm:h-full pb-[71px] sm:pb-0">
          {children}
        </div>
      </main>
      <BottomNav scrollableElementRef={scrollableContentRef} />
    </>
  );
}
