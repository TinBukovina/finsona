"use client";

import { PropsWithChildren } from "react";
import { AppProvider } from "./AppContext";
import { UserSettingsProvider } from "@/5_entities/user";
import { ToastProvider } from "@/6_shared";
import { SWRConfig } from "swr";
import { fetcher } from "@/6_shared/api";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <UserSettingsProvider>
        <AppProvider>
          <ToastProvider>
            {children}

            <div id="portal-root" />
            <div id="toast-root" />
          </ToastProvider>
        </AppProvider>
      </UserSettingsProvider>
    </SWRConfig>
  );
}
