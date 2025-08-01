import React, { PropsWithChildren } from "react";

export default function CardLoader({ children }: PropsWithChildren) {
  return (
    <div
      className={
        "" +
        "xs:border xs:border-border xs:h-fit xs:rounded-card xs:min-w-min xs:max-w-sm xs:justify-start " +
        "flex flex-col gap-6 w-full bg-card p-4 relative bg"
      }
    >
      {children}
    </div>
  );
}
