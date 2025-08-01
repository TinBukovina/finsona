import React, { PropsWithChildren } from "react";

import { Sidebar } from "@/3_widgets/side-navigation";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-4 bg-background h-dvh">
      <Sidebar />
      {children}
    </div>
  );
}
