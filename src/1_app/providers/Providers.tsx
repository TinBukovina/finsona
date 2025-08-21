"use client";

import { PropsWithChildren } from "react";
import { AppProvider } from "./AppContext";
import { UserSettingsProvider } from "@/5_entities/user";
import { ToastProvider } from "@/6_shared";
import { useRouter } from "@/i18n/navigation";
import { SWRConfig } from "swr";
import { fetcher } from "@/6_shared/api";

export function Providers({ children }: PropsWithChildren) {
  /* const router = useRouter();
   */
  return (
    <UserSettingsProvider>
      <AppProvider>
        <ToastProvider>
          {/* <SWRConfig
            value={{
              fetcher,
              onError: (error, key) => {
                if (error instanceof CustomError && error.status === 401) {
                  console.error(
                    "JWT token je istekao ili je neispravan. Preusmjeravam na prijavu..."
                  );
                  router.push("/auth/login");
                }
              },
            }}
          > */}
          {children}

          <div id="portal-root" />
          <div id="toast-root" />
          {/* </SWRConfig> */}
        </ToastProvider>
      </AppProvider>
    </UserSettingsProvider>
  );
}
