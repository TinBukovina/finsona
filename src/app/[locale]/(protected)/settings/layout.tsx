import React, { PropsWithChildren } from "react";

import { SettingsNavigation } from "@/3_widgets";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 w-full h-full px-4 py-3">
      {/*Title*/}
      <h1 className="text-foreground text-h5 font-semibold">Settings</h1>

      <SettingsNavigation />

      {children}
    </div>
  );
}
