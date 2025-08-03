import React, { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div
      className={
        `w-full h-dvh flex items-center justify-center overflow-hidden bg-card xs:bg-background` +
        " " +
        `touch-none sm:touch-auto` /*This is to prevent zoom on auth pages*/
      }
    >
      {children}
    </div>
  );
}
