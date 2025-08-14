"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import Cookies from "js-cookie";

export const WALLET_ID_COOKIE_KEY = "active-wallet-id";

interface AppState {
  activeWalletId: string | null;
}

interface AppContextType {
  appState: AppState;
  setActiveWallet: (walletId: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [appState, setAppState] = useState<AppState>({
    activeWalletId: null,
  });

  const setActiveWallet = (walletId: string | null) => {
    setAppState((prevState) => ({ ...prevState, activeWalletId: walletId }));

    if (walletId) {
      Cookies.set(WALLET_ID_COOKIE_KEY, walletId, { expires: 365 });
    } else {
      Cookies.remove(WALLET_ID_COOKIE_KEY);
    }
  };

  const value = { appState, setActiveWallet };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
