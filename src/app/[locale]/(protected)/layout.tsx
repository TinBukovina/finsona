import React, { PropsWithChildren } from "react";

import { Navigation, Sidebar } from "@/3_widgets";

import { MainContentClient } from "./MainContentClient";
import { SelectActiveWalletServer } from "@/4_features/select_active_wallet/SelectActiveWalletServer";
import { DebugSWR } from "@/6_shared/ui/DebugSWR";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={
        `flex gap-0 w-full h-dvh bg-background overflow-auto min-w-0` +
        " " +
        `touch-none sm:touch-auto`
      }
    >
      <Sidebar />
      <div className="flex flex-col gap-2 sm:gap-0 w-full h-full min-w-0 ">
        <Navigation>
          <SelectActiveWalletServer />
        </Navigation>

        <MainContentClient>{children}</MainContentClient>

        {/* <DebugSWR /> */}
      </div>
    </div>
  );
}
