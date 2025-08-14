"use client";

import { PropsWithChildren } from "react";
import { AppProvider } from "./AppContext";
import { UserSettingsProvider } from "@/5_entities/user";
import { ToastProvider } from "@/6_shared";

export function Providers({ children }: PropsWithChildren) {
  return (
    <UserSettingsProvider>
      <AppProvider>
        <ToastProvider>
          {children}

          <div id="portal-root" />
          <div id="toast-root" />
        </ToastProvider>
      </AppProvider>
    </UserSettingsProvider>
  );
}
